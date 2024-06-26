"use client"

import {z} from "zod";
import {Category, CategoryType, Prisma} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import CategoryTypeGetPayload = Prisma.CategoryTypeGetPayload;
import {useState} from "react";
import {Undo2} from "lucide-react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

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
    const [categoryTypeSelection, setCategoryTypeSelection] = useState<CategoryTypeWithSubCategories | undefined>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryType: "",
            category: undefined,
        }
    })

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace} = useRouter()

    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (data.categoryType === undefined) return;

        const querySearchParams = new URLSearchParams();
        querySearchParams.set("categoryType", String(data.categoryType));

        if (data.category) querySearchParams.set("category", String(data.category));

        try {
            const res = await fetch(`/api/offers?page=1&${querySearchParams.toString()}`)

            console.log(await res.json());

            replace(`${pathname}?${querySearchParams.toString()}`)
        } catch (e) {
            console.error(e);
        }
    }

    function handleReset() {
        setCategoryTypeSelection(undefined);
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
                                    setCategoryTypeSelection(getCategoryTypeById(e))
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
                                                    {categoryType.name}
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


                {categoryTypeSelection && (
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
                                    <SelectContent>
                                        {categoryTypeSelection.categories.map((category) => {
                                            return (
                                                <SelectItem
                                                    value={category.id.toString()}
                                                    key={category.id}
                                                >
                                                    {category.name}
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
                        disabled={form.getValues('categoryType') === "" || form.formState.isLoading}>Filtrer</Button>
            </form>
        </Form>
    )
}