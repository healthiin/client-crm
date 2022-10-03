import { injectGlobal } from 'vue3-styled-components';

import setupResetCSS from '@/utils/styles/reset.config';
import setupTypography from '@/utils/styles/typography.config';
import setupWebFont from '@/utils/styles/webfont.config';

export * from './typography.config';
export * from './color.config';

injectGlobal`
  ${setupResetCSS};
  ${setupWebFont};
  ${setupTypography};
  
  * {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    box-sizing: border-box;
  }
  
  body {
    font-size: 16px; // Set base font size 4x
  }
`;
