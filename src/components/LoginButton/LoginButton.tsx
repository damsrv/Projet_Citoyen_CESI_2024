"use client"

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

export default async function LoginButton() {
    return (
        <Button variant="primary-outline" onClick={() => signIn()}>Se connecter</Button>
    )
}