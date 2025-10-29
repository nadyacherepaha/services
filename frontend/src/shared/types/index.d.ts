interface User {
    email: string,
    name: string,
    password: string,
    phone: number,
    socials?: string[],
    _id: string,
}

interface RegisterParams {
    email: string,
    name: string,
    password: string,
    phone: string,
    socials?: string,
}

interface RegisterResponse {
    tokens: {
        accessToken: string,
        refreshToken: string,
    },
    user: User;
}

interface LoginParams {
    email: string,
    password: string,
}

interface LoginResponse extends RegisterResponse {
}
