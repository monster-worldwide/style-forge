import styled from 'styled-components';

const Label = styled.label`
  display: block;
  width: 100%;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CheckboxLabel = styled(Label)`
  margin-bottom: 0;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  gap: 0.25em;
  align-items: center;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.125rem;
`;

const StyledCheckbox = styled.input``;

const StyledTextArea = styled.textarea`
  padding: 0.5rem;
  display: block;
  width: 100%;
  resize: vertical;
  font-size: 1.125rem;
  word-break: break-all;
`;

const HelpText = styled.p`
  font-size: 14px;
  font-style: italic;
  margin-top: 0.5rem;
  color: #737373;
`;

export const FormControl = ({
  id,
  label,
  value,
  onChange,
  controlType = 'text',
  helpText,
  disabled,
  autoComplete,
  ...rest
}: {
  id: string;
  label: string;
  value: string | boolean;
  controlType?: 'text' | 'textarea' | 'checkbox' | 'readOnly';
  helpText?: string;
  disabled?: boolean;
  autoComplete?: string;
  onChange?: (event: any) => void;
}) => {
  if (controlType === 'textarea') {
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <StyledTextArea
          disabled={disabled}
          id={id}
          value={value as string}
          onChange={onChange}
          rows={4}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const event = new Event('textAreaEnterPressed', {
                bubbles: true,
              });
              e.currentTarget.dispatchEvent(event);
            }
          }}
          {...rest}
        />
        {helpText && <HelpText>{helpText}</HelpText>}
      </div>
    );
  }

  if (controlType === 'text') {
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <StyledInput
          type='text'
          id={id}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          {...rest}
        />
        {helpText && <HelpText>{helpText}</HelpText>}
      </div>
    );
  }

  if (controlType === 'readOnly') {
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <p>{value}</p>
      </div>
    );
  }

  if (controlType === 'checkbox') {
    return (
      <div>
        <CheckboxLabel htmlFor={id}>
          <StyledCheckbox
            type='checkbox'
            id={id}
            checked={value as boolean}
            onChange={onChange}
            disabled={disabled}
            {...rest}
          />
          {label}
        </CheckboxLabel>
        {helpText && <HelpText>{helpText}</HelpText>}
      </div>
    );
  }

  return null;
};
