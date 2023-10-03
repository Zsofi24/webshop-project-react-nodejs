import styled from 'styled-components';

export const StyledCartItem = styled.div`
    display: grid;
    grid-template-areas: 
        "img title delete"
        "img amount price";
    grid-template-columns: 1fr 2fr 1fr;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid grey;
    background-color: $clr-primary;

    #cart-item-title {
        grid-area: title
    }

    #cart-item-delete {
        grid-area: delete;
        margin-left: auto;
    }

    .amount-wrapper {
        max-width: 70%;
        grid-area: amount;
        align-self: end;
        display: flex;
        text-align: center;
        border: 1px solid black;
        border-radius: 12px;
    }

    .amount-wrapper > * {
        display: inline-block;
        flex: 1;
    }

    #cart-item-price {
        grid-area: price;
        align-self: end;
        margin-left: auto;
    }

    & img {
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        grid-area: img;
    }



`