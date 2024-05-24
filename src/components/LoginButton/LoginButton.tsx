import {Button} from "@/components/ui/button";

export default async function LoginButton() {
    return (
        <Button variant="primary-outline" asChild>
            <a href='/connexion'>Se connecter</a>
        </Button>
    )
}