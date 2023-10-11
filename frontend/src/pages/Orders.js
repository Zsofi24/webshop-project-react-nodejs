import useUserOrders from '../hooks/useUserOrders';
import UserOrders from '../components/user/orders/UserOrders';

export default function Orders() {

    const [{loading, orders, error}, dispatch] = useUserOrders(); 

  return (
    <div>
      <section>
        { error && <div className="error">ERROR OH NO</div> }
        { loading && <div>loading</div>}
        { orders && <UserOrders orders={orders}/>}
      </section>
    </div>
  )
}
