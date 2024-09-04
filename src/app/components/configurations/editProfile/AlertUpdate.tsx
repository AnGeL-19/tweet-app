import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/app/components/ui/alert-dialog"

  
interface Props {
    title: string;
    text: string;
    onAccept: () => void;
    onCancel: () => void;
}

export const AlertUpdate = React.forwardRef(( { title, text , onAccept, onCancel }:Props, ref: React.LegacyRef<HTMLButtonElement> ) => {

    const handleUpdate = () => {
      onAccept()
    }

    const handleCancelUpdate = () => {
      onCancel()
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger ref={ref} className="hidden">Open</AlertDialogTrigger>
        <AlertDialogContent className="w-1/2">
            <AlertDialogHeader>
            <AlertDialogTitle>{ title }</AlertDialogTitle>
            <AlertDialogDescription>
                { text }
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelUpdate}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdate}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

  )
})
