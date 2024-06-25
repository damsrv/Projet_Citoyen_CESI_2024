import { ReactNode } from "react";

const H1 = ({ children, className = "" }: { children: ReactNode, className?: String }) => {
    return (
        <h1 className={className + " scroll-m-20 text-3xl font-semibold tracking-tight lg:text-5xl"}>
            {children}
        </h1>
    )
}

export default H1;