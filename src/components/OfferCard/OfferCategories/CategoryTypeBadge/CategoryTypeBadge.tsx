import {CategoryType} from "@prisma/client";

interface CategoryTypeBadgeProps {
    categoryType: CategoryType
}
export default function CategoryTypeBadge({ categoryType }: CategoryTypeBadgeProps) {
    return (
        <span className="flex items-center justify-center py-0.5 px-1 rounded-md text-sm bg-secondary-light">
            {categoryType.name}
        </span>
    )
}