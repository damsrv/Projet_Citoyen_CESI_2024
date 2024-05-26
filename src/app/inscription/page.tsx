import H1 from "@/components/ui/Typography/h1";
import {RegisterForm} from "@/components/RegisterForm/RegisterForm";
import Image from "next/image";
import H3 from "@/components/ui/Typography/h3";
import Muted from "@/components/ui/Typography/muted";
import {NextRequest} from "next/server";

export default function RegisterPage() {
    return (
        <div className="flex justify-evenly items-center w-full grow">
            <div className="relative">
                <Image
                    className="illustration-home md:order-1"
                    src={"/assets/illustration-auth.svg"}
                    alt="illustration authentification"
                    width={500}
                    height={500}
                />
            </div>
            <section>
                <H1 className="mb-5">Inscription</H1>
                <RegisterForm/>
            </section>
        </div>
    )
}