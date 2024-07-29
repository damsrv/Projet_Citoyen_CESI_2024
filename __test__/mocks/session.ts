export const mockedSession = {
    expires: "expires",
    user: {
        id: 1,
        firstname: "Damien",
        lastname: "Cote",
        status: 1,
        email: "dcote76@test.fr",
        avatar: null,
        roleId: 1,
        birthdate: null,
        description: null,
        experiences: null,
        registerAt: new Date(Date.now())
    },
};

export const getDefaultMockedSession = () => {
    return mockedSession
};