"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import H1 from "../ui/Typography/h1";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CityAutocomplete from "./CityAutocomplete";


const FormProfile = ({
    defaultData,
    comTypes,
    status,
    categories,
    userId,
}: {
    defaultData: {
        id: number | undefined;
        content: string | undefined;
        location: string | undefined;
        title: string | undefined;
        status: string | undefined;
        categoryId: string | undefined;
        offerComTypes: number[];
    };
    comTypes: {
        id: number;
        label: string;
    }[];
    status: {
        id: number;
        label: string;
    }[];
    categories: {
        categoryTypeLabel: string;
        children: {
            id: number;
            label: string;
        }[];
    }[];
    userId: number;
}) => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [isCitySelected, setIsCitySelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        content: z
            .string()
            .min(50, "Le contenu de l'offre doit faire au moins 50 caractères.")
            .max(500, "Le contenu de l'offre est limité à 500 caractères."),
        location: z.string().refine((value) => {
            console.log("-----------");
            console.log(value);
            console.log(isCitySelected);
            if (value.length === 0) return true; // Field is empty, this is valid
            if (value.length > 0 && isCitySelected) return true; // Field is not empty and city is selected, this is valid
            if (value.length > 0 && !isCitySelected) return false; // Field is not empty but city is not selected, this is invalid
            return isCitySelected; // Validate based on the isCitySelected state
        }, {
            message: 'Ville invalide',
        }),
        title: z
            .string()
            .min(5, "Le titre de l'offre doit faire au moins 5 caractères.")
            .max(255, "Le titre de l'offre est limité à 255 caractères."),
        categoryId: z
            .string({
                required_error: "Champs requis",
                invalid_type_error: "Champs requis",
            })
            .regex(/^\d+$/),
        offerComTypes: z.array(z.number()).optional(),
        status: z
            .string({
                required_error: "Champs requis",
                invalid_type_error: "Champs requis",
            })
            .regex(/^\d+$/),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultData,
    });

    const getCities = async (input: string) => {
        const response = await fetch(
            `https://geo.api.gouv.fr/communes?nom=${input}&boost=population&limit=10`
        );
        return response.json
            ? response.json().then((json) => json)
            : [];
    }


    useEffect(() => {
        form.reset(defaultData);
    }, [defaultData]);

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);
        let dataToSend = {
            content: data.content,
            title: data.title,
            location: data.location,
            status: parseInt(data.status),
            categoryId: parseInt(data.categoryId),
            offerComTypes: data.offerComTypes,
            mentorId: userId,
        };

        if (defaultData.id) {
            const response = await fetch(`/api/offers/${defaultData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: dataToSend }),
            });
            if (response.ok) {
                toast.success("L'offre a bien été enregistrée.");
                router.back();
                // TODO : toast success
            } else {
                setError(
                    "Une erreur est survenue lors de l'enregistrement de l'offre."
                );
            }

        } else {
            const response = await fetch(`/api/offers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: dataToSend }),
            });
            if (response.ok) {
                router.push(`/offres-mentorat/${(await response.json()).id}`);
                // TODO : toast success
                toast.success("L'offre a bien été enregistrée.");
            } else {
                setError(
                    "Une erreur est survenue lors de l'enregistrement de l'offre."
                );
            }
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 px-4"
            >
                <section className="flex flex-col gap-5 bg-white p-5 border w-full rounded-lg">
                    <H1 className="text-xl lg:text-xl">
                        {defaultData.id
                            ? "Modifier une offre de mentorat"
                            : "Créer une nouvelle offre de mentorat"}
                    </H1>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titre*</FormLabel>
                                <FormControl>
                                    <Input
                                        aria-label="Titre de l'offre"
                                        placeholder="Titre de l'offre"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description*</FormLabel>
                                <FormControl>
                                    <Textarea
                                        aria-label="Description de l'offre"
                                        placeholder="Description de l'offre"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Catégorie*</FormLabel>
                                <FormControl>
                                    <Select data-testid="category-select"
                                        onValueChange={field.onChange}
                                        defaultValue={
                                            defaultData.categoryId ?? ""
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger id="select-category">
                                                <SelectValue placeholder="Sélectionner une catégorie" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent id="select-category-content">
                                            {categories.map(
                                                (categoryType, index) => (
                                                    <SelectGroup key={index}>
                                                        <SelectLabel>
                                                            {
                                                                categoryType.categoryTypeLabel
                                                            }
                                                        </SelectLabel>
                                                        {categoryType.children.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={category.id.toString()}
                                                                >
                                                                    {
                                                                        category.label
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="offerComTypes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Types de communication de l'offre
                                </FormLabel>
                                <div className="flex gap-2 flex-wrap justify-start ">
                                    {comTypes.map((comType) => (
                                        <FormField
                                            key={comType.id}
                                            control={form.control}
                                            name="offerComTypes"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={comType.id}
                                                        className="flex flex-row items-start space-x-1 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(
                                                                    comType.id
                                                                )}
                                                                onCheckedChange={(
                                                                    checked
                                                                ) => {
                                                                    return checked
                                                                        ? field.onChange(
                                                                            [
                                                                                ...field.value!,
                                                                                comType.id,
                                                                            ]
                                                                        )
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (
                                                                                    value
                                                                                ) =>
                                                                                    value !==
                                                                                    comType.id
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {comType.label}
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

                    {/* <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ville"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <CityAutocomplete
                        control={form.control}
                        name="location"
                        label="Ville"
                        placeholder="Ville"
                        setIsCitySelected={setIsCitySelected} // Pass the setter as a prop
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Statut de l'offre*</FormLabel>
                                <div className="flex gap-2 flex-wrap ">
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        className="flex flex-row"
                                    >
                                        {status.map((st) => (
                                            <FormField
                                                key={st.id}
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={st.id}
                                                            className="flex flex-row items-center  space-x-1 space-y-0"
                                                        >
                                                            <RadioGroupItem
                                                                checked={
                                                                    field.value ===
                                                                    st.id.toString()
                                                                }
                                                                value={st.id.toString()}
                                                                id={
                                                                    "status" +
                                                                    st.id
                                                                }
                                                            />
                                                            <Label
                                                                htmlFor={
                                                                    "status" +
                                                                    st.id
                                                                }
                                                            >
                                                                {st.label}
                                                            </Label>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}
                                    </RadioGroup>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                {error && (
                    <Alert>
                        <AlertTitle>Erreur</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="flex justify-end">

                    {isLoading ?
                        <Button type="submit" disabled>Chargement...</Button>
                        :
                        <Button className="mt-5 " type="submit">
                            Enregistrer l'offre
                        </Button>
                    }
                </div>
            </form>
        </Form>
    );
};

export default FormProfile;
