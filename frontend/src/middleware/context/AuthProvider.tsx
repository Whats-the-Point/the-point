import { createContext, useState } from "react";
import { AuthContextType, User } from "../../@types/auth";

const AuthContext = createContext<AuthContextType>({
    auth: {},
    setAuth: () => { }
});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<User>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;