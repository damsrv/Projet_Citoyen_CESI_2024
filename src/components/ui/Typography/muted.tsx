import {ReactNode} from "react";

const Muted = ({children}: { children: ReactNode }) => {
    return (
        <p className="text-sm text-muted-foreground">{children}</p>
    )
}

export default Muted;