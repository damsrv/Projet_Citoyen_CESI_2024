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
            <div className="bg-white border  min-w-64 w-64 rounded-lg p-5 hidden h-max max-h-full lg:flex flex-col divide-y-2">
                <NavContent />
            </div>

        </>
    );
};

export default ProfileNav;
