import { API_URL } from '../../../constants';

export default function UserOrderProduct({ product }) {

  return (
    <div className='order__product'>
        <div className='order__product__img'>
            <img src={`${API_URL}/api/${product.img}`}/>
        </div>
        <div className='order__product__details'> 
            <p>{product.title}</p>
            <p>{product.price} Ft</p>
            <table>
                <tbody>
                    <tr>
                        <td>Cikkszám:</td>
                        <td>{product.productId}</td>
                    </tr>
                    <tr>
                        <td>Mennyiség:</td>
                        <td>{product.amount}</td>
                    </tr>
                    <tr>
                        <td>Összesen</td>
                        <td>{product.amount * product.price} Ft</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

