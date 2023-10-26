import { Link } from 'react-router-dom';
import { API_URL } from '../../../constants';
import image from '../../../assets/img/default_product_img.jpg';

export default function UserOrderProduct({ product }) {

  return (
      <div className='order__product'>
        <Link to={`/termekek/${product.productId}`}>
        <div className='order__product__img'>
            {
                product.img ?
                <img src={`${API_URL}/api/${product.img}`}/>
                :
                <img src={image}/>

            }
        </div>
        </Link>
        <div className='order__product__details'> 
            <h4>{product.title}</h4>
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

