import React from 'react'

export default function OrderForm({details, handleChange}) {
  return (
    <form className='order-form'>
      <fieldset>
        <label>Keresztnév <span className='input--required'>*</span></label>
        <input
          value={details?.surname || ''}
          onChange={(e) => handleChange(e)}
          type='text'
          name="surname"
        />
      </fieldset>
      <fieldset>
        <label>Vezetéknév <span className='input--required'>*</span></label>
        <input
          value={details?.familyname || ''}
          onChange={(e) => handleChange(e)}
          type='text'
          name="familyname"
        />
      </fieldset>
      <fieldset>
        <label>Város <span className='input--required'>*</span></label>
        <input
          value={details?.city || ''}
          onChange={(e) => handleChange(e)}
          type='text'
          name="city"
        />
      </fieldset>
      <fieldset>
        <label>Irányítószám <span className='input--required'>*</span></label>
        <input
          value={details?.postal_code || ''}
          onChange={(e) => handleChange(e)}
          type='number'
          name="postal_code"
        />
      </fieldset>
      <fieldset>
        <label>Utca <span className='input--required'>*</span></label>
        <input
          value={details?.street || ''}
          onChange={(e) => handleChange(e)}
          type='text'
          name="street"
        />
      </fieldset>
      <fieldset>
        <label>Házszám <span className='input--required'>*</span></label>
        <input
          value={details?.house_number || ''}
          onChange={(e) => handleChange(e)}
          type='number'
          name="house_number"
        />
      </fieldset>
      <fieldset>
        <label>Adószám</label>
        <input
          value={details?.tax_number || ''}
          onChange={(e) => handleChange(e)}
          type='number'
          name="tax_number"
        />
      </fieldset>
    </form>
  )
}
