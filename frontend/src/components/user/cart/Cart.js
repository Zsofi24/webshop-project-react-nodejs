import React from 'react'

export default function Cart() {
  return (
    <div className='cart-wrapper'>
          <div className='padding-helper'>
            {
            cart.map(cartitem => (
              <CartItem 
                key={cartitem.id} 
                item={cartitem} 
                updateAmount={updateAmount}
                deleteItem={deleteItem}
              />          
            ))
            }

          <div className='cart-order-wrapper'>
            <h4>végösszeg: {(total)?.toLocaleString('fr')} Ft</h4>
            <Button handleClick={() => navigate("/rendeles")}>megrendelés</Button>
          </div>

          </div>
        </div>
  )
}
