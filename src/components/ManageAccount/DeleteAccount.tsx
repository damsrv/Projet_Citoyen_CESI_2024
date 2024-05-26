"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter, redirect } from "next/navigation";
import { signOut } from "next-auth/react";

const DeleteAccount = ({ userId }:
    { userId: number }) => {

    const [error, setError] = useState<string | null>(null)
    const { push } = useRouter()

    const deleteAccount = async () => {


        document.getElementById('closeDialogAccount')?.click();

        // const res = await fetch("/api/users/" + userId, {
        //     method: "DELETE",
        // })

        // if (!res.ok) {
        //     const json = await res.json()
        //     setError(json.message)
        // }

        signOut({ callbackUrl: "/mon-compte/suppression", redirect: true })

    }

    return (
        <Dialog >

            {error && (
                <Alert className="mb-2">
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            <DialogTrigger asChild>
                <Button variant="error" type="button">Supprimer mon compte</Button>
            </DialogTrigger>

            <DialogContent className="modal-change-email sm:max-w-[425px]" >
                <DialogHeader>
                    <DialogTitle>Supprimer mon compte</DialogTitle>
                    <DialogDescription>
                        Êtes vous sûr de vouloir supprimer votre compte ? <br></br><br></br>La suppression est définitive et vous perdrez toutes les données associées à ce compte.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col gap-3 lg:gap-1">
                    <DialogClose asChild>
                        <Button id="closeDialogAccount" type="button" variant="ghost">
                            Annuler
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" variant="error" onClick={() => deleteAccount()}>Supprimer mon compte</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteAccount