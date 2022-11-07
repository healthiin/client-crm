<script setup lang="ts">
import styled, { css } from 'vue3-styled-components';

type Props = {
  type: 'default' | 'dimmed';
};
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
});

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px;
  background: ${({ theme }) =>
    props.type === 'default' ? theme.Background : theme.Gray1};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.Gray1};

  ${({ theme }) =>
    props.type === 'dimmed' &&
    css`
      border: none;
      background: ${() => theme.Gray1};
    `}
`;
</script>

<template>
  <Container>
    <slot />
  </Container>
</template>
