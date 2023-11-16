import { createContext, useContext, useEffect, useState } from "react";
import { UserAuthContext } from "./UserAuthContext";
import { cartService } from "../services/cartService";

export const CartContext = createContext({});

export function CartProvider({ children }) {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(null);
    const {user, setUser} = useContext(UserAuthContext);
    const [totalAmount, setTotalAmount] =useState(null);
    
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
    }, [cart, user])

    useEffect(() => {
        let amount = cart?.map(p => p.amount).reduce((acc, curr) => acc + curr, 0);
        if(amount != 0) setTotalAmount(amount);
        else setTotalAmount(null)
    }, [cart, user])

    return (
        <CartContext.Provider value={{ cart, setCart, total, totalAmount }}>
            {children}
        </CartContext.Provider>
    )
}
