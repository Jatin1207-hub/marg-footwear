import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CatalogPage, categoryFilter } from "@/components/CatalogPage";

export const Route = createFileRoute("/women")({
  head: () => ({ meta: [
    { title: "Women's Shoes — Marg Footwear" },
    { name: "description", content: "Shop Marg Footwear women's running, lifestyle, sports, and casual shoes." },
    { property: "og:title", content: "Women's Shoes — Marg Footwear" },
    { property: "og:description", content: "Shop Marg Footwear women's running, lifestyle, sports, and casual shoes." },
  ] }),
  component: () => (
    <PageShell>
      <CatalogPage title="Women" subtitle="Engineered for power. Tuned for grace." filterFn={categoryFilter("women")} />
    </PageShell>
  ),
});
