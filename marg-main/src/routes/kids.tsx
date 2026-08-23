import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CatalogPage, categoryFilter } from "@/components/CatalogPage";

export const Route = createFileRoute("/kids")({
  head: () => ({ meta: [
    { title: "Kids' Shoes — Marg Footwear" },
    { name: "description", content: "Marg Footwear shoes for kids. Built to keep up with playtime." },
    { property: "og:title", content: "Kids' Shoes — Marg Footwear" },
    { property: "og:description", content: "Marg Footwear shoes for kids. Built to keep up with playtime." },
  ] }),
  component: () => (
    <PageShell>
      <CatalogPage title="Kids" subtitle="Little feet. Big adventures." filterFn={categoryFilter("kids")} />
    </PageShell>
  ),
});
