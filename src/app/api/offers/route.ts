import prisma from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {PrismaClientValidationError} from "@prisma/client/runtime/library";
import {isOfferOwner} from "@/services/check-authorization";
import {Prisma} from "@prisma/client";
import OfferFindManyArgs = Prisma.OfferFindManyArgs;

const OFFERS_BY_PAGE = 20

export async function GET(req: NextRequest) {
    let prismaArgs: OfferFindManyArgs = {
        include: {
            mentor: true,
            category: {
                include: {
                    categoryType: true
                }
            }
        }
    }

    if (req.nextUrl.searchParams) {
        const searchParams = req.nextUrl.searchParams

        if (searchParams.get("page") !== null) {
            let value = parseInt(searchParams.get("page")!);
            if (isNaN(value) || value <= 0) {
                value = 1
            }

            prismaArgs = {
                ...prismaArgs,
                skip: (value - 1) * OFFERS_BY_PAGE,
                take: OFFERS_BY_PAGE,
            }
        }

        if (searchParams.get("category") !== null) {
            const value = parseInt(searchParams.get("category")!);

            try {
                await prisma.category.findFirstOrThrow({
                    where: {
                        id: value
                    }
                })

                prismaArgs.where = {
                    categoryId: value,
                }
            } catch (e) {
                return NextResponse.json(
                    {
                        error: e,
                        message:
                            "Aucun résultat ne correspond à votre recherche",
                    },
                    {status: 404}
                );
            }
        }

        if (searchParams.get("categoryType") !== null) {
            const value = parseInt(searchParams.get("categoryType")!);

            try {
                await prisma.categoryType.findFirstOrThrow({
                    where: {
                        id: value
                    }
                })

                prismaArgs.where = {
                    ...prismaArgs.where,
                    AND: {
                        category: {
                            categoryTypeId: value
                        }
                    }
                }
            } catch (e) {
                return NextResponse.json(
                    {
                        error: e,
                        message:
                            "Aucun résultat ne correspond à votre recherche",
                    },
                    {status: 404}
                );
            }
        }
    }

    try {
        const offers = await prisma.offer.findMany(prismaArgs);

        return NextResponse.json(offers, {status: 200});
    } catch (e) {
        return NextResponse.json(
            {
                error: e,
                message:
                    "Une erreur est survenue, veuillez réessayer plus tard.",
            },
            {status: 500}
        );
    }
}

export async function POST(req: Request) {
    const {data} = await req.json();
    const {offerComTypes, ...offer} = data;

    if (!(await isOfferOwner(offer.mentorId))) {
        return NextResponse.json(
            {
                message: "Vous n'êtes pas autorisé à créer cette offre.",
            },
            {status: 401}
        );
    }

    let comTypesArray = [];

    if (offerComTypes != null) {
        comTypesArray = offerComTypes.map((comTypeId: number) => {
            return {
                comType: {
                    connect: {
                        id: comTypeId,
                    },
                },
            };
        });
    }

    try {
        const newOffer = await prisma.offer.create({
            data: {
                ...offer,
                offerComTypes: {
                    create: [...comTypesArray],
                },
            },
        });
        return NextResponse.json(newOffer, {status: 201});
    } catch (e) {
        if (e instanceof PrismaClientValidationError) {
            return NextResponse.json(
                {error: e, message: "Erreur de validation prisma"},
                {status: 404}
            );
        } else {
            return NextResponse.json(
                {
                    error: e,
                    message:
                        "Une erreur est survenue, veuillez réessayer plus tard.",
                },
                {status: 500}
            );
        }
    }
}
