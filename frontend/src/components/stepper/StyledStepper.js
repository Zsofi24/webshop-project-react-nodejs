import styled from 'styled-components';

export const StyledStepperCircle = styled.div`
    width: 1.8em;
    height: 1.8em;
    border-radius: 50%;
    background-color: ${props => {
        if(props.active) return 'var(--clr-admin-gold)'
        else return 'var(--clr-lightgrey-400)'
    }}
`
export const StyledStepperLine = styled.div`
    width: 3em;
    height: 0.2em;
    background-color: ${props => {
        if(props.hide) return "transparent"
        else if(props.active) return 'var(--clr-admin-gold)'
        else return 'var(--clr-lightgrey-400)'
    }}
`
