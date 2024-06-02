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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter, redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    currentPassword: z.string().min(4, "Mot de passe actuel requis."),
})

const DeleteAccount = ({ userId }:
    { userId: number }) => {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { currentPassword: "" }
    })

    const dialogClose = () => {
        document.getElementById('closeDialogEmail')?.click();
    };
    async function onSubmit(values: z.infer<typeof formSchema>) {

        const res = await fetch("/api/delete-account/" + userId, {
            method: "DELETE",
            body: JSON.stringify({ data: values }),
        })

        if (!res.ok) {
            const json = await res.json()
            setError(json.message)
        }
        else {
            dialogClose()
            signOut({ callbackUrl: "/mon-compte/suppression", redirect: true })
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <section className="flex flex-col lg:flex-row justify-between gap-3">
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
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormLabel>Mot de passe actuel</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Mot de passe actuel"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && (
                                <Alert variant={"destructive"} className="mb-2">
                                    <AlertTitle>Erreur</AlertTitle>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <DialogFooter className="flex flex-col gap-3 lg:gap-1">
                                <DialogClose asChild>
                                    <Button id="closeDialogAccount" type="button" variant="ghost">
                                        Annuler
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type="submit" variant="error" onClick={form.handleSubmit(onSubmit)}>Supprimer mon compte</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </section>
            </form >
        </Form >
    )
}

export default DeleteAccount