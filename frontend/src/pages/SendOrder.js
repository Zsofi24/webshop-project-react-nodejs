import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import useCustomersDetails from '../hooks/useCustomersDetails'
import OrderForm from '../components/OrderForm';
import { orderServices } from '../services/orderServices';
import { UserAuthContext } from '../contexts/UserAuthContext';
import { CartContext } from '../contexts/CartContext';
import { checkEmptyInput } from '../utils/checkEmptyInput';
import Button from '../components/button/Button';

export default function SendOrder() {

  const [{ loading, error, shippingAddress, billingAddress }, dispatch] = useCustomersDetails();

  const [differentBillAndShipData, setDifferentSameBillAndShipData] = useState(false);

  const {cart, setCart, total} = useContext(CartContext);
  const {user} = useContext(UserAuthContext);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValid(checkEmptyInput(billingAddress, shippingAddress, differentBillAndShipData))
  }, [differentBillAndShipData, billingAddress])

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
    const newBillingAddress = {...billingAddress, [name]: type === "checkbox" ? checked : value};
    dispatch({ 
      type: "BILLINGRESOLVED", 
      response: newBillingAddress
    }) 
    setValid(checkEmptyInput(newBillingAddress, shippingAddress, differentBillAndShipData))  
 }

 function handleChangeShippingAddress(e) {
  const { name, value, type, checked } = e.target;
  const newShippingAddress = {...shippingAddress, [name]: type === "checkbox" ? checked : value};
  dispatch({ 
    type: "SHIPRESOLVED", 
    response: newShippingAddress
  })    
  setValid(checkEmptyInput(billingAddress, newShippingAddress, differentBillAndShipData))
}

  return (
    <section className='order-form-wrapper padding-helper'>
      <h3>Számlázási cím</h3>
      <OrderForm
        details={billingAddress}
        handleChange={handleChangeBillingAddress}
        formType="BILLINGRESOLVED"
      />
      <div>
        <label>Eltérő szállítási cím</label>
        <input 
        type='checkbox'
        value={differentBillAndShipData}
        onChange={() => setDifferentSameBillAndShipData(prev => !prev)}
        />
      </div>
      {
        differentBillAndShipData 
        
        &&
        <>
        <h3>Szállítási cím</h3>
        <OrderForm
          details={shippingAddress}
          handleChange={handleChangeShippingAddress}
          formType="SHIPRESOLVED" 
        />
        </>
      }
      {!valid && <p className='error-message'><AiFillExclamationCircle/> A csillaggal jelölt mezők kitöltése kötelező!</p>}
      <Button handleClick={order} disabled={!valid}>megrendelés</Button>
    </section> 
   )
}
