"use client";

import {useMemo, useState} from "react";
import demo from "@/data/demo.json";
import {recommend, type Item} from "@/lib/recommend";

type Status = "awaiting" | "approved" | "held";
type QueueItem = {id:string; item:Item; packs:number; subtotal:number; reason:string; status:Status};

const money = new Intl.NumberFormat("en-US", {style:"currency",currency:"USD"});

export default function Home() {
  const [selected, setSelected] = useState(demo.items[0].qr_code);
  const item = useMemo(() => demo.items.find((entry) => entry.qr_code === selected) as Item, [selected]);
  const initial = recommend(item, demo.facility);
  const [packs, setPacks] = useState(initial.packs);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function choose(qr:string) {
    const next = demo.items.find((entry) => entry.qr_code === qr) as Item;
    setSelected(qr); setPacks(recommend(next, demo.facility).packs); setError("");
  }

  function addRequest() {
    setError("");
    try {
      const result = recommend(item, demo.facility, Number(packs));
      if (queue.some((entry) => entry.item.qr_code === item.qr_code && entry.status === "awaiting")) {
        throw new Error("DUPLICATE_REQUEST");
      }
      setBusy(true);
      window.setTimeout(() => {
        setQueue((current) => [{id:`DEMO-${Date.now()}`,item,packs:result.packs,subtotal:result.subtotal,reason:result.reason,status:"awaiting"},...current]);
        setBusy(false);
      }, 350);
    } catch (caught) {
      const code = caught instanceof Error ? caught.message : "UNKNOWN";
      const messages:Record<string,string> = {
        INVALID_PACK_COUNT:"Enter a whole number of at least one pack.",
        PACK_LIMIT_EXCEEDED:`This label allows at most ${item.max_packs} packs.`,
        BUDGET_LIMIT_EXCEEDED:`This request exceeds the ${money.format(demo.facility.approval_limit)} site limit.`,
        DUPLICATE_REQUEST:"An approval for this item is already waiting. Update that request instead."
      };
      setError(messages[code] ?? "The request could not be prepared. Try again.");
    }
  }

  function decide(id:string, status:Status) {
    setQueue((current) => current.map((entry) => entry.id === id ? {...entry,status} : entry));
  }

  const preview = (() => {try{return recommend(item, demo.facility, Number(packs));}catch{return null;}})();
  return <main>
    <header className="topbar">
      <a className="brand" href="#workflow" aria-label="SupplyTap home"><span>ST</span>SupplyTap</a>
      <div className="pilot"><i /> Fictional pilot workspace</div>
    </header>

    <section className="hero">
      <div><p className="eyebrow">HARBOR HOUSE HOTEL · ACCOUNT {demo.facility.account}</p><h1>Turn the last pack into<br/><em>the right order.</em></h1></div>
      <p className="lede">A worker scans the bin. SupplyTap restores the vendor SKU, applies site rules, and gives the distributor a clean approval request—before the shelf is empty.</p>
    </section>

    <section className="metrics" aria-label="Pilot metrics">
      <div><b>03</b><span>Mapped labels</span></div><div><b>01</b><span>Demo site</span></div><div><b>&lt; 30 sec</b><span>Target scan to queue</span></div><div><b>$0</b><span>Orders actually sent</span></div>
    </section>

    <section id="workflow" className="workspace">
      <div className="scanner card">
        <div className="section-head"><div><p className="eyebrow">01 · SIMULATED QR SCAN</p><h2>What is running low?</h2></div><span className="demo-tag">DEMO DATA</span></div>
        <label htmlFor="item">Mapped bin label</label>
        <div className="select-wrap"><select id="item" value={selected} onChange={(event)=>choose(event.target.value)}>{demo.items.map((entry)=><option key={entry.qr_code} value={entry.qr_code}>{entry.name} · {entry.qr_code}</option>)}</select></div>

        <article className="item-card">
          <div className="qr" aria-hidden="true">▦</div>
          <div className="item-title"><span>{item.category}</span><h3>{item.name}</h3><code>{item.vendor_sku}</code></div>
          <div className="stock"><small>ON HAND</small><strong>{item.stock}</strong><span>packs</span></div>
        </article>

        <div className="rule-grid"><div><span>Reorder point</span><b>{item.reorder_point} packs</b></div><div><span>Pack size</span><b>{item.units_per_pack.toLocaleString()} units</b></div><div><span>Vendor price</span><b>{money.format(item.unit_price)} / pack</b></div></div>

        <label htmlFor="packs">Packs to request <span>Recommended: {initial.recommended}</span></label>
        <div className="quantity"><button aria-label="Decrease packs" onClick={()=>setPacks((value)=>Math.max(0,value-1))}>−</button><input id="packs" type="number" min="1" max={item.max_packs} step="1" value={packs} onChange={(event)=>setPacks(Number(event.target.value))}/><button aria-label="Increase packs" onClick={()=>setPacks((value)=>value+1)}>+</button></div>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary" onClick={addRequest} disabled={busy}>{busy ? "Checking site rules…" : `Prepare ${preview ? money.format(preview.subtotal) : "request"} reorder`}<span>→</span></button>
        <p className="fine">No supplier message is sent. This interaction creates demo-only browser state.</p>
      </div>

      <aside className="queue card">
        <div className="section-head"><div><p className="eyebrow">02 · DISTRIBUTOR DESK</p><h2>Approval queue</h2></div><span className="count">{queue.filter((entry)=>entry.status==="awaiting").length}</span></div>
        <div className="site"><span>Deliver to</span><b>{demo.facility.site}</b><small>Auto-approval limit · {money.format(demo.facility.approval_limit)}</small></div>
        {queue.length === 0 ? <div className="empty"><div>✓</div><h3>No requests waiting</h3><p>Choose a mapped bin and prepare a reorder. It will appear here for a human decision.</p></div> : <div className="queue-list">{queue.map((entry)=><article className="request" key={entry.id}>
          <div className="request-top"><div><span className={`status ${entry.status}`}>{entry.status === "awaiting" ? "Awaiting approval" : entry.status}</span><h3>{entry.item.name}</h3><code>{entry.item.vendor_sku}</code></div><strong>{money.format(entry.subtotal)}</strong></div>
          <p>{entry.reason}</p><div className="request-meta"><span>{entry.packs} packs</span><span>{entry.packs * entry.item.units_per_pack} units</span></div>
          {entry.status === "awaiting" ? <div className="actions"><button className="approve" onClick={()=>decide(entry.id,"approved")}>Approve demo order</button><button onClick={()=>decide(entry.id,"held")}>Hold</button></div> : <p className="decision" role="status">Request marked <b>{entry.status}</b>. No vendor order was sent.</p>}
        </article>)}</div>}
      </aside>
    </section>

    <footer><div><b>SupplyTap</b><span>Independent distributor scan-to-reorder pilot</span></div><p>Fictional data · Simulated ordering · Python API not publicly hosted</p></footer>
  </main>;
}
