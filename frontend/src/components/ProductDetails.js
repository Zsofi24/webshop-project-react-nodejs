import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct';
import '../assets/css/ProductDetails.css';
import { BsFillCartFill, BsFillCartXFill, BsFillBellFill, BsFillCartCheckFill } from 'react-icons/bs';
import Button from './Button';
import { CartContext } from '../contexts/CartContext';
import { productService } from '../services/productServices';
import { UserAuthContext } from '../contexts/UserAuthContext';
import { cartService } from '../services/cartService';

export default function ProductDetails() {

  const { productid } = useParams();
  const { user } = useContext(UserAuthContext);
  const [{loading, response, error, totalPages, currentPage}, dispatch] = useProduct();
  const { cart, setCart, addToCartContext } = useContext(CartContext);
  const [ isInCart, setIsInCart ] = useState(false);
  const [ isInStock, setIsInStock ] = useState(true);

  useEffect(() => {
    if(cart.length > 0) {
      const productInCart = cart.some(item => item.id == response?.id)
      setIsInCart(productInCart)
    } else {
      setIsInCart(false)
    }
    setIsInStock(response?.stock > 0);
  }, [response])


  function addToCart() {
    const cartdata = { userid: user.localId, productid: response.id }
    if(Object.keys(user).length == 0) console.error("nincs bejelentkezve")
    else {
    productService.addProductToCart(cartdata)
      .then(resp => {
        if(resp.error) console.error(resp.error, "cart error");
        else {
          cartService.getCart()
          .then(cartitems => setCart(cartitems))
        }  
    })
  }
}


  return (
    <>
    <div>
      <Link to='/'>főoldal</Link>
      -
      <Link to='/termekek'>termékek</Link>
      -
      <NavLink className={({isActive}) => isActive ? "active-link" : ""}>{response?.title}</NavLink>
    </div>
    <section>
      <div className='details-wrapper'>
        <div>
          <img src='https://images.pexels.com/photos/8128069/pexels-photo-8128069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        </div>
        <div>
          <h3>{response?.title}</h3>
          <h6>{response?.id}</h6>
          <div>
            {response?.categories.map((cat) => <span key={cat.categoryId}>{cat.categoryName}</span>)}
            <p>{response?.price} Ft</p>
            {response?.stock < 6 && <p className='low-stock'>Már csak {response.stock} maradt!</p>}
            {response?.description}
            {
              isInCart 
                ?
                <Button type="cart" text="Hozzáadva" primary handleClick={addToCart} ><BsFillCartCheckFill /></Button>
                :
                (          
                  isInStock
                    ?
                    <Button type="cart" text='Hozzáadás a kosárhoz' handleClick={addToCart} disabled={response?.stock == 0}>{response?.stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}</Button>
                    :
                    <div>
                      <Button type="cart" notInStock handleClick={addToCart} disabled={response?.stock == 0}>{response?.stock > 0 ? <BsFillCartFill /> : <BsFillCartXFill />}</Button>
                      <Button type="cart" ><BsFillBellFill /></Button>
                    </div>
                )
              }         
             </div>
        </div>
      </div>
    </section>
    </>
  )
}

