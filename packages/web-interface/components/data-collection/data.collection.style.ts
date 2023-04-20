import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: grid;
  place-content: flex-start center;
  grid-template-columns: minmax(10vw, 480px);
  padding: 15vh 1rem 1rem 1rem;
  gap: 1rem;
  grid-column: 1 / -1;
  animation: var(--animation-drift-in--long);
  overflow: auto;

  h2 {
    font-size: 2rem;
  }
`;
