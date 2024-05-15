import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Page() {

  return (
    <>
        HomePage
    </>
  );
}