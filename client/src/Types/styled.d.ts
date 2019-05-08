import 'styled-components'

import { ThemeInterface } from '../Configs/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
};
