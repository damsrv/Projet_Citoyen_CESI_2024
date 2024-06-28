"use client"

import {z} from "zod";
import {Category, CategoryType, Prisma} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import CategoryTypeGetPayload = Prisma.CategoryTypeGetPayload;
import {useContext, useState} from "react";
import {Undo2} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {OffersListContext} from "@/context/OffersListContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type CategoryTypeWithSubCategories = CategoryTypeGetPayload<{
    include: { categories: true }
}>

const formSchema = z.object({
    categoryType: z.string({
        required_error: "Choisissez au moins une catégorie"
    }),
    category: z.string().optional()
})

interface FilterFormProps {
    categoryTypes: CategoryTypeWithSubCategories[]
    categories: Category[],
}

export default function FilterForm({categoryTypes, categories}: FilterFormProps) {
    const [categorySelection, setCategorySelection] = useState<CategoryTypeWithSubCategories | undefined>();
    const {canFilter,setCanFilter} = useContext(OffersListContext)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {push, replace} = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryType: "",
            category: undefined,
        }
    })


    const queryClient = useQueryClient();

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setCanFilter(false);
        if (data.categoryType === undefined) return;

        const querySearchParams = new URLSearchParams();
        querySearchParams.set("categoryType", String(data.categoryType));

        if (data.category) querySearchParams.set("category", String(data.category));

        push(`${pathname}?page=1&${querySearchParams.toString()}`)
    }

    async function resetFilters() {
        push(`${pathname}?page=1`)
    }

    async function handleReset() {
        setCategorySelection(undefined);
        await resetFilters()
        form.resetField("categoryType")
        form.reset()
    }

    function getCategoryTypeById(id: string): CategoryTypeWithSubCategories | undefined {
        return categoryTypes.find((categoryType) => categoryType.id.toString() === id)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="categoryType"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <div className="flex items-center gap-3">
                                <Select onValueChange={(e) => {
                                    field.onChange(e)
                                    setCategorySelection(getCategoryTypeById(e))
                                }} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisissez une catégorie"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categoryTypes.map((categoryType) => {
                                            return (
                                                <SelectItem
                                                    value={categoryType.id.toString()}
                                                    key={categoryType.id}
                                                >
                                                    <p className="truncate max-w-[90vw]">{categoryType.name}</p>
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <button type="button" onClick={handleReset}>
                                    <Undo2/>
                                </button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />


                {categorySelection && (
                    <FormField
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Catégorie</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisissez une sous catégorie"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="w-[90vw]">
                                        {categorySelection.categories.map((category) => {
                                            return (
                                                <SelectItem
                                                    value={category.id.toString()}
                                                    key={category.id}
                                                >
                                                    <p>{category.name}</p>
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit"
                        disabled={form.getValues('categoryType') === ""}>Filtrer</Button>
            </form>
        </Form>
    )
}