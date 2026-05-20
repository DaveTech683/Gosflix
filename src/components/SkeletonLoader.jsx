export function CardSkeleton({ wide }) {
  return (
    <div
      className="flex-shrink-0 rounded-lg overflow-hidden"
      style={{ width: wide ? 260 : 200, height: wide ? 146 : 112 }}
    >
      <div className="w-full h-full skeleton-pulse" />
      <style>{`
        .skeleton-pulse {
          background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.6s infinite;
        }
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function RowSkeleton({ count = 6 }) {
  return (
    <div className="py-6 px-4 md:px-8 lg:px-12">
      <div
        className="h-6 w-48 rounded mb-4 skeleton-pulse"
        style={{ background: "#222" }}
      />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <style>{`
        .skeleton-pulse {
          background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.6s infinite;
        }
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div
      className="relative w-full skeleton-pulse"
      style={{ height: "85vh", minHeight: 500 }}
    >
      <div className="absolute bottom-24 left-8 md:left-12 flex flex-col gap-4">
        <div
          className="h-4 w-32 rounded skeleton-pulse"
          style={{ background: "#222" }}
        />
        <div
          className="h-12 w-80 rounded skeleton-pulse"
          style={{ background: "#222" }}
        />
        <div
          className="h-4 w-64 rounded skeleton-pulse"
          style={{ background: "#222" }}
        />
        <div className="flex gap-3">
          <div
            className="h-12 w-32 rounded-lg skeleton-pulse"
            style={{ background: "#222" }}
          />
          <div
            className="h-12 w-32 rounded-lg skeleton-pulse"
            style={{ background: "#222" }}
          />
        </div>
      </div>
      <style>{`
        .skeleton-pulse {
          background: linear-gradient(90deg, #111 25%, #1e1e1e 50%, #111 75%);
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.8s infinite;
        }
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="pt-16" style={{ background: "#000" }}>
      <div className="relative w-full skeleton-pulse" style={{ height: 460 }} />
      <div className="px-4 md:px-12 py-8 space-y-4">
        <div
          className="h-10 w-64 rounded skeleton-pulse"
          style={{ background: "#1a1a1a" }}
        />
        <div className="flex gap-3">
          <div
            className="h-4 w-16 rounded skeleton-pulse"
            style={{ background: "#1a1a1a" }}
          />
          <div
            className="h-4 w-12 rounded skeleton-pulse"
            style={{ background: "#1a1a1a" }}
          />
          <div
            className="h-4 w-20 rounded skeleton-pulse"
            style={{ background: "#1a1a1a" }}
          />
        </div>
        <div
          className="h-20 w-full max-w-2xl rounded skeleton-pulse"
          style={{ background: "#1a1a1a" }}
        />
      </div>
      <style>{`
        .skeleton-pulse {
          background: linear-gradient(90deg, #111 25%, #1e1e1e 50%, #111 75%) !important;
          background-size: 200% 100% !important;
          animation: skeleton-shimmer 1.8s infinite;
        }
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
