import {ReactNode} from "react";

const H1 = ({children}: { children: ReactNode }) => {
    return (
        <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
            {children}
        </h1>
    )
}

export default H1;