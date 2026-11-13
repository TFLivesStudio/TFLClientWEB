import { getScan } from "@/lib/virustotal";
import { ScanCard } from "./scan-card";
export async function ScanSection() {
  return (
    <section className="shell section">
      <ScanCard result={await getScan()} />
    </section>
  );
}
