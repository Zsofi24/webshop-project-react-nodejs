import React, { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext';
import { API_URL } from '../../../constants';

export default function OrderSumProducts() {
    const { cart, setCart, total } = useContext(CartContext);
    console.log(cart, "cart");

  return (
    <div className='order-sum--products'>
            <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>termék</th>
                            <th>ár</th>
                            <th>mennyiség</th>
                            <th>összesen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((c, i) => (
                                <tr key={i}>
                                    <td><img src={`${API_URL}/api/${c.path}`}/></td>
                                    <td>{c.title}</td>
                                    <td>{(c.price).toLocaleString('fr')} Ft</td>
                                    <td>{c.amount}</td>
                                    <td>{(c.amount * c.price).toLocaleString('fr')} Ft </td>
                                </tr>
                            ))
                        }
                    </tbody>    
                </table>
    </div>
  )
}
