import {ReactNode} from "react";

const Lead = ({children}: { children: ReactNode }) => {
    return (
        <p className="text-xl text-muted-foreground">
            {children}
        </p>
    )
}

export default Lead;