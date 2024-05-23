import { ReactNode } from "react";

const Large = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: String;
}) => {
    return (
        <div
            className={
                className + " text-lg md:text-2xl xl:text-4xl font-semibold"
            }
        >
            {children}
        </div>
    );
};

export default Large;
