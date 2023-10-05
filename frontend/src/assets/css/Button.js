import styled from 'styled-components';

export const StyledButton = styled.button`
  background: ${props => props.$primary ? "var(--clr-green)" : "var(--clr-primary)"};
  color: ${props => props.$primary ? "var(--clr-primary)" : "var(--clr-green)"};

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

export const CartAmount = styled(StyledButton)`
  background-color: ${(props) => props.disabled ? "var(--clr-lightgrey)" :  "var(--clr-green)"};
  border: var(--clr-lightgrey);
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0;
  border-radius: none;
  overflow: hidden;
`

export const CartDelete = styled(StyledButton)`
  background-color: white;
  color: red;
  border: red;
  padding: 0;
`

export const LoginRegist = styled(StyledButton)`
  background: rgb(16 4 4 / 47%);
  blur(10.5px);
  color: white;
  padding: 1em 0;
  width: 100%;
  border-radius: 16px;
  border: none;
  font-size: var(--fs-400);
  text-transform: uppercase;
`