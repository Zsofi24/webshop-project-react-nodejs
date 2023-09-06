import React from 'react';
import { StyledSelect } from '../assets/css/StyledSelect';

export default function Select({children}) {
  return (
    <StyledSelect>
        {children}
    </StyledSelect>
  )
}
