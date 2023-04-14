import styled from 'styled-components';

type ButtonVariants = 'primary' | 'secondary' | 'tertiary';

export const Button = styled.button<{
  variant: ButtonVariants;
  isLoading?: boolean;
}>`
  border: none;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 4px;
  cursor: pointer;
  justify-self: flex-start;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  svg {
    height: 1em;
    width: 1em;
    transform: scale(1.7);
    margin-right: 0.8em;
    margin-left: 0.3em;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
        padding: 8px 12px;
        background: #6E46AE;
        color: white;`;

      case 'secondary':
        return `
        padding: 3px 8px;
        border: 1px solid #6e46ae45;
        color: #6E46AE;
        font-size: 0.875rem;
        min-height: 2.1em;
        background: white;`;

      case 'tertiary':
        return `
        padding-left: 0;
        padding-right: 0;
        background: transparent;
        color: #6E46AE;
        text-decoration: none;
        font-weight: 700;
        border-radius: 1px;
        letter-spacing: -0.025em;
        font-size: 0.875rem;`;
    }
  }}

  &:disabled {
    cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'not-allowed')};

    ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return `
          background: #666;
          color: white;`;

        case 'secondary':
          return `
          background: #666;
          color: white;`;

        case 'tertiary':
          return `
          opacity: 0.4;`;
      }
    }}
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ButtonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
