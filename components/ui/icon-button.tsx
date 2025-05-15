import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  variant?: "filled" | "outline"
  size?: "sm" | "md" | "lg"
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, variant = "filled", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    }

    const variantClasses = {
      filled: "bg-yellow-400 text-black hover:bg-yellow-500",
      outline: "border border-yellow-400/50 text-yellow-400 hover:border-yellow-400 hover:text-yellow-500",
    }

    return (
      <button
        className={cn(
          "flex items-center justify-center transition-colors duration-300 rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        ref={ref}
        {...props}
      >
        {icon}
      </button>
    )
  },
)
IconButton.displayName = "IconButton"

export { IconButton }
