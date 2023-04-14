import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const SelectedItem = styled.button`
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  padding: 0.3rem 0.5rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const SourceSelector = ({
  label = '',
  canBeRemoved = false,
}: {
  label?: string;
  canBeRemoved?: boolean;
}) => {
  return (
    <>
      <SelectedItem>{label}</SelectedItem>
      {canBeRemoved && <Button variant='primary'>delete</Button>}
    </>
  );
};
