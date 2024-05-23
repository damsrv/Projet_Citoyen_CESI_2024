import prisma from "@/lib/prisma";
import { Users } from "@prisma/client";
import { PrismaClient, Prisma } from '@prisma/client'
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';


export async function POST(req: Request) {

  const {data} = await req.json();
  const user: Users = data;

  user.birthdate = new Date(user.birthdate!);
  user.role = 2;
  user.is_active = true;

  try {
    // hashage password user
    const pass = user.password;
    user.password = await bcrypt.hash(pass!, 10);

    const newUser = await prisma.users.create({
      data: user
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ error: e }, { status: 500 });
  }
}