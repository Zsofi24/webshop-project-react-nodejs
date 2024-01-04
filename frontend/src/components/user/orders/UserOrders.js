import UserOrderCard from './UserOrderCard'

export default function UserOrders({ orders }) {
  return (
    <div>
        <h3 className='heading-3 text-center'>Rendeléseim</h3>
        <div className='orders-wrapper--user'>
            {orders.map((order, idx) => <UserOrderCard key={idx} order={order} />)}
        </div>
    </div>
  )
}
