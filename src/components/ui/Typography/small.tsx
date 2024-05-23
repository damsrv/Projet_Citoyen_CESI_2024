import {ReactNode} from "react";

const Small = ({children, className = ""}: { children: ReactNode, className?: String }) => {
    return <small className={className + " text-sm font-medium leading-none"}>{children}</small>
}

export default Small;