import styled from 'styled-components';

export const StyledCartItem = styled.div`
    display: grid;
    grid-template-areas: 
        "img title delete"
        "img amount price";
    grid-template-columns: 1fr 2fr 1fr;
    gap: 0.5rem;
    padding: var(--size-4);
    border-bottom: 1px solid grey;
    box-shadow: 10px 5px 5px #435B66;
    border-radius: var(--size-4);

    #cart-item-title {
        grid-area: title
    }

    #cart-item-delete {
        grid-area: delete;
        margin-left: auto;
        
        button {
            font-size: inherit;

            svg {
            vertical-align: middle;
        }
        }
    }

    .amount-wrapper {
        max-width: 50%;
        grid-area: amount;
        align-self: end;
        display: flex;
        text-align: center;
        border: 1px solid black;
        border-radius: 12px;
        padding-inline: 4px 2px;
        padding-block: 2px 2px;

        @media screen and (min-width: 65rem) {
            align-self: center;
            min-width: 100%;
        }

        > * {
            display: inline-block;
            flex: 1;
            align-self: center;
        }
    }

    #cart-item-price {
        grid-area: price;
        align-self: end;
        margin-left: auto;

        @media screen and (min-width: 65rem) {
            align-self: center;
        }
    }

    & img {
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        grid-area: img;
    }

    @media screen and (min-width: 65rem) {
        grid-template-areas:
            "img title amount price delete";

        margin: 0 auto;
        grid-template-columns: repeat(5, 1fr);

        & > * {
            align-self: center;
        }
    }



`