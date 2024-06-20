"use client"

import {Offer, User} from "@prisma/client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";


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


    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Create Offer Student
        try {
            const res = await fetch('/api/offer-student', {
                method: "POST",
                body: JSON.stringify({
                    data: {
                        message: values.message,
                        userId: user.id,
                        offerId: offer.id,
                    }
                })
            })

            console.log(res)
        } catch (e) {
            console.error(e)
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