"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {signIn} from "next-auth/react";
import {AlertCircle} from "lucide-react";

const formSchema = z.object({
    email: z.string().email("Merci d'entrer une adresse mail valide."),
    password: z.string().min(4, "Mot de passe requis."),
})

interface LoginFormProps {
    error: string | undefined
}

export function LoginForm({error}: LoginFormProps) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(error)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: "/",
            redirect: true
        })
    }

    return (
        <Form {...form}>
            {error && (
                <Alert className="mb-5" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            {/*<FormLabel>Prénom</FormLabel>*/}
                            <FormControl>
                                <Input placeholder="Adresse mail" {...field} />
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
                <Button type="submit">Se connecter</Button>
                <Button type="button" variant='link'>
                    <a href="/inscription">
                        Pas encore de compte ? Créez-en un
                    </a>
                </Button>
            </form>
        </Form>
    )
}