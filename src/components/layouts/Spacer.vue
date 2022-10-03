<script setup lang="ts">
import styled, { css } from 'vue3-styled-components';

type Props = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const props = withDefaults(defineProps<Props>(), {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${() =>
    props.top &&
    css`
      margin-top: ${props.top}px;
    `};

  ${() =>
    props.bottom &&
    css`
      margin-bottom: ${props.bottom}px;
    `};

  ${() =>
    props.left &&
    css`
      margin-left: ${props.left}px;
    `};

  ${() =>
    props.right &&
    css`
      margin-right: ${props.right}px;
    `};
`;
</script>

<template>
  <Container>
    <slot />
  </Container>
</template>
