import defaultTheme from 'tailwindcss/defaultTheme';
import { Config } from 'tailwindcss';

const theme: Config['theme'] = {
  fontFamily: {
    sans: ['Ubuntu-light', ...defaultTheme.fontFamily.sans],
  },
  spacing: {
    0: '0px',
    px: '1px',
    xs: '2px',
    s: '4px',
    n: '8px',
    m: '16px',
    l: '24px',
  },
  screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px',
  },
};

export default Object.freeze(theme);
