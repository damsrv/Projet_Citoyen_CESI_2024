import { PrismaClient } from '@prisma/client'
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from 'bcrypt';
import { User } from 'next-auth';


// interface LoginResponse {
//     user: User;
//     jwt: string;
// }
const prisma = new PrismaClient()

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "..." },
        password: { label: "Mot de passe", type: "password", placeholder: "..." },
      },

      async authorize(credentials, req) {
        if (!credentials?.password || !credentials?.email) {
          return null;
        }
        try {
            // Call database pour récup le password du user en base. 
            const dbUser = await prisma.users.findFirst({
                where: {email: credentials.email}
            });

            if (dbUser !== null && dbUser.password !== null) {

              // méthode à utiliser pour encrypter les password du user lors de la connexion.
              // const pass = "password";
              // const encryptedPassword = await bcrypt.hash(pass, 10);
              
              //Vérifie que les password correspondent et si oui renvoi le user à handleSubmit de credentialsForm
              const isCorrectPassword = await bcrypt.compare(credentials?.password, dbUser.password)

              if (isCorrectPassword){
                return dbUser as User;
              }
            }          
        }
        catch(error){
          console.log(error);
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  };