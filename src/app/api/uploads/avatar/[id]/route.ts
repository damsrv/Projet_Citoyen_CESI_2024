
import prisma from "@/lib/prisma";
import { Offer, User } from "@prisma/client";
import { PrismaClient, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import sharp from "sharp";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { isUserOrAdmin } from "@/services/check-authorization";

interface Params {
    params: {
        id: string;
    };
}

export async function POST(req: Request, params: Params) {
    //OK

    const userId = parseInt(params.params.id);


    if (!(await isUserOrAdmin(userId))) {
      return NextResponse.json(
          {
              message:
                  "Vous n'êtes pas autorisé à envoyer un fichier pour cet utilisateur.",
          },
          { status: 401 }
      );
  }


    const formData = await req.formData()
    const file = formData.get("file") as File || null;

    if (!file) {
        return NextResponse.json(
            {
                message: "Veuillez fournir un fichier.",
            },
            { status: 400 }
        );
    }

    try {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    const resizedImageBuffer = await sharp(buffer).resize(200).jpeg({ quality: 80 }).toBuffer();
    const relativeUploadDir = `/uploads/avatar`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    try {
      // This is for checking the directory is exist
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        // If the directory doesn't exist (ENOENT : Error No Entry), create one
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    // optimiser et redimensionner l'image
    try {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${file.name.replace(
          /\.[^/.]+$/,
          ""
        )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${filename}`, resizedImageBuffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        // supprimer l'ancienne image du user
        if (user.avatar) {
          const oldAvatar = join(process.cwd(), "public", user.avatar);
          await unlink(oldAvatar);
        }

        // mettre à jour le user
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                avatar: fileUrl,
            },
        });

        return NextResponse.json({ avatar:fileUrl }, { status: 200 });
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }


} catch (e) {
    console.log(e);

    if (e instanceof PrismaClientKnownRequestError) {
        return NextResponse.json(
            { error: e, message: "Le user n'existe pas." },
            { status: 404 }
        );
    } else {
        return NextResponse.json(
            {
                error: e,
                message:
                    "Une erreur est survenue, veuillez réessayer plus tard.",
            },
            { status: 500 }
        );
    }
}
}