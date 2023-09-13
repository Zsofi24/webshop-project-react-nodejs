import React, { useContext, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'
import { UserAuthContext } from '../contexts/UserAuthContext';
import { orderServices } from '../services/orderServices';
import CartItem from '../components/CartItem';

export default function Cart() {

  const {cart, setCart} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);
  console.log(cart, "cart in cart");

  function order() {
    console.log(cart, "cart in order function");
    orderServices.sendOrder({userid: user.localId}, cart)
      .then(orderdetails => {
        if(orderdetails.orderid) setCart({})
        alert("sikeres megrendelés")
      })
      .catch(err => alert(err))
  }

  function increaseAmount(id) {
    const index = cart.findIndex(item => item.id == id);
    console.log(index, "index");
    cart[index].amount++;
    console.log(cart, "cart");
  }
   
  return (
    <>
      {Object.keys(user).length == 0 
        ?
         <p>A kosár megtekintéséhez jelentkezzen be</p> 
        : 
      (
        <>
        {
        cart.length > 0 ? (
        <>
        {
        cart.map(cartitem => (
          <CartItem key={cartitem.product_id} item={cartitem} increaseAmount={increaseAmount}></CartItem>
          
        ))
        }
        <button onClick={order}>megrendelés</button>
        </>
        )
        :
        "A kosara üres"
        }
        </>
      )
      }
    </>
  )
}
