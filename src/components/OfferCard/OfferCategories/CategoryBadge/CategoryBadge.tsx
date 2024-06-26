import {Category} from "@prisma/client";

interface CategoryBadgeProps {
    category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
    return (
        <span className="flex items-center justify-center py-0.5 px-1 rounded-md text-sm bg-primary-light">
            {category.name}
        </span>
    )
}