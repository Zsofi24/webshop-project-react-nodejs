import React from 'react'

export default function OrderForm({details, handleChange}) {
  console.log(details);
  return (
    <form>
      <label>Keresztnév</label>
      <input
        value={details?.surname || ''}
        onChange={(e) => handleChange(e)}
        type='text'
        name="surname"
      />
      <label>Vezetéknév</label>
      <input
        value={details?.familyname || ''}
        onChange={(e) => handleChange(e)}
        type='text'
        name="familyname"
      />
      <label>irányítószám</label>
      <input
        value={details?.postal_code || ''}
        onChange={(e) => handleChange(e)}
        type='number'
        name="postal_code"
      />
      <label>Város</label>
      <input
        value={details?.city || ''}
        onChange={(e) => handleChange(e)}
        type='text'
        name="city"
      />
      <label>utca</label>
      <input
        value={details?.street || ''}
        onChange={(e) => handleChange(e)}
        type='text'
        name="street"
      />
      <label>házszám</label>
      <input
        value={details?.house_number || ''}
        onChange={(e) => handleChange(e)}
        type='number'
        name="house_number"
      />
      <label>adószám</label>
      <input
        value={details?.tax_number || ''}
        onChange={(e) => handleChange(e)}
        type='number'
        name="tax_number"
      />

    </form>
  )
}
