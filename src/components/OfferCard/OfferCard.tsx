import {Offers, Prisma, Users} from "@prisma/client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import OffersGetPayload = Prisma.OffersGetPayload;

interface OfferCardProps {
    offer: OffersGetPayload<{include: { users: true }}>
}

export default async function OfferCard({offer}: OfferCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription>
                    {offer.users
                        ?
                            (<>{offer.users.firstname} {offer.users.lastname}</>)
                        :
                            (<>Aucun mentor pour cet offre</>)
                    }
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