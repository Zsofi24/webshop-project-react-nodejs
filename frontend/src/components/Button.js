import React from 'react'
import {CartButton, PaginationButton, StyledButton, CartAmount, CartDelete, LoginRegist } from '../assets/css/Button'
import { Admin, AdminCreate } from '../assets/css/AdminButton'

export default function Button({remove, active, disabled, notInStock, primary, text, children, handleClick, type}) {

    if(type == "cart") {
      return (
        <CartButton $notInStock={notInStock} $primary={primary} onClick={handleClick}>{children}{text}</CartButton>
      )
    }
    else if(type == "pagination") {
      return <PaginationButton active={active} onClick={handleClick}>{children}</PaginationButton>
    } else if(type == "cart-amount") {
      return <CartAmount disabled={disabled} onClick={handleClick}>{children}</CartAmount>
    } else if(type == "cart-delete") {
      return <CartDelete onClick={handleClick}>{children}</CartDelete>
    } else if(type == "login-regist") {
      return <LoginRegist onClick={handleClick}>{children}</LoginRegist>
    } else if(type == "admin") {
      return <Admin $primary={primary} $remove={remove} onClick={handleClick}>{children}</Admin>
    } else if(type == "admin-create") {
      return <AdminCreate onClick={handleClick}>{children}</AdminCreate>
    } else {
      return <StyledButton $primary={primary} disabled={disabled} onClick={handleClick}>{text}{children}</StyledButton>
    }
}
