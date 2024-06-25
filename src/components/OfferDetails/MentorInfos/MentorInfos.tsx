"use client"
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import H3 from "@/components/ui/Typography/h3";
import H4 from "@/components/ui/Typography/h4";
import { getDateDeltaFromNowString } from "@/lib/utils";
import Muted from "@/components/ui/Typography/muted";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Prisma } from "@prisma/client";
import UserGetPayload = Prisma.UserGetPayload;

interface MentorInfosProps {
    mentor: UserGetPayload<{
        include: { offers: true, userSkills: { include: { skill: true } } }
    }>
}


const OtherInfos = ({ mentor }: MentorInfosProps) => {

    return (<div className="flex flex-col gap-2">
        <section className="mb-2">
            <H4 className="">Compétences</H4>
            <div className="flex gap-5">
                {mentor.userSkills.length > 0
                    ? mentor.userSkills.map((userSkill) => (
                        <div
                            key={userSkill.skill.id}
                            className="bg-gray-100 p-2 rounded-lg"
                        >
                            {userSkill.skill.name}
                        </div>
                    ))
                    : "Aucune compétence renseignée"}
            </div>
        </section>
        <section className="mb-2">
            <H4 className="">Expériences</H4>
            <p>{mentor.experiences}</p>
        </section>
        <section>
            <H4 className="">Offres</H4>
            <p>{mentor.offers.length - 1 == 0 ? "Aucune autre offre de ce mentor" : (mentor.offers.length - 1) + " autre(s) offre(s) de ce mentor"} </p>
        </section>
    </div>
    )
}


export default function MentorInfos({ mentor }: MentorInfosProps) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="lg:order-1 py-10 lg:py-5 p-5 bg-white lg:border lg:rounded-lg space-y-3  flex flex-col gap-2 lg:min-w-[33%]">
            <header className='flex items-center gap-2'>
                <Avatar className="h-14 w-14">
                    {!!mentor.avatar && (
                        <AvatarImage src={mentor.avatar} />
                    )}
                    <AvatarFallback>{mentor.firstname.charAt(0).toUpperCase()}{mentor.lastname.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <H3>{mentor.firstname} {mentor.lastname}</H3>
                    <Muted>Inscrit depuis {getDateDeltaFromNowString(mentor.registerAt)}</Muted>
                </div>
            </header>

            <section>
                <H4 className="">Description</H4>
                <p>{mentor.description}</p>
            </section>

            <div className="hidden lg:block">
                <OtherInfos mentor={mentor} />
            </div>


            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="lg:hidden w-full space-y-2"
            >
                {!isOpen &&
                    <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-end text-primary ">
                            <h4 className="text-sm font-semibold">
                                Voir plus
                            </h4>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </div>
                    </CollapsibleTrigger>
                }
                <CollapsibleContent className="space-y-2">
                    <OtherInfos mentor={mentor} />
                </CollapsibleContent>

                {isOpen &&
                    <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-end text-primary ">
                            <h4 className="text-sm font-semibold">
                                Voir moins
                            </h4>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronUp className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </div>
                    </CollapsibleTrigger>
                }
            </Collapsible>
        </div>
    )
}