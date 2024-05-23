import { ReactNode } from "react";

const Underlined = ({ children, variant = null }: { children: ReactNode; variant?: String | null; }) => {
    console.log(variant);
    let variantUnderlined =
        variant == null
            ? "after:bg-primary-light"
            : "after:bg-" + variant + "-light";
    console.log(variantUnderlined);
    return (
        <span className={"z-[1] relative after:content-[''] after:w-[104%] after:h-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:-z-[1] " + variantUnderlined
        }
        >
            {children}
        </span>
    );
};

export default Underlined;
