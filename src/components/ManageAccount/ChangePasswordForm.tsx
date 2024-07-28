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

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
    // TODO : ajouter regex sur le password & des indications visuelles de ce qui est attendu
    oldPassword: z.string().min(4, "Mot de passe actuel requis."),
    newPassword: z.string().regex(passwordValidation, {
        message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (#?!@$%^&*-).',
    }),
    newPasswordConfirm: z.string().min(4, "Confirmation de mot de passe requise."),
}).superRefine(({ newPassword, newPasswordConfirm }, ctx) => {
    if (newPasswordConfirm !== newPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Les mots de passes ne correspondent pas.",
            path: ['newPasswordConfirm']
        })
    }
})


const ChangePasswordForm = ({ userId }: {
    userId: number
}) => {
    const [error, setError] = useState<string | null>(null)
    const [validation, setValidation] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: ""

        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("/api/password/" + userId, {
            method: "PUT",
            body: JSON.stringify({ data: values }),
        })

        if (!res.ok) {
            const json = await res.json()
            setError(json.message)
        }
        else {
            form.reset()
            setError(null)
            setValidation("Votre mot de passe a bien été modifié.")
        }

        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe actuel</FormLabel>
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
                            <FormLabel>Nouveau mot de passe</FormLabel>
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
                            <FormLabel>Confirmation nouveau mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirmer le mot de passe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <Alert variant={"destructive"}>
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
                {validation && (
                    <Alert variant={"positive"}>
                        <AlertTitle>Validation</AlertTitle>
                        <AlertDescription>
                            {validation}
                        </AlertDescription>
                    </Alert>
                )}

                <Button type="submit">Enregistrer</Button>
            </form>
        </Form>
    )
}

export default ChangePasswordForm