import { createContext, useState } from "react";
import { useEffect } from "react";
import { cookies, useCookies } from "react-cookie";

export const UserAuthContext = createContext({});

export function UserAuthProvider({children}) {
    const [user, setUser] = useState({});
    const [ cookies ] = useCookies();
    console.log(user, "contextuser");

    // useEffect( () =>  {
    //     fetch('http://localhost:3031/api/authentication', {
    //         method: 'GET',
    //         credentials: 'include',   // azert kell hogy felkuldje a cookies-t a servernek
    //       })
    //         .then(resp => resp.json())
    //     .then(data => console.log(data, "providerdata"))
    // }, [])

    useEffect(() => {
        console.log(cookies);
        // if(cookies.sessionID) {
          fetch(`http://localhost:3031/api/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            // body: JSON.stringify({sessionID: cookies})
          })
          .then(resp => resp.json())
          .then(data => setUser(data))
        // }
      }, [])

    return (
        <UserAuthContext.Provider value={{user, setUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}