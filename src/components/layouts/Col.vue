<script setup lang="ts">
import styled, { css } from 'vue3-styled-components';

type Props = {
  gap?: number;
  reverse?: boolean;
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center';
  padding?: number;
  fill?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  gap: 0,
  reverse: false,
  justify: 'flex-start',
  align: 'flex-start',
  padding: 0,
  fill: false,
});

const Container = styled.div`
  display: flex;
  flex-direction: ${() => (props.reverse ? 'column-reverse' : 'column')};
  justify-content: ${() => props.justify};
  align-items: ${() => props.align};
  gap: ${() => props.gap}px;
  padding: ${() => props.padding}px;
  width: 100%;
  height: 100%;

  ${() =>
    props.fill &&
    css`
      flex: 1;
    `}
`;
</script>

<template>
  <Container>
    <slot />
  </Container>
</template>
