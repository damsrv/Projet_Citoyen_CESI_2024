"use client";

import React from 'react';
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
            <div className="bg-white border max-w-64 w-64 p-5 hidden grow lg:flex sticky top-0 flex-col h-5xl divide-y-2">
                <NavContent />
            </div>

            {/* MENU MOBILE */}
            <Collapsible open={open} onOpenChange={setOpen} className="bg-white border rounded-lg p-5 flex lg:hidden flex-col gap-5 items-start w-full">
                <CollapsibleTrigger className="flex justify-between items-center w-full" ><H3 className="text-xl lg:text-3xl">Menu</H3>{!open ?
                    <ChevronDown size={24} className=" shrink-0 transition-transform duration-200" /> :
                    <ChevronUp size={24} className=" shrink-0 transition-transform duration-200" />
                }
                </CollapsibleTrigger>
                <CollapsibleContent className="w-full">
                    <NavContent />
                </CollapsibleContent>
            </Collapsible>
        </>
    );
};

export default ProfileNav;
