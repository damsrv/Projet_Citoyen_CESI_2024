import {CategoryType, Offer, Prisma, User} from "@prisma/client";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import OfferGetPayload = Prisma.OfferGetPayload;
import OfferCategories from "@/components/OfferCard/OfferCategories/OfferCategories";

interface OfferCardProps {
    offer: OfferGetPayload<{ include: { mentor: true, category: { include: { categoryType: true } } } }>
}

export default function OfferCard({offer}: OfferCardProps) {
    return (
        <Card className="flex flex-col w-full h-full">
            <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
                <CardDescription className="flex flex-col gap-1">
                    {offer.mentor
                        ?
                        (<>{offer.mentor.firstname} {offer.mentor.lastname}</>)
                        :
                        (<>Aucun mentor pour cet offre</>)
                    }
                    <OfferCategories category={offer.category}/>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex grow">
                <p className="line-clamp-2 break-words">
                    {offer.content}
                </p>
            </CardContent>
            <CardFooter className="flex shrink justify-end">
                <Button variant="primary" asChild>
                    <a href={`/offres-mentorat/${offer.id}`}>Voir l'offre</a>
                </Button>
            </CardFooter>
        </Card>
    )
}