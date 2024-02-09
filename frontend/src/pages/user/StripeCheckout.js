import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { STRIPE_PUBLISH_KEY } from '../../constants.js';
import CheckoutForm from '../../components/user/orders/CheckoutForm.js';
import { CartContext } from '../../contexts/CartContext'
import { stripeService } from '../../services/stripeService.js';

const stripePromise = loadStripe(STRIPE_PUBLISH_KEY);

export default function StripeCheckout() {

    const [ clientSecret, setClientSecret ] = useState("");
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { cart, setCart, total } = useContext(CartContext);

    useEffect(() => {
      stripeService
        .createPaymentIntent(total)
        .then((data) => { console.log(data, "data"); setClientSecret(data.clientSecret)});
    }, []);

    useEffect(() => {
      if(clientSecret) {
        searchParams.set("payment_intent_client_secret", clientSecret)
        setSearchParams(searchParams)
      }
    }, [clientSecret])
  
    const appearance = {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        fontFamily: 'Sohne, system-ui, sans-serif',
        fontWeightNormal: '500',
      //   borderRadius: '8px',
      //   colorBackground: '#0A2540',
      //   colorPrimary: '#EFC078',
        accessibleColorOnColorPrimary: '#1A1B25',
      //   colorText: 'white',
      //   colorTextSecondary: 'white',
      //   colorTextPlaceholder: '#727F96',
      //   tabIconColor: 'white',
      //   logoColor: 'dark',
      },
      rules: {
        '.Select': {
          fontLineHeight: '30px'
        },
      }
    };
    const options = {
      appearance,
      clientSecret
    };

  return (
    <section className="payment">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm total={total}/>
        </Elements>
      )}
    </section>
  )
}
