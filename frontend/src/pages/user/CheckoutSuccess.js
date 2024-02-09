import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import useCustomersDetails from '../../hooks/useCustomersDetails';
import { orderServices } from '../../services/orderServices';

export default function CheckoutSuccess() {

  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ checkoutSuccess, setCheckoutSuccess ] = useState(searchParams.get('redirect_status'));
  const { cart, setCart, total } = useContext(CartContext);
  const { user, setUser } = useContext(UserAuthContext);
  const [{ loading, error, shippingAddress, billingAddress }, dispatch] = useCustomersDetails();

  function order() {
    orderServices.sendOrder(user.localId, cart, total, shippingAddress, billingAddress)
     .then(() => setCart([]))
     .catch(err => alert(err))
  }

  useEffect(() => {
    if(checkoutSuccess == 'succeeded') {
      order();
    }
  }, [checkoutSuccess])


  return (
    <section className=''>
      <div>{checkoutSuccess == 'succeeded' && 'sikeres megrendelésss'}</div>
    </section>
  )
}
