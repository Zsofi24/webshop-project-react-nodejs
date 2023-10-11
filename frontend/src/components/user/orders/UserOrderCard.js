import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function UserOrderCard({ order }) {
    
  return (
    <Link to={`${order.id}`}>
        <div className='orders__card'>
            <h4 className='orders__card--status'>Kézbesítve</h4>
            <p className='orders__card--product-number'>{order.totalAmount} termék</p>
            <p className='orders__card--date'>{order.created}</p>
            <p className='orders__card--total'>{(order.total).toLocaleString('fr')} Ft</p>
            <div className='orders__card--icon'><RiArrowDropRightLine /></div>
        </div>
    </Link>
  )
}
