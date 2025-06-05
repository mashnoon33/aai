"use client";

export function LoadingDots() {
  return (
    <div className="flex justify-start">
      <div className="rounded-lg bg-neutral-200 px-4 py-2 text-neutral-900">
        <div className="flex space-x-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.2s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}
