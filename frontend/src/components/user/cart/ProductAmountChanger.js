import React from 'react';
import Button from '../../Button';

export default function ProductAmountChanger({updateAmount, amount, id}) {
  return (
    <div className='amount-wrapper'>
        <Button type='cart-amount' disabled={amount == 1} handleClick={() => updateAmount(id, "-")}>-</Button>
        <p>{amount}</p>
        <Button type='cart-amount' handleClick={() => updateAmount(id, "+")}>+</Button>
    </div>
  )
}
