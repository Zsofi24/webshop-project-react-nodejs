import { createContext, useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const UserAuthContext = createContext({});

export function UserAuthProvider({children}) {
    const [user, setUser] = useState({});
    const [ cookies ] = useCookies(['sessionID']);
    console.log(user, "contextuser");
    console.log(cookies, "cookies");

    useEffect(() => {
        console.log(cookies);
        if(cookies.sessionID) {
          fetch(`http://localhost:3031/api/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
          })
          .then(resp => resp.json())
          .then(data => setUser(data))
        }
      }, [])

    return (
        <UserAuthContext.Provider value={{user, setUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}