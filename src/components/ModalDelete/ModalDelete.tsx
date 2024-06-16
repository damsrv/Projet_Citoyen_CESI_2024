"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const ModalDelete = ({ objectToDelete, url, label, labelSuccess }: { objectToDelete: number, url: string, label: string, labelSuccess: string }) => {
    const router = useRouter();


    const dialogClose = () => {
        document.getElementById('close-dialog-' + objectToDelete)?.click();
    };

    const handleDelete = async () => {
        const res = await fetch(url + objectToDelete, {
            method: "DELETE",
        });

        if (res.status === 200) {
            dialogClose();
            toast.success(labelSuccess);
            router.refresh();
        } else {
            // console.log("res", res);
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>

            <DialogContent className={"modal-delete-object" + objectToDelete}>
                <DialogHeader>
                    <DialogTitle>Supprimer {label}</DialogTitle>
                    <DialogDescription>
                        Êtes-vous sûr de vouloir supprimer {label} ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-2">
                    <DialogClose>
                        <Button id={'close-dialog-' + objectToDelete} variant={"ghost"} className="w-full">
                            Annuler
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleDelete}
                        variant="error"
                    >
                        Valider
                    </Button>
                </DialogFooter>
            </DialogContent>

        </>
    );
};

export default ModalDelete;