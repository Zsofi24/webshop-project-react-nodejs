import React from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { API_URL } from '../../../constants';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';

export default function Popup({closePopUp, product}) {

  const navigate = useNavigate();

  return (
    <div className='popup'>
        <div className='popup--added-to-cart'>
            <button className='popup__close-icon' onClick={closePopUp}>X</button>
            <div><GiCheckMark /></div>
            <p>A termék bekerült a kosaradba!</p>

            <div className='popup__product-info'>
                <img src={`${API_URL}/api/${product.path}`}/>
                <div>
                  <h3>{product.title}</h3>
                  <p>{product.price} Ft</p>
                </div>                
            </div>
            <Button handleClick={() => { navigate('/termekek'); closePopUp()}}>Vásárlás folytatása</Button>
            <Button handleClick={() => { navigate('/kosar'); closePopUp()}} primary>Ugrás a pénztárhoz</Button>
        </div>
    </div>
  )
}
