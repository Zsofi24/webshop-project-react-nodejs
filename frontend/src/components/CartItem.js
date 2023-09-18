import React from 'react'
import { StyledCartItem } from '../assets/css/StyledCartItem'
import Button from './Button'

export default function CartItem({item, updateAmount}) {
  return (
    <StyledCartItem>
        <img src='https://images.pexels.com/photos/8128069/pexels-photo-8128069.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1'/>
        <div>
            <p>{item.title}</p>
        </div>
        <div className='amount-wrapper'>
            <Button type='cart-amount' disabled={item.amount == 1} handleClick={() => updateAmount(item.id, "-")}>-</Button>
            <p>{item.amount}</p>
            <Button type='cart-amount' handleClick={() => updateAmount(item.id, "+")}>+</Button>
        </div>
        <div>
            <p>{item.price}</p>
            <Button type='cart-delete'>remove</Button>
        </div>
    </StyledCartItem>
  )
}
