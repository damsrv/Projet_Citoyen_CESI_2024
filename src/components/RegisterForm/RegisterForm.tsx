"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {redirect} from "next/navigation";
import {signIn} from "next-auth/react";

const formSchema = z.object({
    firstname: z.string().min(1, "Prénom requis."),
    lastname: z.string().min(1, "Nom requis."),
    email: z.string().email("Merci d'entrer une adresse mail valide."),
    password: z.string().min(4, "Mot de passe requis."),
    passwordConfirm: z.string().min(4, "Confirmation de mot de passe requise."),
}).superRefine(({password, passwordConfirm}, ctx) => {
    if (passwordConfirm !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Les mots de passes ne correspondent pas.",
            path: ['passwordConfirm']
        })
    }
})

export function RegisterForm() {
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            const json = await res.json()
            setError(json.message)
        }

        return redirect("/")
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
                <section className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({field}) => (
                            <FormItem>
                                {/*<FormLabel>Prénom</FormLabel>*/}
                                <FormControl>
                                    <Input placeholder="Prénom" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({field}) => (
                            <FormItem>
                                {/*<FormLabel>Prénom</FormLabel>*/}
                                <FormControl>
                                    <Input placeholder="Nom" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </section>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            {/*<FormLabel>Prénom</FormLabel>*/}
                            <FormControl>
                                <Input type="email" placeholder="Mail" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            {/*<FormLabel>Prénom</FormLabel>*/}
                            <FormControl>
                                <Input type="password" placeholder="Mot de passe" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({field}) => (
                        <FormItem>
                            {/*<FormLabel>Prénom</FormLabel>*/}
                            <FormControl>
                                <Input type="password" placeholder="Confirmer le mot de passe" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">S'inscrire</Button>
                <Button type="button" variant='link'>
                    <a href="/connexion">
                        Déjà un compte ? Connectez-vous
                    </a>
                </Button>
            </form>
        </Form>
    )
}