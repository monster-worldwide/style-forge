import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: grid;
  place-content: flex-end center;
  grid-template-columns: minmax(10vw, 480px);
  padding: 1rem 1rem 35vh 1rem;
  gap: 1rem;
  grid-column: 1 / -1;
  animation: var(--animation-drift-in--long);

  h2 {
    font-size: 2rem;
  }
`;
