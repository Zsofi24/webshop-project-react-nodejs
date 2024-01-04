import useUserOrders from '../../hooks/useUserOrders';
import UserOrders from '../../components/user/orders/UserOrders';
import AsideNav from '../../components/user/layout/AsideNav';

export default function OrdersPage() {

    const [{loading, orders, error}, dispatch] = useUserOrders(); 

  return (
    <div>
      <section>
        { error && <div className="error">ERROR OH NO</div> }
        { loading && <div>loading</div>}
        { orders && 
            <div className='orders-page padding-helper'>
            <AsideNav />
            <UserOrders orders={orders}/>
            </div>
        }
      </section>
    </div>
  )
}
