import { lazy, Suspense, useRef } from "react";
import { useInView } from "framer-motion";
import { LogoMark } from "./Logo";

// Lazy load the heavy Three.js viewer component
const Shoe3DViewer = lazy(() => import("./Shoe3DViewer"));

function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <LogoMark className="h-10 w-10 animate-spin-slow" glow />
      <div className="text-xs tracking-[0.3em] text-muted-foreground whitespace-nowrap">
        LOADING 3D...
      </div>
    </div>
  );
}

export function Shoe3D({
  color = "#ff6a00",
  className = "",
  interactive = true,
  showAutoRotateToggle = false,
  enableZoom = true,
}: {
  color?: string;
  slug?: string; // Kept for backwards compatibility with props passed
  className?: string;
  interactive?: boolean;
  showAutoRotateToggle?: boolean;
  enableZoom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Only render or animate when the shoe is within 200px of the viewport
  const isInView = useInView(ref, { margin: "200px" });

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<Loader />}>
        <Shoe3DViewer
          color={color}
          interactive={interactive}
          showAutoRotateToggle={showAutoRotateToggle}
          inView={isInView}
          enableZoom={enableZoom}
        />
      </Suspense>
    </div>
  );
}
