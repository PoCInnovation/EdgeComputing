import styled from 'styled-components';

const Button = styled.label`
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
`;

export default Button;
