import {ComType} from "@prisma/client";
import {CheckIcon} from "lucide-react";

interface ComTypeBadgeProps {
    comType: ComType
}
export default async function ComTypeBadge({ comType }: ComTypeBadgeProps) {
    return (
        <div className="flex items-center gap-0.5 py-1 px-1.5 bg-primary-light rounded-md">
            <CheckIcon/>
            {comType.name}
        </div>
    )
}