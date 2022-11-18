export interface UserInfo {
    email?: string;
    first_name?: string;
    last_name?: string;
    short_slug?: string;
    status?: string;
    username?: string;
  }
  
interface User {
    user?: UserInfo;
    role?: string;
    accessToken?: string,
}

export type AuthContextType = {
    auth: User;
    setAuth: (auth: User) => void | any;
};