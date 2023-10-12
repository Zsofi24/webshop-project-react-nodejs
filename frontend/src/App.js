import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import { CookiesProvider } from "react-cookie";
import { CartProvider } from "./contexts/CartContext";

function App() {

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
