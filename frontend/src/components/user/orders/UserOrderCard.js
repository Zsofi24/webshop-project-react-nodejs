import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';

export default function UserOrderCard({ order }) {
    console.log(order, 'order');
  return (
    <div className='orders__card'>
        <h4 className='orders__card--status'>Kézbesítve</h4>
        <p className='orders__card--product-number'>{order.totalAmount} termék</p>
        <p className='orders__card--date'>{order.created}</p>
        <p className='orders__card--total'>{order.total} Ft</p>
        <div><RiArrowDropRightLine /></div>
    </div>
  )
}
