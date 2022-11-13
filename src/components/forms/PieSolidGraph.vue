<script setup lang="ts">
import { computed } from 'vue';
import styled, { css } from 'vue3-styled-components';

import { Colors } from '@/utils/styles';

type Props = {
  background?: string;
  carbohydrate: number;
  protein: number;
  fat: number;
};

const props = withDefaults(defineProps<Props>(), {
  background: Colors.Gray1,
});

const sum = computed(() => props.carbohydrate + props.protein + props.fat);

const carbohydrate = computed(() => {
  return Number(props.carbohydrate / sum.value) * 100;
});

const protein = computed(() => {
  return Number(props.protein / sum.value) * 100;
});

const Graph = styled.div`
  height: 128px;
  width: 128px;

  ${({ theme }) => css`
    background: radial-gradient(
        circle closest-side,
        transparent 100%,
        ${props.background}
      ),
      conic-gradient(
        ${theme.BulletGreen} 0,
        ${theme.BulletGreen} ${carbohydrate.value}%,
        ${theme.BulletViolet} 0,
        ${theme.BulletViolet} ${carbohydrate.value + protein.value}%,
        ${theme.BulletRed} 0,
        ${theme.BulletRed} 100%
      );
  `};

  position: relative;
`;
</script>

<template>
  <Graph />
</template>
