import {ReactNode} from "react";

const H2 = ({children, className = ""}: { children: ReactNode, className?: String }) => {
    return (
        <h2 className={className + " scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0"}>
            {children}
        </h2>
    )
}

export default H2;