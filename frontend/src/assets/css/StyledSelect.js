import styled from 'styled-components';

export const StyledSelect = styled.select`
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;
    color: var(--clr-primary);

    &::-ms-expand {
        display: none;
    }

    &:focus + .focus {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 2px solid var(--select-focus);
        border-radius: inherit;
    }

    option {
        background-color: white;
        padding: 0.5em
    }
`