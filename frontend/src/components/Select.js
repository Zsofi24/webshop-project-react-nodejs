import React from 'react';
import { StyledSelect } from '../assets/css/StyledSelect';

export default function Select({children, handleChange}) {
  return (
    <StyledSelect onChange={handleChange}>
        {children}
    </StyledSelect>
  )
}
