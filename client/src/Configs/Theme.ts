import { createGlobalStyle } from 'styled-components';

export const Theme = {
  colors: {
    main: '#101117',
    primary: '#cfd0d6',
    secondary: '#6b6f88',
    thirdary: '#14151d',

    red: '#d94f36',
    blue: '#4b92e3',
    green: '#45a36c',
    cyan: '#62b8b8',
    purple: '#7348d5',
    yellow: '#c7af28',
  },

  shadows: {
    small: '0 0 8px rgba(0, 0, 0, .125)',
    medium: '0 0 24px rgba(0, 0, 0, .325)',
    large: '0 0 44px rgba(0, 0, 0, .525)'
  },

  devices: {
    mobile: '600px',
    desktop: '1025px'
  }
};

export interface ThemeInterface {
  colors: { [key in keyof typeof Theme.colors]: string },
  shadows: { [key in keyof typeof Theme.shadows]: string },
  devices: { [key in keyof typeof Theme.devices]: string },
};

export const GlobalStyle = createGlobalStyle<any>`
  body {
    background-color: ${props => props.theme.colors.main};
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h2 {
    color: ${props => props.theme.colors.primary}
  }

  h3 {
    color: ${props => props.theme.colors.secondary}
  }

  h4, h5, h6 {
    color: ${props => props.theme.colors.secondary}
  }
`;

export default Theme;
