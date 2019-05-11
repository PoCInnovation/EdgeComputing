import styled from 'styled-components';

interface ButtonProps {
  white?: boolean;
};

const Button = styled.label<ButtonProps>`
  font-weight: bold;
  font-size: 1rem;
  padding: 1.2rem;
  border-radius: 100px;
  cursor: pointer;
  background-color: ${props => props.theme.colors.secondary};
  box-shadow: none;
  transition: background-color .25s ease-out, box-shadow .25s ease-out;

  :hover {
    background-color: ${props => props.theme.colors.purple};
    box-shadow: ${props => props.theme.shadows.large};
  }

  ${props => props.white && `
    background-color: ${props.theme.colors.primary};

    :hover {
      background-color: ${props.theme.colors.secondary};
      box-shadow: ${props.theme.shadows.medium};
    }
  `}
`;

Button.defaultProps = {
  white: false
};

export default Button;
