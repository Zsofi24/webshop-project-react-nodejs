import styled from 'styled-components';

export const StyledCartItem = styled.div`
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr;
    margin-bottom: 1rem;    

    .amount-wrapper {
        align-self: center;

        & p {
            margin: 0 0.3rem;
        }

        & > * {
            display: inline-block;
        }
    }

    & img {
        max-width: 100%
    }



`