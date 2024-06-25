import H1 from "@/components/ui/Typography/h1";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";
import Image from "next/image";
import H3 from "@/components/ui/Typography/h3";
import Muted from "@/components/ui/Typography/muted";
import { NextRequest } from "next/server";

export default function RegisterPage() {
    return (



        <div className="flex justify-evenly items-center w-full grow p-4 bg-primary-background">
            <div className="relative hidden lg:block">
                <Image
                    className="illustration-home md:order-1"
                    src={"/assets/illustration-auth.svg"}
                    alt={""}
                    width={500}
                    height={500}
                />
            </div>
            <section className="box-border w-full lg:w-auto max-w-[500px] p-4 lg:p-10 bg-white border rounded-lg">
                <H1 className="mb-5">Inscription</H1>

                <div className="relative lg:hidden flex justify-center">
                    <Image
                        className="mb-4 md:order-1"
                        src={"/assets/illustration-auth.svg"}
                        alt={""}
                        width={200}
                        height={200}
                    />
                </div>    <Muted className={"text-center mb-4 lg:text-start"}>Rejoignez la communauté LeBonMentor ! Créez votre compte pour accéder à toutes les fonctionnalités.

                </Muted>
                <RegisterForm />
            </section>
        </div>
    )
}