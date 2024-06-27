"use client"

import {Offer, User} from "@prisma/client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import toast from "react-hot-toast";
import A from "@/components/ui/Typography/a";
import {useRouter} from "next/navigation";


const formSchema = z.object({
    message: z.string().min(1, "Votre offre doit contenir un message").max(200, "La taille du message est limitée à 500 caractères."),
})


interface ContactDialogFormProps {
    offer: Offer,
    user: Omit<User, "password">
}

export default function ContactDialogForm({offer, user}: ContactDialogFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: ""
        }
    })

    const router = useRouter()


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await fetch('/api/offer-student', {
                method: "POST",
                body: JSON.stringify({
                    data: {
                        message: values.message,
                        userId: user.id,
                        offerId: offer.id,
                    }
                })
            })

            toast.success((t) => (
                <div>
                    <p>Demande envoyée avec succès !</p>
                    <A href={"/mon-compte/suivi-demandes"}>Mes demandes</A>
                </div>
            ))

            router.refresh()
        } catch (e) {
            toast.error("Une erreur est survenue dans l'envoi de la demande, veuillez réessayer")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Votre message au mentor"
                                    className="w-full"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button className="self-end" type="submit">Envoyer</Button>
                </div>
            </form>
        </Form>
    )
}