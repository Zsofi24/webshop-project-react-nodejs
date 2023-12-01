import styled from 'styled-components';

export const AdminTable = styled.table`
    border-spacing: 0;
    // white-space: nowrap;
    margin: 0 auto;
    color: black;
    width: 100%;
    
    @media (min-width: 65em) {
        width: 100%;
        table-layout: fixed;
    }

    thead,
    thead th {
        background-color: var(--clr-admin-second);
        padding: var(--size-4) 0;
    }

    thead th {
        position: sticky;
        top: 0;
        z-index: 1;

        &:first-child {
            position: sticky;
            left: 0;
            z-index: 2;
        }
    }

    tbody th {
        position: sticky;
        left: 0;
        z-index: 1;
        color: var(--clr-admin-primary);
    }

    thead th:nth-child(-n+4) {
        border-right: 2px solid var(--clr-admin-light);

        svg {
            vertical-align: text-bottom;
        }  
    }
    td {
        color: black;   
     
    }
    th, td {
        padding: var(--size-2);
    }
    .description {
        width: 20rem;
        white-space: normal
    }

    .button {
        width: 4rem;
        overflow: hidden;
        margin: 0 auto;
    }

    tbody td,
    tbody th {
        border-bottom:  1px solid var(--clr-primary);
    }
    tbody tr:not(thead tr:nth-child(-n+1)):hover {
        background-color: var(--clr-admin-light);
    } 
`
