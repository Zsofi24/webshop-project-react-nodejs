import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import useCustomersDetails from '../../hooks/useCustomersDetails'
import OrderForm from '../../components/user/sendorder/OrderForm';
import { checkEmptyInput } from '../../utils/checkEmptyInput';
import Button from '../../components/button/Button';
import Stepper from '../../components/stepper/Stepper';
import { StyledBackButton } from '../../components/button/StyledBackButton';

export default function SendOrderPage() {

  const [{ loading, error, shippingAddress, billingAddress }, dispatch] = useCustomersDetails();

  const [differentBillAndShipData, setDifferentSameBillAndShipData] = useState(false);

  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValid(checkEmptyInput(billingAddress, shippingAddress, differentBillAndShipData))
  }, [differentBillAndShipData, billingAddress])

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
    <section>
      <div className='order-form-wrapper padding-helper'>
        <StyledBackButton>
          <Link to='/kosar'>
            <AiOutlineArrowLeft /> vissza a kosárhoz
          </Link>
        </StyledBackButton>
        <Stepper currentStep={1} />
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
        {/* <Button handleClick={order} disabled={!valid}>megrendelés</Button> */}
        <Button type="step-forward" disabled={!valid} handleClick={() => navigate('/rendeles-osszegzes')}>Összegzés</Button>

        </div>
    </section>
   )
}
