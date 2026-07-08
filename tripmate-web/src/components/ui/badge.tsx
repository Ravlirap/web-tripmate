import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[rgb(var(--color-primary))] text-white",
        secondary:
          "border-transparent bg-[rgb(var(--color-secondary-container))] text-white",
        outline:
          "border-[rgb(var(--color-outline))] text-[rgb(var(--color-on-surface))]",
        active:
          "border-transparent bg-emerald-100 text-emerald-800",
        inactive:
          "border-transparent bg-slate-100 text-slate-800",
        pending:
          "border-transparent bg-amber-100 text-amber-800",
        confirmed:
          "border-transparent bg-emerald-100 text-emerald-800",
        cancelled:
          "border-transparent bg-rose-100 text-rose-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };