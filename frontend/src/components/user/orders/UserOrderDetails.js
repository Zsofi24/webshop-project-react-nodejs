import { AiOutlineArrowLeft } from 'react-icons/ai';
import useUserOrders from '../../../hooks/useUserOrders';
import UserOrderProduct from './UserOrderProduct';
import { Link } from 'react-router-dom';

export default function UserOrderDetails() {

  const [{loading, orders, order, error}, dispatch] = useUserOrders();
  console.log(order, "order");

  return (
    <section className='padding-helper'>
        { loading && <h3>loading</h3>}
        { error && <h3>ohh, no, error</h3>}
        { order && 
        <>
            <div>
                <Link to='/rendelesek'><AiOutlineArrowLeft /> összes rendelés</Link>
                <h3>Rendelés részletei</h3>
                <div>
                    <p>rendelés száma</p>
                    <p>{order.info.id}</p>
                </div>
                <div>
                    <p>rendelés dátuma</p>
                    <p>{order.info.created}</p>
                </div>
            </div>
            <div className='order__details'>
                <h3>rendelés összegzése</h3>
                {
                    order.products.map(product => <UserOrderProduct product={product} />)                     
                }

            </div>
        </>
        }
    </section>
  )
}
