import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { API_URL } from '../../../constants'
import { StyledCartItem } from '../../../assets/css/StyledCartItem'
import Button from '../../Button'
import ProductAmountChanger from './ProductAmountChanger';

export default function CartItem({item, updateAmount, deleteItem}) {

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

      <ProductAmountChanger 
        updateAmount={updateAmount}
        amount={item.amount}
        id={item.id}
      />

      <div id='cart-item-price'>
        <p>{(item.price * item.amount).toLocaleString("fr")} Ft</p>
      </div>
    </StyledCartItem>
  )
}
