<script setup lang="ts">
import styled, { css } from 'vue3-styled-components';

type Props = {
  size?: 'md' | 'sm';
  theme?: 'primary' | 'primary-outlined' | 'dark';
  disabled?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  theme: 'primary',
  disabled: false,
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ theme }) => {
    switch (props.theme) {
      case 'dark':
        return css`
          background: ${theme.Gray1};
          color: ${theme.White};
        `;
      case 'primary-outlined':
        return css`
          border: 1px solid ${theme.Primary};
          color: ${theme.Primary};
        `;
      case 'primary':
      default:
        return css`
          background: ${theme.Primary};
          color: ${theme.White};
        `;
    }
  }}

  ${() =>
    props.size === 'md' &&
    css`
      width: 100%;
      height: 56px;
      border-radius: 12px;
      padding: 0 16px;
      font-weight: 700;
    `}

  ${() =>
    props.size === 'sm' &&
    css`
      width: 56px;
      border-radius: 8px;
      padding: 6px 0;
      font-weight: 400;
      line-height: 1;
    `}

  ${({ theme }) =>
    props.disabled &&
    css`
      background: ${theme.Gray2};
      color: ${theme.Gray3};
      cursor: not-allowed;
    `}
`;

const Label = styled.span`
  ${({ theme }) =>
    props.size === 'md' &&
    css`
      ${theme.Body1};
    `};

  ${({ theme }) =>
    props.size === 'sm' &&
    css`
      ${theme.Body2};
    `};
`;
</script>

<template>
  <Container>
    <Label>
      <slot />
    </Label>
  </Container>
</template>
