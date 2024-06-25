import {User} from '@prisma/client'
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from 'bcrypt';
import {NextAuthOptions, User as AuthUser} from 'next-auth';
import prisma from "@/lib/prisma";


// interface LoginResponse {
//     user: User;
//     jwt: string;
// }


declare module "next-auth" {
    interface Session {
        user: Omit<User, "password">
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: Omit<User, "password">
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            id: "credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "..."},
                password: {label: "Mot de passe", type: "password", placeholder: "..."},
            },

            async authorize(credentials, req) {
                if (!credentials?.password || !credentials?.email) {
                    return null;
                }
                try {
                    // Call database pour récup le password du user en base.
                    let dbUser = await prisma.user.findFirst({
                        where: {email: credentials.email},
                    });

                    if (dbUser !== null && dbUser.password !== null) {

                        // méthode à utiliser pour encrypter les password du user lors de la connexion.
                        // const pass = "password";
                        // const encryptedPassword = await bcrypt.hash(pass, 10);

                        //Vérifie que les password correspondent et si oui renvoi le user à handleSubmit de credentialsForm
                        const isCorrectPassword = await bcrypt.compare(credentials?.password, dbUser.password)

                        if (isCorrectPassword) {
                            const {password, ...userInfos} = dbUser;
                            return userInfos as unknown as AuthUser;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async session({session, token, user}) {
            if(token.user) {
                session.user = token.user as User
            }
            return session;
        },
        async jwt({ user, token, trigger, session }) {
            if(user) {
                token.user = user as unknown as Omit<User, "password">
            }
            if (trigger === "update") {
                token.user.avatar = session.avatar
            }
            return token
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/connexion"
    }
} as NextAuthOptions;