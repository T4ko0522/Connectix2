import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  children: ReactNode
}

const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, icon, children, ...props }, ref) => {
    return (
      <Button
        variant="outline"
        className={cn("flex w-full items-center justify-center gap-2", className)}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </Button>
    )
  },
)
SocialButton.displayName = "SocialButton"

export { SocialButton }
