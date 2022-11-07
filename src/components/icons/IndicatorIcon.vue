<script setup lang="ts">
import { Colors } from '@/utils/styles';

type Props = {
  color?: string;
  size?: number;
};
const props = withDefaults(defineProps<Props>(), {
  color: Colors.BulletGreen,
  size: 8,
});
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4" r="4" :fill="props.color" />
  </svg>
</template>
