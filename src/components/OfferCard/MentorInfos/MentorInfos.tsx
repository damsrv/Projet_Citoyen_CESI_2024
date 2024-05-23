import {User} from "@prisma/client";

interface MentorInfosProps {
    mentor: User
}
export default async function MentorInfos({mentor}: MentorInfosProps) {
    return (
        <div>
            <p>{mentor.firstname} {mentor.lastname}</p>
            <p></p>
            <p></p>
        </div>
    )
}