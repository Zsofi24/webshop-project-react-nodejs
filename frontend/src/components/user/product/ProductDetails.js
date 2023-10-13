import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { API_URL } from '../../../constants';
import '../../../assets/css/ProductDetails.css';
import useProduct from '../../../hooks/useProduct';
import { CartContext } from '../../../contexts/CartContext';
import { productService } from '../../../services/productServices';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { cartService } from '../../../services/cartService';
import AddToCartButton from './AddToCartButton';

export default function ProductDetails() {

  const { user } = useContext(UserAuthContext);
  const [{loading, response, error, totalPages, page}, dispatch] = useProduct();
  const { cart, setCart, addToCartContext } = useContext(CartContext);
  const [ isInCart, setIsInCart ] = useState(false);
  const [ isInStock, setIsInStock ] = useState(true);
  const location = useLocation();
  const search = location.state?.search || "";
  console.log(response, "resp");

  useEffect(() => {
    if(cart.length > 0) {
      const productInCart = cart.some(item => item.id == response?.id)
      setIsInCart(productInCart)
    } else {
      setIsInCart(false)
    }
    setIsInStock(response?.stock > 0);
  }, [response, cart])

  function addToCart() {
    const cartdata = { userid: user.localId, productid: response.id }
    if(Object.keys(user).length == 0) alert("nincs bejelentkezve")
    else {
    productService.addProductToCart(cartdata)
      .then(resp => {
        if(resp.error) alert(resp.error, "cart error");
        else {
          cartService.getCart()
          .then(cartitems => setCart(cartitems))
        }  
    })
  }
}

  return (
    <>
    { error && <div className="error">ERROR OH NO</div> }
    { loading && <div>Loading....</div>  }
    { response.id && (
      
    <>
    <div>
      <Link to='/'>főoldal</Link>
      -
      <Link to={`/termekek?${search}`}>termékek</Link>
      -
      <NavLink className={({isActive}) => isActive ? "active-link" : ""}>{response.title}</NavLink>
    </div>

    <section>
      <div className='details-wrapper'>
        <div>
          <img src={`${API_URL}/api/${response.path}`} alt="wine"/>
        </div>
        <div>
          <h3>{response.title}</h3>
          <h6>{response.id}</h6>
          <div>
            {response.categories.map((cat) => <span key={cat.categoryId}>{cat.categoryName}</span>)}
            <p>{(response.price).toLocaleString('fr')} Ft</p>
            {response.stock < 6 && <p className='low-stock'>Már csak {response.stock} maradt!</p>}
            {response.description}
            <AddToCartButton 
              isInCart={isInCart}
              handleClick={addToCart}
              stock={response.stock}
              isInStock={isInStock}
            />     
          </div>
        </div>
      </div>
    </section>

    </>
    )}
  </>
  )
}
