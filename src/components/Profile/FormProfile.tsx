"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const formSchema = z.object({
    firstname: z.string().min(1, "Le prénom est requis."),
    lastname: z.string().min(1, "Le nom est requis."),
    birthdate: z
        .string({ message: "La date de naissance est requise." })
        .date(),
    description: z
        .string()
        .max(500, "La description est limitée à 500 caractères.")
        .optional(),
    experiences: z
        .string()
        .max(500, "Les expériences sont limitées à 500 caractères.")
        .optional(),
    skills: z.array(z.number()).optional(),
    avatar: z.any().superRefine((files, ctx) => {
        if (files.length != 1) {
            return;
        }

        if (!ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Seuls les formats .jpg, .jpeg, .png and .webp sont acceptés.",
            });
        }

        if (files?.[0]?.size > MAX_FILE_SIZE) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                type: "array",
                message: `La taille maximum pour l'image est de 2MB.`,
                maximum: MAX_FILE_SIZE,
                inclusive: true,
            });
        }
    }),
});

const FormProfile = ({
    defaultData,
    skills,
    avatar,
    userId,
}: {
    defaultData: {
        firstname: string;
        lastname: string;
        birthdate: string | undefined;
        description: string;
        experiences: string;
        skills: Array<number>;
    };
    skills: {
        id: number;
        label: string;
    }[];
    avatar: string | undefined;
    userId: number;
}) => {

    const { update } = useSession();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultData,
    });

    const fileRef = form.register("avatar");

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const { avatar, ...values } = data;
        if (avatar.length == 1) {
            const file = avatar[0];
            const formData = new FormData();
            formData.append("file", file);

            const resUpload = await fetch("/api/uploads/avatar/" + userId, {
                method: "POST",
                body: formData,
            });
            // console.log(resUpload);
            if (!resUpload.ok) {
                const json = await resUpload.json();
                setError(json.message);
            }
            else {
                const json = await resUpload.json();
                update({ avatar: json.avatar })
            }
        }

        // console.log(values)
        const res = await fetch("/api/users/" + userId, {
            method: "PUT",
            body: JSON.stringify({
                data: {
                    ...values,
                    birthdate: new Date(values.birthdate),
                },
            }),
        });

        if (!res.ok) {
            const json = await res.json();
            setError(json.message);
        }
        router.refresh();
    }

    return (
        <Form {...form}>
            {error && (
                <Alert>
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 md:px-5"
            >
                <section className="flex gap-5 items-center">
                    <Avatar className="h-16 w-16">
                        {avatar ? (
                            <AvatarImage src={avatar} />
                        ) : (
                            <AvatarFallback>
                                {defaultData.firstname.charAt(0).toUpperCase() +
                                    defaultData.lastname
                                        .charAt(0)
                                        .toUpperCase()}
                            </AvatarFallback>
                        )}
                    </Avatar>

                    <FormField
                        control={form.control}
                        name="avatar"
                        render={() => {
                            return (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="shadcn"
                                            {...fileRef}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </section>
                <section className="flex flex-col md:flex-row gap-5">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom*</FormLabel>
                                <FormControl>
                                    <Input
                                        aria-label="Prénom"
                                        placeholder="Prénom"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom*</FormLabel>
                                <FormControl>
                                    <Input
                                        aria-label="Nom"
                                        placeholder="Nom"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthdate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de naissance*</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        aria-label="Date de naissance"
                                        placeholder="Date de naissance"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <section className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Décrivez vous pour qu'on puisse mieux vous connaître"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="experiences"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expériences</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Décrivez vos expériences pour mieux comprendre votre parcours"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="skills"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">
                                        Compétences (en tant que mentor)
                                    </FormLabel>
                                    <FormDescription>
                                        Sélectionner les compétences dans
                                        lesquelles vous pourriez aider les
                                        personnes.
                                    </FormDescription>
                                </div>
                                <div className="flex gap-5 flex-wrap justify-center md:px-10">
                                    {skills.map((skill) => (
                                        <FormField
                                            key={skill.id}
                                            control={form.control}
                                            name="skills"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={skill.id}
                                                        className="flex flex-row items-start space-x-2 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(
                                                                    skill.id
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    return checked
                                                                        ? field.onChange(
                                                                            [
                                                                                ...field.value!,
                                                                                skill.id,
                                                                            ]
                                                                        )
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (
                                                                                    value
                                                                                ) =>
                                                                                    value !==
                                                                                    skill.id
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {skill.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <div className="flex justify-end">
                    <Button className="mt-5 " type="submit">
                        Enregistrer les modifications
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default FormProfile;
