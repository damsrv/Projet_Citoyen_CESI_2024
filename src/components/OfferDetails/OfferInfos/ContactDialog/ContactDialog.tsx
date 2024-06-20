import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import ContactDialogForm from "@/components/OfferDetails/OfferInfos/ContactDialog/ContactDialogForm/ContactDialogForm";
import {Offer} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";


interface ContactDialogProps {
    offer: Offer
}

export default async function ContactDialog({offer}: ContactDialogProps) {
    const session = await getServerSession(authOptions)
    return (
        <Dialog>
            <DialogTrigger asChild>
                    <Button>
                        Envoyer une demande
                    </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Envoyer une demande de contact</DialogTitle>
                </DialogHeader>
                <ContactDialogForm offer={offer} user={session!.user}/>
            </DialogContent>
        </Dialog>
    )
}