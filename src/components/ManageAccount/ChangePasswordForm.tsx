"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
    // TODO : ajouter regex sur le password & des indications visuelles de ce qui est attendu
    password: z.string().min(4, "Mot de passe actuel requis."),
    newPassword: z.string().min(4, "Nouveau mot de passe requis."),
    newPasswordConfirm: z.string().min(4, "Confirmation de mot de passe requise."),
})


const ChangePasswordForm = ({ userId }: {
    userId: number
}) => {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            newPasswordConfirm: ""

        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("/api/users/" + userId + "/change-password", {
            method: "PUT",
            body: JSON.stringify({ data: values }),
        })

        if (!res.ok) {
            const json = await res.json()
            setError(json.message)
        }

        router.refresh()
    }

    return (
        <Form {...form}>
            {error && (
                <Alert>
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            {/*<FormLabel>Prénom</FormLabel>*/}
                            <FormControl>
                                <Input type="password" placeholder="Mot de passe actuel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            {/*<FormLabel>Prénom</FormLabel>*/}
                            <FormControl>
                                <Input type="password" placeholder="Nouveau mot de passe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPasswordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            {/*<FormLabel>Prénom</FormLabel>*/}
                            <FormControl>
                                <Input type="password" placeholder="Confirmer le mot de passe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Enregistrer</Button>
            </form>
        </Form>
    )
}

export default ChangePasswordForm