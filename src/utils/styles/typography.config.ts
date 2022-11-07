import { css } from 'vue3-styled-components';

export const Typography = {
  Heading1: css`
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
  `,
  Heading2: css`
    font-size: 22px;
    line-height: 28px;
    font-weight: 700;
  `,
  Heading3: css`
    font-size: 18px;
    line-height: 28px;
    font-weight: 700;
  `,
  Body1: css`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.15px;
    font-weight: 400;
    &.bold {
      font-weight: 700;
    }
  `,
  Body2: css`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.15px;
    font-weight: 400;
    &.bold {
      font-weight: 700;
    }
  `,
  Body3: css`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.15px;
    font-weight: 400;
    &.bold {
      font-weight: 700;
    }
  `,
  Caption: css`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.15px;
    font-weight: 400;
    &.bold {
      font-weight: 700;
    }
  `,
};

export default css`
  h1 {
    ${Typography.Heading1};
  }
  h2 {
    ${Typography.Heading2};
  }
  h3 {
    ${Typography.Heading3};
  }
  h4 {
    ${Typography.Body1};
  }
  h5 {
    ${Typography.Body2};
  }
  h6 {
    ${Typography.Body3};
  }
`;
