import React from 'react'
import {CartButton, PaginationButton, StyledButton, CartAmount, CartDelete, LoginRegist } from '../assets/css/Button'

export default function Button({disabled, notInStock, primary, text, children, handleClick, type}) {

    if(type == "cart") {
      return (
        <CartButton $notInStock={notInStock} $primary={primary} onClick={handleClick}>{children}{text}</CartButton>
      )
    }
    else if(type == "pagination") {
      return <PaginationButton onClick={handleClick}>{children}</PaginationButton>
    } else if(type == "cart-amount") {
      return <CartAmount disabled={disabled} onClick={handleClick}>{children}</CartAmount>
    } else if(type == "cart-delete") {
      return <CartDelete onClick={handleClick}>{children}</CartDelete>
    } else if(type == "login-regist") {
      return <LoginRegist onClick={handleClick}>{children}</LoginRegist>
    } else if(!type) {
      return <StyledButton onClick={handleClick}>{text}{children}</StyledButton>
    }
}
