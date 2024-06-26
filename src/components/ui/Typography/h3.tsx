import { ReactNode } from "react";

const H3 = ({ children, className = "" }: { children: ReactNode, className?: String }) => {
    return (
        <h3 className={className + " scroll-m-20 text-xl font-semibold tracking-tight"}>
            {children}
        </h3>
    )
}

export default H3;