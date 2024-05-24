"use client"; import React from 'react';
import H3 from "../ui/Typography/h3"; import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import NavContent from "./NavContent";
import { ChevronDown, ChevronUp } from "lucide-react";



const ProfileNav = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            {/* MENU DESKTOP */}
            <div className="bg-white border w-64 rounded-lg p-5 hidden lg:flex flex-col gap-5">
                <H3 className="text-xl lg:text-xl">Menu</H3>
                <NavContent />
            </div>

            {/* MENU MOBILE */}
            <Collapsible open={open} onOpenChange={setOpen} className="bg-white border rounded-lg p-5 flex lg:hidden flex-col gap-5 items-start">
                <CollapsibleTrigger className="flex justify-between items-center w-full" ><H3 className="text-xl lg:text-3xl">Menu</H3>{open ?
                    <ChevronDown size={24} className=" shrink-0 transition-transform duration-200" /> :
                    <ChevronUp size={24} className=" shrink-0 transition-transform duration-200" />
                }
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <NavContent />
                </CollapsibleContent>
            </Collapsible>
        </>
    );
};

export default ProfileNav;
