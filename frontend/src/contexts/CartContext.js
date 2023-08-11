import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { UserAuthContext } from "./UserAuthContext";

export const CartContext = createContext({});

export function CartProvider({ children }) {

    const [cart, setCart] = useState({});
    const {user, setUser} = useContext(UserAuthContext)
    
    useEffect(() => {
        if(user.email) {
            fetch(`http://localhost:3031/api/cart`, {
                credentials: 'include'
            })
            .then(resp => resp.json())
            .then(cartitems => setCart(cartitems))
        }
    }, [user])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}
