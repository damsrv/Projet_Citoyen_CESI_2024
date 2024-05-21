import {ReactNode} from "react";
import {cva} from "class-variance-authority";

const P = ({children, variant = "default"}: { children: ReactNode, variant?: "default" | "underlined" }) => {
    return (
        <p className={"z-[1] leading-7 [&:not(:first-child)]:mt-6 "}>
            {children}
        </p>
    )
}

export default P;