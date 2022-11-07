<script setup lang="ts">
import styled, { css } from 'vue3-styled-components';

type Props = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  height?: number;
  width?: number;
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
  justify-content: center;
  width: ${() => (props.width ? `${props.width}px` : '100%')};
  height: ${() => (props.height ? `${props.height}px` : '100%')};

  ${() =>
    props.top &&
    css`
      padding-top: ${props.top}px;
    `};

  ${() =>
    props.bottom &&
    css`
      padding-bottom: ${props.bottom}px;
    `};

  ${() =>
    props.left &&
    css`
      padding-left: ${props.left}px;
    `};

  ${() =>
    props.right &&
    css`
      padding-right: ${props.right}px;
    `};
`;
</script>

<template>
  <Container>
    <slot />
  </Container>
</template>
