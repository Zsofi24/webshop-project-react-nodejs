import React from 'react'
import {StyledButton} from '../assets/css/Button'

export default function Button({text, children, handleClick}) {
  return (
    <StyledButton onClick={handleClick}>{children}{text}</StyledButton>
  )
}
