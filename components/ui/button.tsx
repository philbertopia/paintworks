import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva('ui-button', {
  variants: {
    variant: {
      default: 'ui-button-default',
      outline: 'ui-button-outline',
      ghost: 'ui-button-ghost',
    },
    size: {
      default: 'ui-button-default-size',
      icon: 'ui-button-icon-size',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
)

Button.displayName = 'Button'

export { Button, buttonVariants }
