import {User} from "@prisma/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import H4 from "@/components/ui/Typography/h4";
import {getDateDeltaFromNowString} from "@/lib/utils";

interface MentorInfosProps {
    mentor: User
}

export default async function MentorInfos({mentor}: MentorInfosProps) {

    return (
        <div className="p-4 bg-secondary-light space-y-3 rounded-md flex flex-col min-w-[25%]">
            <header className='flex items-center gap-2'>
                <Avatar className="h-14 w-14">
                    {!!mentor.avatar && (
                        <AvatarImage src={mentor.avatar}/>
                    )}
                    <AvatarFallback>{mentor.firstname.charAt(0).toUpperCase()}{mentor.lastname.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <p>{mentor.firstname} {mentor.lastname}</p>
                    <p>Inscrit depuis {getDateDeltaFromNowString(mentor.registerAt)}</p>
                </div>
            </header>
            <section>
                <H4 className="mb-1.5">Description</H4>
                <p>{mentor.description}</p>
            </section>
        </div>
    )
}