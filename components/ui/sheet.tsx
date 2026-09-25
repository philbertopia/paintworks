import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

const Sheet = Dialog.Root
const SheetTrigger = Dialog.Trigger
const SheetClose = Dialog.Close

type SheetContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  side?: 'left' | 'right'
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className, children, side = 'right', ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="ui-sheet-overlay" />
    <Dialog.Content
      ref={ref}
      className={cn('ui-sheet-content', side === 'left' ? 'ui-sheet-left' : 'ui-sheet-right', className)}
      {...props}
    >
      <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
      {children}
      <Dialog.Close className="ui-sheet-close" aria-label="Close navigation">
        <X size={20} strokeWidth={1.5} />
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
))

SheetContent.displayName = Dialog.Content.displayName

export { Sheet, SheetTrigger, SheetClose, SheetContent }
