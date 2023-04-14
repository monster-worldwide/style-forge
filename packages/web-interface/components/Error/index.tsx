import styled from 'styled-components';

const StyledError = styled.div`
  color: #d80000;
  font-weight: 700;
  font-size: 0.825rem;
`;

export const Error = ({ message }: { message: string }) => {
  return <StyledError>{message}</StyledError>;
};
