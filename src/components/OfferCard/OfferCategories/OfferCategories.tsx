import {Prisma} from "@prisma/client";
import CategoryBadge from "@/components/OfferCard/OfferCategories/CategoryBadge/CategoryBadge";
import CategoryTypeBadge from "@/components/OfferCard/OfferCategories/CategoryTypeBadge/CategoryTypeBadge";
import CategoryGetPayload = Prisma.CategoryGetPayload;

interface MentorInfosProps {
    category: CategoryGetPayload<{ include: { categoryType: true } }>
}

export default function OfferCategories({category}: MentorInfosProps) {
    return (
        <span className="flex flex-wrap gap-2">
            <CategoryTypeBadge categoryType={category.categoryType!}/>
            <CategoryBadge category={category}/>
        </span>
    )
}