import UserOrderCard from './UserOrderCard'

export default function UserOrders({ orders }) {
  return (
    <div className='padding-helper'>
        <h4>összes vásárlás</h4>
        <div className='orders-wrapper--user'>
            {orders.map((order, idx) => <UserOrderCard key={idx} order={order} />)}
        </div>
    </div>
  )
}
