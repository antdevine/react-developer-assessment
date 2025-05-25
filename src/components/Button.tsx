import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;

  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: var(--primary-color);
      color: var(--text-white);
      border: none;

      &:hover:not(:disabled) {
        background-color: var(--primary-color-disabled);
      }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: var(--secondary-color);
      color: var(--text-gray);
      border: 1px solid var(--text-white);

      &:hover:not(:disabled) {
        background-color: var(--secondary-color-disabled);
      }
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


export default Button;
