import FormProfile from "@/components/Profile/FormProfile";
import H1 from "@/components/ui/Typography/h1";
import Muted from "@/components/ui/Typography/muted";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

// TODO : corriger le typescript

const getSkills = async () => {
    // récupérer les infos du user
    const skills = await prisma.skill.findMany(
        {}
    )

    return skills.map((skill) => {
        return { id: skill.id, label: skill.name }
    })
}


const getData = async (session: Session) => {
    // récupérer les infos du user
    const user = await prisma.user.findFirst(
        {
            where: { email: session.user.email },
            include: {
                userSkills: {
                    include: {
                        skill: true
                    }
                }
            }
        }
    )

    return {
        firstname: user?.firstname ?? "",
        lastname: user?.lastname ?? "",
        birthdate: new Date(user?.birthdate).toISOString().split('T')[0],
        description: user?.description ?? "",
        experiences: user?.experiences ?? "",
        skills: user?.userSkills.map((userSkill) => { return userSkill.skill.id }),
    }
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    const userData = await getData(session);

    return (
        <div className="flex flex-col justify-start gap-5 grow ">
            <div className="bg-white p-5 border w-full rounded-lg">
                <div className="flex justify-between items-center mb-5">
                    <H1 className="text-xl lg:text-xl">Modifier le profil</H1>
                    <Muted>* champs obligatoires</Muted>
                </div>

                <FormProfile defaultData={userData} skills={await getSkills()} avatar={session.avatar ?? undefined} />
            </div>
        </div>
    );
}
