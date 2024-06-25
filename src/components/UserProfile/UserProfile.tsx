import React from "react";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";
import H3 from "@/components/ui/Typography/h3";
import Muted from "@/components/ui/Typography/muted";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Prisma } from "@prisma/client";
import UserGetPayload = Prisma.UserGetPayload;

const UserProfil = ({
    user,
}: {
    user: UserGetPayload<{
        include: {
            offers: {
                include: {
                    mentor: true;
                    category: {
                        include: { categoryType: true };
                    };
                };
            };
            userSkills: {
                include: {
                    skill: true;
                };
            };
        };
    }>;
}) => {
    let age = user.birthdate
        ? formatDistanceToNowStrict(user.birthdate, {
              addSuffix: false,
              locale: fr,
          })
        : ""; // ajoute l'âge en plus du nom et prénom;

    return (
        <div className="bg-white p-5 border w-full rounded-lg">
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-5">
                    <Avatar className="w-20 h-20">
                        {!!user.avatar && <AvatarImage src={user.avatar} />}
                        <AvatarFallback>
                            {user.firstname.charAt(0).toUpperCase()}
                            {user.lastname.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-2xl !font-semibold">
                            {/* ajoute l'âge en plus du nom et prénom */}
                            {user.firstname} {user.lastname} - {age}
                        </h2>
                        <Muted>
                            Inscrit depuis{" "}
                            {formatDistanceToNow(user.registerAt, {
                                addSuffix: false,
                                locale: fr,
                            })}
                        </Muted>
                        <p>
                            {user.description ??
                                "Aucune description renseignée"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div>
                    <H3 className="">Compétences</H3>
                    <div className="flex gap-5">
                        {user.userSkills.length > 0
                            ? user.userSkills.map((userSkill) => (
                                  <div
                                      key={userSkill.skill.id}
                                      className="bg-gray-100 p-2 rounded-lg"
                                  >
                                      {userSkill.skill.name}
                                  </div>
                              ))
                            : "Aucune compétence renseignée"}
                    </div>
                </div>

                <div>
                    <H3 className="">Expériences</H3>
                    <p>{user.experiences ?? "Aucune expérience renseignée"}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfil;
