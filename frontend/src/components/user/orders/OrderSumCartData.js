import { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'

export default function OrderSumCartData() {

    const { cart, setCart, total, totalAmount } = useContext(CartContext);
    const delivery = 0;
  return (
    <div className='order-sum--cart-data'>
        <h2>Kosár: {totalAmount + " tétel"}</h2>
        <p>vásárlás összértéke: {(total).toLocaleString('fr') + " Ft"}</p>
        <p>szállítási költség: {delivery + " Ft"}</p>

        <h2>Fizetendő: {(total + delivery).toLocaleString('fr') + " Ft"}</h2>
    </div>
  )
}
