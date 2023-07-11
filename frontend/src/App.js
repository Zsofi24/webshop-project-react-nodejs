import { RouterProvider } from "react-router-dom";
import routes from "./router";
import { UserAuthContext, UserAuthProvider } from "./contexts/UserAuthContext";
import { useContext } from "react";
import { CookiesProvider, useCookies } from "react-cookie";


function App() {

  const [ cookies ] = useCookies("sessionID")
  const { setUser } = useContext(UserAuthContext);
  console.log(setUser, 'setuser');
  console.log(cookies, "cookies");

  return (
    <UserAuthProvider>
      <CookiesProvider>
      <RouterProvider router={routes} />
    </CookiesProvider>
    </UserAuthProvider>
  );
}

export default App;
