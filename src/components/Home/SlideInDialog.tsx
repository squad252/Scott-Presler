// components/SlideInDialog.tsx
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogPortal,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react"
// import { ReactNode } from "react"

export function SlideInDialog({
  open,
  setOpen,
  isMember,
  children,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  children: ReactNode
  isMember?: boolean
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogPortal>
        <AlertDialogOverlay className="bg-[#ffffffc5] fixed inset-0 z-40" />
        <AlertDialogContent
        //   className={cn(
        //     "fixed right-0 top-0 z-50 w-full max-w-lg h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform translate-x-full",
        //     open && "translate-x-0"
        //   )}
        >
          {children}
          {
            isMember ? (
              null
            ) : (
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            )
          }
        </AlertDialogContent>
      </AlertDialogPortal >
    </AlertDialog >
  )
}
