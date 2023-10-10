import React from 'react'
import UserOrderCard from './UserOrderCard'

export default function UserOrders({ orders }) {
  return (
    <div>
        <h4>összes vásárlás</h4>
        <div className='orders-wrapper--user'>
            {orders.map(order => <UserOrderCard order={order} />)}
        </div>
    </div>
  )
}
