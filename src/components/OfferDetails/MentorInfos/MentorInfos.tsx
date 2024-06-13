import {User} from "@prisma/client";

interface MentorInfosProps {
    mentor: User
}

export default async function MentorInfos({mentor}: MentorInfosProps) {
    return (
        <div className="p-4 bg-secondary-light rounded-md flex flex-col min-w-[25%]">
            <p>{mentor.firstname} {mentor.lastname}</p>
        </div>
    )
}