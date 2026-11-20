# Source notes

## Report

- **IdeaBrowser date:** November 20, 2026
- **Public URL:** https://www.ideabrowser.com/hub/ideas/today
- **Title:** SaaS platform that turns low-stock QR scans into vendor orders for facilities buying consumables
- **IB Index:** 6.3
- **Category / ceiling:** B2B marketplace; $2M–$4M ARR
- **Year-one estimate:** $150K–$300K shown at a glance; the report's assumption-heavy model reaches about $415K booked revenue and a $720K exit ARR run rate.
- **Difficulty / capital / first revenue:** High; $10K–$40K; 90–120 days.

## Customer and pain

The payer is a small regional janitorial, packaging, hygiene, office, or workshop-consumables distributor, ideally $5M–$50M revenue. Its customer is a multi-site facility where an admin, foreman, or facilities lead discovers shortages only after the bin is empty. The painful status quo is paper labels, group texts, calls to a rep, panic orders, excess safety stock, and preventable downtime.

## Wedge and gap

The wedge is an item-specific QR label at point of use, pre-mapped to the customer's vendor SKU, account, delivery site, pack size, and approval rule. A scan becomes an approval-ready order against the existing supplier relationship. The gap is not QR inventory generally: Arda Cards already owns the exact scan-to-order workflow, while Fastenal and Grainger use inventory tooling to defend their catalogs. The narrower opening is a white-label tool for independent distributors without a software product.

## Why now and demand

- 102.6M US smartphone users were projected to scan QR codes in 2026; QR behavior no longer needs training.
- Gartner evidence in the report says 67% of B2B buyers prefer rep-free buying and 70% want fully digital self-service.
- Category demand is real but limited: about 580 US searches/month combined for QR inventory terms, declining 33% YoY, with $24–$45 CPC. Exact scan-to-reorder phrases have effectively zero volume, so search is not the GTM.
- Pain receipts span r/Machinists, r/SupplyChainLogistics, r/AdminAssistant, r/automation, and industry blogs. These are directional, not proof of willingness to pay.
- Grainger says KeepStock customers cut indirect-material spending up to 25% and stockouts 10–25%; this is an incumbent claim and the ROI bar, not independent validation.

## Competitor map

- **Arda Cards:** exact QR Kanban wedge; 10,000+ orders and $75M+ in parts reportedly ordered by scan.
- **eTurns TrackStock:** supplier-neutral replenishment, $40–$399 per stockroom/month.
- **Fastenal FAST Solutions:** large physical VMI footprint and vending network.
- **Grainger KeepStock:** free labels through managed and secure inventory options tied to Grainger's catalog.
- **Sortly / GoCodes:** generic QR inventory and low-stock alerts.
- **TrueCommerce Datalliance:** enterprise EDI/VMI incumbent.
- **Real competitor:** free paper, an office-manager text, and the existing distributor rep.

## Offer ladder and GTM

1. Free mail-in distributor label kit for 50 mapped SKUs.
2. $49/month single distributor/customer pilot with up to 100 SKUs and scan-to-email acknowledgement.
3. $300–$800 per customer account/month, bundled with a $2,500/month distributor floor.
4. $500/customer account onboarding and label service.

First distribution should be founder-led meetings, referrals, NISSCO/Afflink relationships, and ISSA sponsorships. The report models 200 hand-built targets, 30 owner meetings, 15 paying distributors, 10 customer accounts each, and $400/account/month. Every conversion assumption remains unverified.

## Risks

Arda or eTurns can add white-label distribution quickly. Grainger and Fastenal subsidize the workflow to sell product. Exact search demand is absent. SKU mapping and label deployment can become low-margin services. Trust, fulfillment accountability, and distributor access matter more than software sophistication.

## Prototype decision

Build the smallest demonstrable loop: scan a fictional bin label, validate pack/budget rules, create an approval-ready reorder, then approve or hold it. The demo uses explicit fixtures and simulated scan events; no supplier order is transmitted. The Python service performs the same real recommendation and validation operation against shared fixtures.

## Cited source domains in the report

ideabrowser.com, uniqode.com, gartner.com, mckinsey.com, indez.com, industrialsupplymagazine.com, grainger.com, ardacards.com, eturns.com, fastenal.com, sortly.com, gocodes.com, truecommerce.com, reddit.com, repleno.com.
