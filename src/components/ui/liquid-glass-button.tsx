import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export function LiquidButton({
  className,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  const filterId = `glass-${React.useId().replace(/:/g, "")}`;
  return (
    <>
      <Comp
        data-slot="button"
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative isolate cursor-pointer rounded-md transition-[color,box-shadow,transform] duration-300 bg-transparent text-primary motion-safe:hover:scale-105 h-12 px-8",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-white/10 backdrop-blur-md shadow-[inset_1px_1px_1px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_rgba(255,255,255,0.3),0_0_12px_rgba(255,255,255,0.15)]"
          style={{ backdropFilter: `blur(8px) url("#${filterId}")` }}
        />
        <Slottable>{children}</Slottable>
      </Comp>
      <GlassFilter id={filterId} />
    </>
  );
}
function GlassFilter({ id }: { id: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="pointer-events-none absolute"
    >
      <defs>
        <filter
          id={id}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur
            in="turbulence"
            stdDeviation="2"
            result="blurredNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
