import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext'
import { UserAuthContext } from '../contexts/UserAuthContext';
import { orderServices } from '../services/orderServices';
import CartItem from '../components/CartItem';
import { cartService } from '../services/cartService';
import Button from '../components/Button';

export default function Cart() {

  const {cart, setCart, total} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);
  const navigate = useNavigate();

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
          <div className='padding-helper'>
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

          <div className='cart-order-wrapper'>
            <h4>végösszeg: {(total).toLocaleString('fr')} Ft</h4>
            <Button handleClick={() => navigate("/rendeles")}>megrendelés</Button>
          </div>

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
