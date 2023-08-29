import { createContext, useContext, useEffect, useState } from "react";
import { UserAuthContext } from "./UserAuthContext";
import { cartService } from "../services/cartService";

export const CartContext = createContext({});

export function CartProvider({ children }) {

    const [cart, setCart] = useState({});
    const {user, setUser} = useContext(UserAuthContext)
    
    useEffect(() => {
        if(user.email) {
            cartService.getCart()
            .then(cartitems => setCart(cartitems))
        }
    }, [user])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}
