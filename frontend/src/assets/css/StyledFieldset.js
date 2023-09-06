import styled from 'styled-components';

export const StyledFieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    border: none;
    border-top: 2px solid var(--clr-primary);

    div {
        display: flex;
        justify-content: space-between;
    }

    legend {
        color: var(--clr-primary);
        text-transform: uppercase;
        font-weight: bold;
    }
`