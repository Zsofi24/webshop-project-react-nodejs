import { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'

export default function OrderSumCartData() {

    const { cart, setCart, total, totalAmount } = useContext(CartContext);
    const delivery = 0;
    console.log(total, "cart in ordersum");
  return (
    <div>
        <h2>Kosár: {totalAmount + " tétel"}</h2>
        <p>vásárlás összértéke: {total + " Ft"}</p>
        <p>szállítási költség: {delivery + " Ft"}</p>

        <h2>Fizetendő: {total + delivery + " Ft"}</h2>
    </div>
  )
}
