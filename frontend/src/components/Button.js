import React from 'react'
import {CartButton, PaginationButton, StyledButton} from '../assets/css/Button'

export default function Button({notInStock, primary, text, children, handleClick, type}) {

    if(type == "cart") {
      return (
        <CartButton $notInStock={notInStock} $primary={primary} onClick={handleClick}>{children}{text}</CartButton>
      )
    }
    else if(type == "pagination") {
      return <PaginationButton onClick={handleClick}>{children}</PaginationButton>
    } else if(!type) {
      return <StyledButton onClick={handleClick}>{children}</StyledButton>
    }

}
