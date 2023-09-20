import React, { useContext, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'
import { UserAuthContext } from '../contexts/UserAuthContext';
import { orderServices } from '../services/orderServices';
import CartItem from '../components/CartItem';
import { cartService } from '../services/cartService';
import '../assets/css/Cart.css';

export default function Cart() {

  const {cart, setCart, total} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);

  function order() {
    console.log(cart, "cart in order function");
    orderServices.sendOrder(user.localId, cart, total)
      .then(orderdetails => {
        if(orderdetails.userId) setCart({})
        alert("sikeres megrendelés")
      })
      .catch(err => alert(err))
  }

  function updateAmount(id, operator) {

    const productIndex = cart.findIndex(item => item.id == id);
    const productAmount = cart[productIndex].amount;
    let updatedAmount;

    if(operator == "+") {
      updatedAmount = productAmount + 1;
    } else if(operator == "-") {
      updatedAmount = (productAmount > 2) ? productAmount - 1 : 1;
    }

    cartService
      .updateCartItem(user.localId, id, updatedAmount)
        .then(() => {
          cartService
            .getCart()
            .then(resp => setCart(resp))
        })
  }

  function deleteItem(id) {
    cartService
      .deleteCartItem(user.localId, id)
      .then(() => {
        cartService
          .getCart()
          .then(resp => setCart(resp))
      })
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
        <div className='cart-wrapper'>
          <div className='cart-items-wrapper'>
            {
            cart.map(cartitem => (
              <CartItem 
                key={cartitem.product_id} 
                item={cartitem} 
                updateAmount={updateAmount}
                deleteItem={deleteItem}
              />          
            ))
            }
          </div>
          <div className='cart-order-wrapper'>
            <h4>végösszeg: {total} </h4>
            <button onClick={order}>megrendelés</button>
          </div>
        </div>
        </>
        )
        :
        "A kosara üres :("
        }
        </>
      )
      }
    </>
  )
}
