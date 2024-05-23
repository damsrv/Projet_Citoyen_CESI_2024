import {Button} from "@/components/ui/button";

export default async function RegisterButton() {
    return (
        <Button variant="primary" asChild>
            <a href="/inscription">S'inscrire</a>
        </Button>
    )
}