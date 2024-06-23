import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Prisma } from "@prisma/client"
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;

export function ModalAccepted({ offerStudent }: { offerStudent: OfferStudentGetPayload<{ include: { offer: true, student: true } }> }) {


    const handleClick = async () => {

        console.log("Accepter la demande")
        //  si l'utilisateur accepte la demande de contact, on met à jour l'offerStudent avec le statut 1
        //  et on envoie un message à l'étudiant pour lui dire que sa demande a été acceptée
        let offerId = offerStudent.offer.id
        let studentId = offerStudent.student.id

        // 1. Mettre à jour l'offerStudent via l'API
        const res = await fetch(`/api/offerStudents/${offerId}/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 1 }),
        })

        if (!res.ok) {
            console.error("Erreur lors de la mise à jour de l'offerStudent")
            return
        }
        else {
            // 2. Envoyer un message à l'étudiant
            // TODO : Notifier l'étudiant que sa demande a été acceptée
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="positive">Accepter</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Accepter la demande de contact</DialogTitle>
                    <DialogDescription>
                        Vous avez reçu une demande de contact de {offerStudent.student.firstname} {offerStudent.student.lastname} pour l'offre {offerStudent.offer.title}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">Annuler</Button>
                    </DialogClose>
                    <Button type="button" variant={"positive"} onClick={() => handleClick()}>Accepter</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}