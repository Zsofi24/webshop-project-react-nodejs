import React, { useEffect, useState } from 'react';
import { orderServices } from '../services/orderServices';
export default function Orders() {

    const [ orders, setOrders ] = useState(null);
    console.log(orders);

    useEffect(() => {
        orderServices.getUserOrders()
            .then(userorders => setOrders(userorders))
    }, [])

  return (
    <div>Orders</div>
  )
}
