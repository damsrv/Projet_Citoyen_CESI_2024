import {ReactNode} from "react";

const Muted = ({children, className = ""}: { children: ReactNode, className?: String }) => {
    return (
        <p className={className + " text-sm text-muted-foreground"}>{children}</p>
    )
}

export default Muted;