<script setup lang="ts">
import styled, { css } from 'vue3-styled-components';

type Props = {
  isActive?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  isActive: false,
});

const Container = styled.div`
  ${({ theme }) => theme.Body1};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 16px;
  border-radius: 50px;
  background: #2e2f31;
  color: #858686;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  ${({ theme }) =>
    props.isActive &&
    css`
      background: #587bf6;
      font-weight: 700;
      color: ${theme.White};
    `}
`;
</script>

<template>
  <Container>
    <slot />
  </Container>
</template>
