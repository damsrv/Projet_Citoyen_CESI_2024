import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Prisma } from "@prisma/client";
import OfferStudentGetPayload = Prisma.OfferStudentGetPayload;
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function ModalRefused({
    offerStudent,
}: {
    offerStudent: OfferStudentGetPayload<{
        include: { offer: true; student: true };
    }>;
}) {
    const router = useRouter();
    const handleClick = async () => {
        console.log("Refuser la demande");
        //  si l'utilisateur refuse la demande de contact, on met à jour l'offerStudent avec le statut 2
        //  et on envoie un message à l'étudiant pour lui dire que sa demande a été refusée
        let offerId = offerStudent.offer.id;
        let studentId = offerStudent.student.id;
        let mentorId = offerStudent.offer.mentorId;

        // 1. Mettre à jour l'offerStudent via l'API
        const res = await fetch(
            `/api/offer-student/${studentId}/${mentorId}/${offerId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: { status: 2 } }),
            }
        );

        if (!res.ok) {
            console.error("Erreur lors de la mise à jour de l'offerStudent");
            return;
        } else {
            toast.success("La demande de contact a été refusée");
            router.refresh();

            // 2. Envoyer un message à l'étudiant
            // TODO : Notifier l'étudiant que sa demande a été refusée
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Refuser</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Accepter la demande de contact</DialogTitle>
                    <DialogDescription>
                        Vous avez reçu une demande de contact de{" "}
                        {offerStudent.student.firstname}{" "}
                        {offerStudent.student.lastname} pour l'offre{" "}
                        {offerStudent.offer.title}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            Annuler
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant={"destructive"}
                        onClick={() => handleClick()}
                    >
                        Refuser
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
