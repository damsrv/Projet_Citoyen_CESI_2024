import {ReactNode} from "react";

const Lead = ({children, className = ""}: { children: ReactNode, className?: String }) => {
    return (
        <p className={className + " font-base"}>
            {children}
        </p>
    )
}

export default Lead;