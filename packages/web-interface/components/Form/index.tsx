import { useEffect } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: grid;
  gap: 1.25rem;
  align-items: flex-start;
`;

export const Form = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: () => void;
}) => {
  useEffect(() => {
    document.addEventListener('textAreaEnterPressed', onSubmit);
    return () => {
      document.removeEventListener('textAreaEnterPressed', onSubmit);
    };
  }, [onSubmit]);

  return (
    <FormWrapper
      onSubmit={(event) => {
        console.log('submitting');
        event.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </FormWrapper>
  );
};
