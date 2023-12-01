import styled from 'styled-components';

export const StyledButton = styled.button`
    font-size: var(--size-4);
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-primary);
    border-radius: 3px;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    vertical-align: middle;
`

export const Admin = styled(StyledButton)`
  color: ${props => { 
    if(props.$remove) return "var(--clr-red)" 
    else if(props.$primary) return "black"
    else return "var(--clr-admin-gold)"
  }};
  background-color: ${props => { 
      if(props.$remove) return "white"
      else if(props.$primary) return "var(--clr-admin-light-blue)"
      else return "white"
   }};
  border-color: ${props => { 
    if(props.$remove) return "var(--clr-red)" 
    else if(props.$primary) return "var(--clr-admin-second)"
    else return "var(--clr-admin-gold)"

  }}
`

export const AdminCreate = styled(StyledButton)`
  background-color: var(--clr-admin-gold);
  color: var(--clr-admin-light);
  border: var(--clr-admin-light);
  margin-bottom: var(--size-3);
`