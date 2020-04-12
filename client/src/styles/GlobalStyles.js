import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Nunito Light';
    src: url('/fonts/Nunito/Nunito-Light.ttf');
    font-weight: 300;
  }
  @font-face {
    font-family: 'Nunito Regular';
    src: url('/fonts/Nunito/Nunito-Regular.ttf');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Nunito Bold';
    src: url('/fonts/Nunito/Nunito-Bold.ttf');
    font-weight: 700;
  }
`;

export default GlobalStyles;