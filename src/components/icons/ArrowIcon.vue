<script setup lang="ts">
import styled from 'vue3-styled-components';

type Props = {
  deg?: number;
};
const props = withDefaults(defineProps<Props>(), {
  deg: 90,
});

const Icon = styled.svg`
  transform: rotate(${() => (props.deg + 90).toString()}deg);
`;
</script>

<template>
  <Icon width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path
      d="M8 15L1 8L8 1"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Icon>
</template>
