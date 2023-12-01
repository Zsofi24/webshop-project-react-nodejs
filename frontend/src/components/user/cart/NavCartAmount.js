import { useContext } from "react"
import { CartContext } from "../../../contexts/CartContext"

export default function NavCartAmount() {

    const { cart, setCart, total, totalAmount } = useContext(CartContext);
    
  return (
    <span>{totalAmount}</span>
  )
}
