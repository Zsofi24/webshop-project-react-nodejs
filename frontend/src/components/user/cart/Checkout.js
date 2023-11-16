import { useNavigate } from 'react-router-dom';
import Button from '../../button/Button';

export default function Checkout({ total }) {

  const navigate = useNavigate();

  return (
    <div className='cart-order-wrapper'>
      <div className='cart-order-sum'>
        <div><p>TERMÉKEK ÁRA:</p> <p>{(total)?.toLocaleString('fr')} Ft</p></div>
        <div><p>KÉZBESÍTÉS:</p><p>0 Ft</p></div>
        <hr />
        <div><p className='bold'>A Teljes összeg ÁFA-val:</p><p className='bold'>{(total)?.toLocaleString('fr')} Ft</p></div>
      </div>
      <Button handleClick={() => navigate('/rendeles')}>Menj a pénztárhoz</Button>
    </div>
  )
}
