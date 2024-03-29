import styled from 'styled-components';

export const StyledButton = styled.button`
  background: ${props => {
    if(props.disabled) return "grey"
    else {
      if(props.$primary) return "var(--clr-second-light)"
      else return "var(--clr-second)"
    }
  }};
  color: ${props => {
    if(props.disabled) return "white"
    else {
      if(props.$primary) return "var(--clr-second)"
      else return "white"
    }
  }};

  padding: 0.5rem 1rem;
  border: 2px solid var(--clr-second-light);
  border-radius: 3px;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
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
  background-color: ${props => props.active ? "var(--clr-primary)" : "white"};
  color: ${props => props.active ? "white" : "var(--clr-btn-pagination)"};
  border: none;
  padding: 0.25rem 0.4rem;
  vertical-align: text-top;`

export const CartAmount = styled(StyledButton)`
  background-color: ${(props) => props.disabled ? "var(--clr-lightgrey-200)" :  "var(--clr-primary)"};
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  border-color: white;
  padding: 0.3rem clamp(0.3rem, 5%, 1rem);
`

export const CartDelete = styled(StyledButton)`
  background-color: white;
  color: var(--clr-light-red);
  border: red;
  padding: 0;
`

export const LoginRegist = styled(StyledButton)`
  background-color: rgb(16 4 4 / 47%);
  background-size: 0% 100%;
  blur(10.5px);
  color: white;
  padding: 1em 0;
  width: 100%;
  border-radius: 16px;
  border: none;
  font-size: var(--fs-400);
  text-transform: uppercase;

  z-index: 1;
  transition: background-color 0.8s;

  &:hover {
    background-color: rgb(187 124 124 / 47%);
    background-image: linear-gradient(
      to right, rgb(255 255 255 / 6%) 0%, 
      rgb(255 255 255 / 0%) 40%, 
      rgb(208 208 208 / 7%) 100%
    );
    background-repeat:no-repeat;
    background-size: 140% 100%; 
    transition:background-size 1s, background-color 1s;    
  }
`

export const StepForwardButton = styled(StyledButton)`
  width: 100%;
  font-weight: bold;
  padding: var(--size-3) 0;
  letter-spacing: 0.1rem;

  &:hover {
      background-color: ${props => {if(!props.disabled) return "var(--clr-second-light)"}};
      color: ${props => {if(!props.disabled) return "var(--clr-primary)"}};
  }

  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};


`
