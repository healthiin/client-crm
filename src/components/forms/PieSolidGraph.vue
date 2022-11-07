<script setup lang="ts">
import styled, { css } from 'vue3-styled-components';

import { Colors } from '@/utils/styles';

type Props = {
  background?: string;
};

const props = withDefaults(defineProps<Props>(), {
  background: Colors.Gray1,
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
        ${theme.BulletGreen} 40%,
        ${theme.BulletViolet} 0,
        ${theme.BulletViolet} 65%,
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
