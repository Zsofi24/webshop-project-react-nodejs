import React, { useContext, useState } from 'react'
import useCustomersDetails from '../hooks/useCustomersDetails'
import OrderForm from '../components/OrderForm';
import { orderServices } from '../services/orderServices';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../contexts/UserAuthContext';
import { CartContext } from '../contexts/CartContext';

export default function SendOrder() {

  const [{ loading, error, shippingAddress, billingAddress }, dispatch] = useCustomersDetails();

  const [differentBillAndShipData, setDifferentSameBillAndShipData] = useState(false);

  const {cart, setCart, total} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);
  const navigate = useNavigate();

  function order() {
    console.log(cart, "cart in order function");
    orderServices.sendOrder(user.localId, cart, total, shippingAddress, billingAddress)
      .then(() => {
        setCart({})
        alert("sikeres megrendelés")
        navigate('/termekek')        
      })
      .catch(err => alert(err))
  }

  function handleChangeBillingAddress(e) {
    const { name, value, type, checked } = e.target;
    dispatch({ 
      type: "BILLINGRESOLVED", 
      response: {...billingAddress, [name]: type === "checkbox" ? checked : value}
    })     
 }

 function handleChangeShippingAddress(e) {
  const { name, value, type, checked } = e.target;
  dispatch({ 
    type: "SHIPRESOLVED", 
    response: {...shippingAddress, [name]: type === "checkbox" ? checked : value}
  })     
}

  return (
    <>
      <h3>Számlázási cím</h3>
      <OrderForm
        details={billingAddress}
        handleChange={handleChangeBillingAddress}
        formType="BILLINGRESOLVED"
      />
      <label>Eltérő szállítási cím</label>
      <h3>Szállítási cím</h3>
      <input 
        type='checkbox'
        value={differentBillAndShipData}
        onChange={() => setDifferentSameBillAndShipData(prev => !prev)}
      />
      {
        differentBillAndShipData 
        
        &&

        <OrderForm
          details={shippingAddress}
          handleChange={handleChangeShippingAddress}
          formType="SHIPRESOLVED" 
        />
      }
      <button onClick={order}>megrendelés</button>
    </>
  )
}
