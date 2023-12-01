import { AiOutlineArrowLeft } from 'react-icons/ai';
import useUserOrders from '../../hooks/useUserOrders';
import UserOrderProduct from '../../components/user/orders/UserOrderProduct';
import { Link } from 'react-router-dom';

export default function UserOrderDetailsPage() {

  const [{loading, orders, order, error}, dispatch] = useUserOrders();
  console.log(order, "order");

  return (
    <section className='padding-helper order-wrapper'>
        { loading && <h3>loading</h3>}
        { error && <h3>ohh, no, error</h3>}
        { order && 
        <>
            <div className='order'>
                <Link to='/rendelesek' className='order__back-link'><AiOutlineArrowLeft /> összes rendelés</Link>
                <h3 className='heading-3 text-center uppercase'>Rendelés részletei</h3>
                <div className='order__info'>
                    <div>
                        <p>rendelés száma</p>
                        <p className='underline'>{order.info.id}</p>
                    </div>
                    <div className='text-right'>
                        <p>rendelés dátuma</p>
                        <p>{order.info.created}</p>
                    </div>
                </div>
                <h3 className='heading-3 text-center uppercase'>rendelés összegzése</h3>
                <div className='order__details'>
                    {
                        order.products.map(product => <UserOrderProduct product={product} key={product.id}/>)                     
                    }
                </div>
                <div>
                    <h3>szállítási cím</h3>
                    <p>{order.shipinfo.surname} {order.shipinfo.familyname}</p>
                    <p>{order.shipinfo.street} {order.shipinfo.house_number}</p>
                    <p>{order.shipinfo.postal_code} {order.shipinfo.city}</p>
                </div>
                <div>
                    <h3>Összesen:</h3>
                    <p>{order.info.total} Ft</p>
                </div>
            </div>
        </>
        }
    </section>
  )
}
