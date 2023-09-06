import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  background: ${props => props.$primary ? "var(--clr-btn-green)" : "var(--clr-primary)"};
  color: ${props => props.$primary ? "var(--clr-primary)" : "var(--clr-btn-green)"};

  padding: 0.5rem 1rem;
  border: 2px solid var(--clr-primary);
  border-radius: 3px;
  cursor: pointer;
  vertical-align: middle;
`;

export const CartButton = styled(StyledButton)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  background: white;
  color: ${props => props.$notInStock ? "grey" : "var(--clr-primary)"};
  border-color: ${props => props.$notInStock ? "grey" : "var(--clr-primary)"};
  cursor: ${props => props.$notInStock && "not-allowed"};
`
export const PaginationButton = styled(StyledButton)`
  background-color: white;
  color: var(--clr-btn-pagination);
  border: none;
  padding: 0.25rem 0.4rem;
`