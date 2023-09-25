import { createContext, useContext, useEffect, useState } from "react";
import { UserAuthContext } from "./UserAuthContext";
import { cartService } from "../services/cartService";

export const CartContext = createContext({});

export function CartProvider({ children }) {

    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(null);
    const {user, setUser} = useContext(UserAuthContext)
    
    useEffect(() => {
        if(user.email) {
            cartService
                .getCart()
                .then(cartitems => setCart(cartitems))
        }
    }, [user])

    useEffect(() => {
        if(user.email) {
            cartService
                .getCartTotal()
                .then(cartTotal => setTotal(cartTotal.total))
        }
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, setCart, total }}>
            {children}
        </CartContext.Provider>
    )
}
