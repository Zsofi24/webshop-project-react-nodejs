import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { StyledCartItem } from '../assets/css/StyledCartItem'
import Button from './Button'
import { API_URL } from '../constants'

export default function CartItem({item, updateAmount, deleteItem}) {
  console.log(item, "item");
  return (
    <StyledCartItem className='cart-items-wrapper'>
      {
        item.path
        ?
          <img src={`${API_URL}/api/${item.path}`} alt="wine" />
          :
          <img src={`${API_URL}/api/uploads/e65d2a0f397b3aadf357c6fd6dde1282-resized`} alt="wine" />
      }

      <p id='cart-item-title'>{item.title}</p>

      <div id='cart-item-delete'>
        <Button type='cart-delete' handleClick={() => deleteItem(item.id)}><AiOutlineDelete /></Button>
      </div>

      <div className='amount-wrapper'>
        <Button type='cart-amount' disabled={item.amount == 1} handleClick={() => updateAmount(item.id, "-")}>-</Button>
        <p>{item.amount}</p>
        <Button type='cart-amount' handleClick={() => updateAmount(item.id, "+")}>+</Button>
      </div>

      <div id='cart-item-price'>
        <p>{(item.price * item.amount).toLocaleString("fr")} Ft</p>
      </div>
    </StyledCartItem>
  )
}
