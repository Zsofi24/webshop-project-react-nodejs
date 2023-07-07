import { RouterProvider } from "react-router-dom";
import routes from "./router";
import { UserAuthContext, UserAuthProvider } from "./contexts/UserAuthProvider";
import { useContext, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";


function App() {

  const [ cookies ] = useCookies("sessionID")
  const { user, setUser } = useContext(UserAuthContext);
  console.log(setUser, 'setuser');


  return (
    <CookiesProvider>
    <UserAuthProvider>
      <RouterProvider router={routes} />
    </UserAuthProvider>
    </CookiesProvider>
  );
}

export default App;
