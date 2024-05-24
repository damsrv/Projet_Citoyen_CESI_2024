import FormProfile from "@/components/Profile/FormProfile";
import H1 from "@/components/ui/Typography/h1";

export default async function Profile() {
    return (
        <div className="flex flex-col justify-start gap-5 grow h-64 w-64">
            <div className="bg-white p-5 border w-full rounded-lg">
                <H1 className="text-xl lg:text-2xl mb-5">Gérer le profil</H1>
                <FormProfile />
            </div>
        </div>
    );
}
