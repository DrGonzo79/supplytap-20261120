export type Item = {qr_code:string;name:string;vendor_sku:string;category:string;stock:number;reorder_point:number;units_per_pack:number;unit_price:number;max_packs:number};
export type Facility = {name:string;account:string;site:string;approval_limit:number};

export function recommend(item: Item, facility: Facility, requested?: number) {
  const recommended = Math.max(1, item.reorder_point * 2 - item.stock);
  const packs = requested ?? recommended;
  if (!Number.isInteger(packs) || packs < 1) throw new Error("INVALID_PACK_COUNT");
  if (packs > item.max_packs) throw new Error("PACK_LIMIT_EXCEEDED");
  const subtotal = Math.round(item.unit_price * packs * 100) / 100;
  if (subtotal > facility.approval_limit) throw new Error("BUDGET_LIMIT_EXCEEDED");
  return {packs,recommended,subtotal,reason:`Raise stock from ${item.stock} to ${item.stock + packs} packs; target is ${item.reorder_point * 2}.`};
}
