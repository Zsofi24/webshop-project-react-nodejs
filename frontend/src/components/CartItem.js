import React from 'react'
import { StyledCartItem } from '../assets/css/StyledCartItem'
import Button from './Button'
import { API_URL } from '../constants'

export default function CartItem({item, updateAmount, deleteItem}) {
  console.log(item, "item");
  return (
    <StyledCartItem>
      {
        item.path
        ?
          <img src={`${API_URL}/api/${item.path}`} alt="wine" />
          :
          <img src={`${API_URL}/api/uploads/e65d2a0f397b3aadf357c6fd6dde1282-resized`} alt="wine" />
      }
        <div>
            <p>{item.title}</p>
        </div>
        <div className='amount-wrapper'>
            <Button type='cart-amount' disabled={item.amount == 1} handleClick={() => updateAmount(item.id, "-")}>-</Button>
            <p>{item.amount}</p>
            <Button type='cart-amount' handleClick={() => updateAmount(item.id, "+")}>+</Button>
        </div>
        <div>
            <p>{(item.price * item.amount).toLocaleString("fr")} Ft</p>
            <Button type='cart-delete' handleClick={() => deleteItem(item.id)}>remove</Button>
        </div>
    </StyledCartItem>
  )
}
