import { RouterProvider } from "react-router-dom";
import routes, { router } from "./router";
import { UserAuthContext, UserAuthProvider } from "./contexts/UserAuthContext";
import { useContext, useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { CartContext, CartProvider } from "./contexts/CartContext";


function App() {

  const [ cookies ] = useCookies("sessionID")
  const { user, setUser } = useContext(UserAuthContext);
  console.log(setUser, 'setuser');
  console.log(cookies, "cookies");

  return (
    <UserAuthProvider>
        <CartProvider>
        <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
      </CartProvider>
      </UserAuthProvider>
  );
}

export default App;
