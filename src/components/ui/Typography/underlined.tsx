import {ReactNode} from "react";
import {cva} from "class-variance-authority";

const Underlined = ({children}: { children: ReactNode}) => {
    return (
        <span className={"z-[1] relative after:content-[''] after:w-[104%] after:bg-red-300 after:h-2 after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-z-[1]"}>
            {children}
        </span>
    )
}

export default Underlined;