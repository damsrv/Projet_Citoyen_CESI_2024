import {Offers, Prisma, Users} from "@prisma/client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import OffersDefaultArgs = Prisma.OffersDefaultArgs;

interface OfferCardProps {
    offer: Prisma.OffersSelect
}

export default async function OfferCard({offer}: OfferCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {offer.content}
            </CardContent>
            <CardFooter>
                <Button variant="primary" asChild>
                    <a href={`/offers/mentoring/${offer.id}`}>Voir l'offre</a>
                </Button>
            </CardFooter>
        </Card>
    )
}