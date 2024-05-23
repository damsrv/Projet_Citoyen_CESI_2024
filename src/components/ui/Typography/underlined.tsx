import {ReactNode} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";


const underlineVariants = cva(
    "z-[1] relative after:content-[''] after:w-[104%] after:h-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:-z-[1]",
    {
        variants: {
            variant: {
                primary: "after:bg-primary-light",
                secondary: "after:bg-secondary-light"
            }
        },
        defaultVariants: {
            variant: "primary"
        },
    }
)

type UnderlineProps = VariantProps<typeof underlineVariants>
interface UnderlinedProps extends UnderlineProps {}
const Underlined = ({children, variant}: UnderlinedProps & { children: ReactNode}) => {
    return (
        <span
            className={cn(underlineVariants({variant}))}
        >
            {children}
        </span>
    );
};

export {Underlined, underlineVariants};
