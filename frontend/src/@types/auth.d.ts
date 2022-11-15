interface User {
    user?: string;
    roles?: string[];
    accessToken?: string,
    renewalToken?: string
}

export type AuthContextType = {
    auth: User;
    setAuth: (auth: User) => void;
};