interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string
    avatar: string | null;
    status: number;
    description: string;
    birthdate: Date;
    experiences: string | null;
    roleId: number;
    registerAt: Date;
}

const userListMock: User[] = [
    {
        "id": 1,
        "firstname": "Damien",
        "lastname": "COTE",
        "email": "dcote@test.fr",
        "password": "blablabla",
        "avatar": null,
        "status": 1,
        "description": "blablabla",
        "birthdate": new Date("1990-11-08T00:00:00.000Z"),
        "experiences": null,
        "roleId": 1,
        "registerAt": new Date("2024-05-24T09:47:19.265Z")
    },
    {
        "id": 2,
        "firstname": "test",
        "lastname": "test",
        "email": "test@test.fr",
        "password": "blablabla",
        "avatar": null,
        "status": 1,
        "description": "blablabla",
        "birthdate": new Date("1990-11-08T00:00:00.000Z"),
        "experiences": null,
        "roleId": 2,
        "registerAt": new Date("2024-05-24T09:47:19.265Z")
    },
    {
        "id": 7,
        "firstname": "Test2",
        "lastname": "COTE",
        "email": "dcote2@test.fr",
        "password": "blablabla",
        "avatar": null,
        "status": 1,
        "description": "blablabla",
        "birthdate": new Date("1990-11-08T00:00:00.000Z"),
        "experiences": "null",
        "roleId": 1,
        "registerAt": new Date("2024-05-24T09:47:19.265Z")
    }
]

export default userListMock;