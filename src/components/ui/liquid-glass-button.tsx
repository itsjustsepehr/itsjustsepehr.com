"use client"

import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-white hover:bg-destructive/90',
  cool: 'border border-primary/50 bg-gradient-to-t from-primary to-primary/85 text-primary-foreground shadow-md hover:brightness-110',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};
export const buttonVariants = cva(cn(base, 'cursor-pointer rounded-md'), {
  variants: { variant: variants, size: { default: 'h-9 px-4 py-2', sm: 'h-8 px-3 text-xs', lg: 'h-10 px-8', icon: 'size-9' } },
  defaultVariants: { variant: 'default', size: 'default' },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
});
Button.displayName = 'Button';

export const liquidbuttonVariants = cva(cn(base, 'relative isolate cursor-pointer rounded-md transition-[color,box-shadow,transform] duration-300'), {
  variants: {
    variant: { ...variants, default: 'bg-transparent text-primary motion-safe:hover:scale-105' },
    size: { default: 'h-9 px-4 py-2', sm: 'h-8 gap-1.5 px-4 text-xs', lg: 'h-10 px-6', xl: 'h-12 px-8', xxl: 'h-14 px-10', icon: 'size-9' },
  },
  defaultVariants: { variant: 'default', size: 'xxl' },
});
export function LiquidButton({ className, variant, size, asChild = false, children, ...props }: React.ComponentProps<'button'> & VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';
  const filterId = `glass-${React.useId().replace(/:/g, '')}`;
  return <>
    <Comp data-slot="button" className={cn(liquidbuttonVariants({ variant, size, className }))} {...props}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-white/10 backdrop-blur-md shadow-[inset_1px_1px_1px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_rgba(255,255,255,0.3),0_0_12px_rgba(255,255,255,0.15)]" style={{ backdropFilter: `blur(8px) url("#${filterId}")` }} />
      <Slottable>{children}</Slottable>
    </Comp>
    <GlassFilter id={filterId} />
  </>;
}
function GlassFilter({ id }: { id: string }) {
  return <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute">
    <defs><filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
      <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
      <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
      <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
      <feComposite in="finalBlur" in2="finalBlur" operator="over" />
    </filter></defs>
  </svg>;
}

type ColorVariant = 'default' | 'primary' | 'success' | 'error' | 'gold' | 'bronze';
interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: ColorVariant }
const colorVariants: Record<ColorVariant, { outer: string; inner: string; button: string; textColor: string; textShadow: string }> = {
  default: { outer: 'from-[#000] to-[#A0A0A0]', inner: 'from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]', button: 'from-[#B9B9B9] to-[#969696]', textColor: 'text-white', textShadow: '[text-shadow:0_-1px_0_rgb(80_80_80)]' },
  primary: { outer: 'from-[#000] to-[#A0A0A0]', inner: 'from-primary via-secondary to-muted', button: 'from-primary to-primary/40', textColor: 'text-white', textShadow: '[text-shadow:0_-1px_0_rgb(30_58_138)]' },
  success: { outer: 'from-[#005A43] to-[#7CCB9B]', inner: 'from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]', button: 'from-[#9ADBC8] to-[#3E8F7C]', textColor: 'text-[#FFF7F0]', textShadow: '[text-shadow:0_-1px_0_rgb(6_78_59)]' },
  error: { outer: 'from-[#5A0000] to-[#FFAEB0]', inner: 'from-[#FFDEDE] via-[#680002] to-[#FFE9E9]', button: 'from-[#F08D8F] to-[#A45253]', textColor: 'text-[#FFF7F0]', textShadow: '[text-shadow:0_-1px_0_rgb(146_64_14)]' },
  gold: { outer: 'from-[#917100] to-[#EAD98F]', inner: 'from-[#FFFDDD] via-[#856807] to-[#FFF1B3]', button: 'from-[#FFEBA1] to-[#9B873F]', textColor: 'text-[#FFFDE5]', textShadow: '[text-shadow:0_-1px_0_rgb(178_140_2)]' },
  bronze: { outer: 'from-[#864813] to-[#E9B486]', inner: 'from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]', button: 'from-[#FFE3C9] to-[#A36F3D]', textColor: 'text-[#FFF7F0]', textShadow: '[text-shadow:0_-1px_0_rgb(124_45_18)]' },
};
export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(({ children, className, variant = 'default', ...props }, ref) => {
  const colors = colorVariants[variant];
  return <span className={cn('relative inline-flex rounded-md bg-gradient-to-b p-[1.25px]', colors.outer)}>
    <span aria-hidden="true" className={cn('absolute inset-px rounded-md bg-gradient-to-b', colors.inner)} />
    <button ref={ref} {...props} className={cn(base, 'relative m-px h-11 cursor-pointer rounded-md bg-gradient-to-b px-6 font-semibold motion-safe:transition-transform hover:brightness-105 active:translate-y-0.5 active:brightness-95', colors.button, colors.textColor, colors.textShadow, className)}>{children || 'Button'}</button>
  </span>;
});
MetalButton.displayName = 'MetalButton';
