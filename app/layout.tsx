import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {title:"SupplyTap · Scan to reorder",description:"Fictional scan-to-reorder pilot workspace"};
export default function Layout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
