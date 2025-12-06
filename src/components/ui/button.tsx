import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer transition-all duration-200" +
  " hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border hover:bg-destructive/90",
        outline:
          // Inherits Background
          // Inherits Text
          " border [border-color:var(--button-outline)] shadow-xs active:shadow-none hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border hover:bg-secondary/80",
        // Transparent Border
        ghost: "border border-transparent hover:bg-accent/70 hover:text-accent-foreground",
      },
      // Min Heights
      size: {
        default: "min-h-10 px-5 py-2.5",
        sm: "min-h-8 rounded-lg px-3.5 text-xs",
        lg: "min-h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
