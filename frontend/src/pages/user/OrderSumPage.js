import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Stepper from '../../components/stepper/Stepper';
import { StyledBackButton } from '../../components/button/StyledBackButton';
import Button from '../../components/button/Button';
import OrderSum from '../../components/user/orders/OrderSum';

export default function OrderSumPage() {

  const navigate = useNavigate();

  return (
    <section>
        <div className='padding-helper'>
            <StyledBackButton>
                <Link to='/rendeles'>
                    <AiOutlineArrowLeft /> adatok módosítása
                </Link>
            </StyledBackButton>
            <Stepper currentStep={2} />
            <OrderSum />
            <Button type="step-forward" handleClick={() => navigate('/stripe-checkout')}>Rendelés elküldése</Button>
        </div>
    </section>
  )
}
