import React from 'react'
import useCustomersDetails from '../../../hooks/useCustomersDetails';

export default function OrderSumData() {
    const [{ loading, error, shippingAddress, billingAddress }, dispatch] = useCustomersDetails();
    console.log(shippingAddress);

  return (
    <div>
        <h3>Szállítási cím:</h3>
        <p>{shippingAddress.familyname} {shippingAddress.surname}</p>
        <p>{shippingAddress.city}</p>
        <p>{shippingAddress.postal_code}</p>
        <p>{shippingAddress.street} {shippingAddress.house_number}</p>
        <h3>Számlázási cím:</h3>
        <p>{billingAddress.familyname} {billingAddress.surname}</p>
        <p>{billingAddress.city}</p>
        <p>{billingAddress.postal_code}</p>
        <p>{billingAddress.street} {billingAddress.house_number}</p>
    </div>
  )
}
