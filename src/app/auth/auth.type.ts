export type RegisterData = {
    email: string;
    name: string;
    password: string;
}

export type LoginData = {
    email: string;
    password: string;
}

export type ResponseApiData = {
    authToken: string;
}