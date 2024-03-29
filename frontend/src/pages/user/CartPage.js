import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext'
import { UserAuthContext } from '../../contexts/UserAuthContext';
import CartItem from '../../components/user/cart/CartItem';
import { cartService } from '../../services/cartService';
import EmptyCart from '../../components/user/cart/EmptyCart';
import Checkout from '../../components/user/cart/Checkout';
import Stepper from '../../components/stepper/Stepper';

export default function CartPage() {

  const {cart, setCart, total} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);

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
        <EmptyCart text="A kosár megtekintéséhez jelentkezzen be! &#128521;"/>
        : 
      (
        <>
        {
        cart.length > 0 ? (
        <>
        <section className=''>
          <Stepper currentStep={0} />
          <div className='cart-wrapper '>
            <div className='cart-items-wrapper '>
                {
                cart.map(cartitem => (
                  <CartItem 
                    key={cartitem.id} 
                    item={cartitem} 
                    updateAmount={updateAmount}
                    deleteItem={deleteItem}
                  />          
                ))
                }
            </div>

              <Checkout 
                total={total}
              />
            
          </div>

          </section>
        </>
        )
        :
        <EmptyCart text="A kosara üres &#128549;"/>
        }
        </>
      )
      }
    </>
  )
}
