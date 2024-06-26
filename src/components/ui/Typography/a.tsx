import { HTMLProps } from "react";
import Link from "next/link";

interface AProps extends HTMLProps<HTMLAnchorElement> {

}
const A = ({ href, children }: AProps) => {
    return (
        <Link
            href={href!}
            className="font-medium text-primary underline underline-offset-4"
        >
            {children}
        </Link>
    )
}

export default A;