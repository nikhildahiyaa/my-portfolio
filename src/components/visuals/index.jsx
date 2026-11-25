// Registry: project id → original cover illustration + accent tone.
import { BookingFlow, ClusterField, PortLogistics, RedactionDoc } from "./FeaturedVisuals";
import { BoxOffice, Compression, Fifteen, Scrape, Tsp, Yaip } from "./MiniVisuals";
import { VisualFrame } from "./VisualFrame";

export const VISUALS = {
  "bcmea-forecasting": { C: PortLogistics, tone: "34,211,238" },
  "customer-segmentation": { C: ClusterField, tone: "139,92,246" },
  "airbnb-prediction": { C: BookingFlow, tone: "99,102,241" },
  "image-redaction": { C: RedactionDoc, tone: "34,211,238" },
  "box-office": { C: BoxOffice, tone: "139,92,246" },
  yaip: { C: Yaip, tone: "34,211,238" },
  "data-compression": { C: Compression, tone: "99,102,241" },
  "tsp-solver": { C: Tsp, tone: "139,92,246" },
  "fifteen-puzzle": { C: Fifteen, tone: "99,102,241" },
  "web-scraping-r": { C: Scrape, tone: "34,211,238" },
};

export const toneOf = (id) => VISUALS[id]?.tone ?? "139,92,246";

/** Cover for any project (DataGuard has its own interactive showcase). */
export function ProjectCover({ id, className = "" }) {
  const entry = VISUALS[id];
  return (
    <VisualFrame className={className} tone={toneOf(id)}>
      {entry ? <entry.C /> : null}
    </VisualFrame>
  );
}
