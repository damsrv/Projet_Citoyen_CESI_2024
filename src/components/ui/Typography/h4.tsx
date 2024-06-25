import { ReactNode } from "react";

const H4 = ({ children, className = "" }: { children: ReactNode, className?: String }) => {
    return (
        <h4 className={className + " scroll-m-20 text-lg font-semibold tracking-tight"}>
            {children}
        </h4>
    )
}

export default H4;