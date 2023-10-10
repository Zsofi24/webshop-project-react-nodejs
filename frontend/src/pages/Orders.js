import React from 'react';
import useUserOrders from '../hooks/useUserOrders';
import UserOrders from '../components/user/orders/UserOrders';

export default function Orders() {

    const [{loading, response, error}, dispatch] = useUserOrders(); 

  return (
    <div>
      <section>
        { error && <div className="error">ERROR OH NO</div> }
        { loading && <div>loading</div>}
        {response && <UserOrders orders={response}/>}
      </section>
    </div>
  )
}
