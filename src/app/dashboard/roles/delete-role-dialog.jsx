'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteRoleDialog({ open, onOpenChange, onConfirm, role }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white dark:bg-prussian rounded border border-gray-200 dark:border-prussian-light/20">
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro di voler eliminare questo ruolo?</AlertDialogTitle>
          <AlertDialogDescription>
            Stai per eliminare il ruolo <span className="font-semibold">{role?.display_name}</span>
            {role?.tenant?.company_name && (
              <> del tenant <span className="font-semibold">{role.tenant.company_name}</span></>
            )}
            . Questa azione non può essere annullata.
            <br /><br />
            <span className="text-red-500">
              Nota: Non è possibile eliminare un ruolo se è assegnato a degli utenti.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 