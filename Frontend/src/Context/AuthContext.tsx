import { createContext, useState } from "react";

interface AuthContextType {
  auth: string,
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<string>("login");

  return (
    <AuthContext.Provider value={{auth,setAuth}}>
      {children}
    </AuthContext.Provider>
  )
} 