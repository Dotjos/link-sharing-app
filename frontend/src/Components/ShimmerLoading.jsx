"use client";

const ShimmerLoading = ({ count = 5 }) => {
  return (
    <div className="w-full space-y-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative h-9 flex flex-col justify-center w-full rounded-md bg-gray-300 overflow-hidden animate-pulse"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>
      ))}
    </div>
  );
};

export default ShimmerLoading;
