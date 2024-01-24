import React, { useContext } from 'react'
import Stepper from '../../components/stepper/Stepper'
import { StyledBackButton } from '../../components/button/StyledBackButton'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Button from '../../components/button/Button'
import useCustomersDetails from '../../hooks/useCustomersDetails'
import { orderServices } from '../../services/orderServices'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import { CartContext } from '../../contexts/CartContext'

export default function OrderSumPage() {

    const [{ loading, error, shippingAddress, billingAddress }, dispatch] = useCustomersDetails();

    const {cart, setCart, total} = useContext(CartContext);
    const {user} = useContext(UserAuthContext);
    const navigate = useNavigate();

    function order() {
        orderServices.sendOrder(user.localId, cart, total, shippingAddress, billingAddress)
          .then(() => {
            setCart([])
            alert("sikeres megrendelés")
            navigate('/termekek')        
          })
          .catch(err => alert(err))
      }

  return (
    <section>
        <div className='padding-helper'>
            <StyledBackButton>
                <Link to='/rendeles'>
                    <AiOutlineArrowLeft /> adatok módosítása
                </Link>
            </StyledBackButton>
            <Stepper currentStep={2} />
            <div>rendelés összegzése</div>
            <Button type="step-forward" handleClick={order}>Rendelés elküldése</Button>
        </div>
    </section>
  )
}
