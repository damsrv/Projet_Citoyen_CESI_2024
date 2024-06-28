import prisma from '../../client'

interface CreateUser {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    avatar: string | null
    status: number
    description: string | null
    birthdate: Date | null
    experiences: string | null
    roleId: number
    registerAt: Date
}

export async function createUser(user: CreateUser) {
    return await prisma.user.create({
      data: user,
    })
}

// interface UpdateUser {
//   id: number
//   name: string
//   email: string
// }

// export async function updateUsername(user: UpdateUser) {
//   return await prisma.user.update({
//     where: { id: user.id },
//     data: user,
//   })
// }