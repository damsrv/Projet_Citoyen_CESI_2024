"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { signOut } from "next-auth/react";

const formSchema = z.object({
    email: z.string().email("Merci d'entrer une adresse mail valide."),
    currentPassword: z.string().min(4, "Mot de passe actuel requis."),
})



const ChangeEmailForm = ({ defaultData, userId }: {
    defaultData: {
        email: string,
    },
    userId: number
}) => {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultData
    })

    const dialogClose = () => {
        document.getElementById('closeDialogEmail')?.click();
    };
    async function onSubmit(values: z.infer<typeof formSchema>) {


        const res = await fetch("/api/email/" + userId, {
            method: "PUT",
            body: JSON.stringify({ data: values }),
        })

        if (!res.ok) {
            const json = await res.json()
            setError(json.message)
        }
        else {

            dialogClose()
            localStorage.setItem("changedEmail", "Votre email a bien été modifié, veuillez vous reconnecter avec le nouveau.")
            signOut({ callbackUrl: "/connexion", redirect: true })
        }
    }


    return (

        <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <section className="flex flex-col lg:flex-row justify-between gap-3">
                    <Input disabled name="current-email" type="text" value={defaultData.email} />
                    <Dialog >
                        <DialogTrigger asChild>
                            <Button type="button">Modifier</Button>
                        </DialogTrigger>

                        <DialogContent className="modal-change-email sm:max-w-[425px]" >
                            <DialogHeader>
                                <DialogTitle>Modifier l'email</DialogTitle>
                                <DialogDescription>La modification de l'email entrainera la déconnexion et vous devrez vous reconnecter avec le nouvel email.
                                </DialogDescription>
                            </DialogHeader>


                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grow" >
                                        <FormLabel>Nouvel email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                    <Button id="closeDialogEmail" type="button" variant="ghost">
                                        Annuler
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type="submit" variant="error" onClick={form.handleSubmit(onSubmit)}>Modifier l'email</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </section>
            </form>
        </Form>


    )
}

export default ChangeEmailForm