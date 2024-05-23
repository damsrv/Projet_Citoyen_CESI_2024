import Image from "next/image";
import H1 from "@/components/ui/Typography/h1";
import {RegisterForm} from "@/components/RegisterForm/RegisterForm";
import {LoginForm} from "@/components/LoginForm/LoginForm";

export default async function LoginPage({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    const errorMessage =
        searchParams.error === "CredentialsSignin"
            ? "Identifiants incorrects"
            : undefined
    return (
        <div className="flex justify-evenly items-center w-full grow">
            <div className="relative">
                <Image
                    className="illustration-home md:order-1"
                    src={"/assets/illustration-auth.svg"}
                    alt={""}
                    width={500}
                    height={500}
                />
            </div>
            <section>
                <H1 className="mb-5">Connexion</H1>
                <LoginForm error={errorMessage}/>
            </section>
        </div>
    )
}