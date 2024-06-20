import {HTMLProps} from "react";

interface AProps extends HTMLProps<HTMLAnchorElement> {

}
const A = ({href, children}: AProps) => {
    return (
        <a
            href={href}
            className="font-medium text-primary underline underline-offset-4"
        >
            {children}
        </a>
    )
}

export default A;