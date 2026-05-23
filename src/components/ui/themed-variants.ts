import { cva, type VariantProps } from "class-variance-authority";

export const themedButton = cva(
  "group relative inline-flex items-center rounded-sm font-medium transition-all duration-300 overflow-hidden " +
    "before:content-[''] before:absolute before:inset-0 before:bg-[color:var(--accent-blue)] before:opacity-0 before:transition-opacity before:duration-300",
  {
    variants: {
      variant: {
        primary:
          "border border-[color:var(--accent-blue)] text-[color:var(--accent-blue)] hover:before:opacity-15",
        secondary:
          "border border-border/70 text-foreground/70 hover:border-[color:var(--accent-blue)] hover:text-[color:var(--accent-blue)] hover:before:opacity-10",
      },
      size: {
        default: "gap-2 px-4 py-2 text-sm",
        sm: "gap-1.5 px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export const themedCard = cva(
  "group relative flex flex-col h-full rounded-sm border bg-card/30 border-border/40 transition-all duration-300 overflow-hidden animate-fade-up " +
    "hover:border-[color:var(--accent-blue)]/50 hover:bg-[color:var(--accent-blue)]/5",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: { padding: "default" },
  }
);

export const themedLink = cva("transition-colors", {
  variants: {
    variant: {
      nav:
        "relative text-sm font-medium text-foreground/70 hover:text-[color:var(--accent-blue)] " +
        "after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:bg-[color:var(--accent-blue)] after:transition-all hover:after:w-full " +
        "aria-[current=page]:text-foreground aria-[current=page]:after:w-full",
      text:
        "text-foreground/70 underline-offset-4 hover:text-[color:var(--accent-blue)] hover:underline hover:decoration-[color:var(--accent-blue)]",
    },
  },
  defaultVariants: { variant: "text" },
});

export type ThemedButtonVariants = VariantProps<typeof themedButton>;
export type ThemedCardVariants = VariantProps<typeof themedCard>;
export type ThemedLinkVariants = VariantProps<typeof themedLink>;
