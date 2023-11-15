import React from 'react';
import { StyledSelect } from './user/aside/StyledSelect';

export default function Select({children, handleChange}) {
  return (
    <StyledSelect onChange={handleChange}>
        {children}
    </StyledSelect>
  )
}
