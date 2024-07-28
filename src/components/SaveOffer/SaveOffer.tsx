"use client"
import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { Star } from "lucide-react";

const SaveOffer = ({ offerId, userId }: { offerId: number, userId: number }) => {

    const [saved, setSaved] = useState(false)

    const saveOffer = async () => {
        try {
            const res = await fetch(`/api/saved-offer/${offerId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                setSaved(!saved);
            }
        } catch (e) {
            console.log(e);
        }
    }


    const unsaveOffer = async () => {
        try {
            const res = await fetch(`/api/saved-offer/${offerId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                setSaved(!saved);
            }
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
    }, [saved, offerId])


    useEffect(() => {
        // check if offer is saved
        const checkSavedOffer = async () => {
            try {
                const res = await fetch(`/api/saved-offer/${offerId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.status === 200) {
                    setSaved(true);
                }
                else {
                    setSaved(false);
                }
            } catch (e) {
                // console.log(e);
            }
        }


        checkSavedOffer()
    }, [])

    return (
        <div>
            {saved ? (
                <button onClick={unsaveOffer} className='remove-saved-offer' title="Retirer l'offre des favoris"><Star size={36} fill='#EBAE17' stroke='#EBAE17' /></button>
            ) : (
                <button onClick={saveOffer} className='add-saved-offer' title="Ajouter l'offre aux favoris"><Star size={36} /></button>
            )}
        </div>
    )
}


export default SaveOffer