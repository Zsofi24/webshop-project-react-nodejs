import styled from 'styled-components';

export const StyledUpdateForm = styled.div`
  width: 90%;
  max-width: 800px;
  margin: var(--size-4) auto;
  padding: var(--size-4);
  box-shadow: 2px 2px 10px black;
  border-radius: var(--size-4);

  .grid-input {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: var(--size-1);
    align-items: center;

  }

  label {
    margin-top: var(--size-2);
  }

  input {
    line-height: var(--size-4);
    padding: var(--size-1);
  }

  button {
    margin-top: var(--size-4);
    width: 100%;

    &:hover {
      background-color: var(--clr-admin-gold);
    }
  }
`
