import React from 'react'
import OrderSumCartData from './OrderSumCartData'
import OrderSumProducts from './OrderSumProducts'
import OrderSumData from './OrderSumData'

export default function OrderSum() {
  return (
    <div className='order-sum--container'>
        <OrderSumCartData />
        <div>
            <h2>Termékek: </h2>
            <OrderSumProducts />
        </div>
        <div>
            <h2>Adatok: </h2>
            <OrderSumData />
        </div>
    </div>
  )
}
