<script setup lang="ts">
import styled from 'vue3-styled-components';

type Props = {
  size?: number;
  width?: number;
  color?: string;
  percent: number;
};
const props = withDefaults(defineProps<Props>(), {
  size: 128,
  width: 20,
  color: '#FFFFFF',
});

const Graph = styled.div`
  width: ${() => props.size}px;
  aspect-ratio: 1;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: conic-gradient(${({ theme }) => theme.Gray4} 100%, #0000 0);
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - ${() => props.width.toString()}px),
      #000 calc(100% - ${() => props.width.toString()}px)
    );
  }

  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    inset: 0;
    background: conic-gradient(
      ${() => props.color} calc(${() => props.percent} * 1%),
      #0000 0
    );
    mask: radial-gradient(
      farthest-side,
      #0000 calc(99% - ${() => props.width.toString()}px),
      #000 calc(100% - ${() => props.width.toString()}px)
    );
  }
`;

const GraphLabel = styled.div`
  position: absolute;
  ${({ theme }) => theme.Heading3};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  color: ${() => props.color};
`;
</script>

<template>
  <Graph>
    <GraphLabel> {{ props.percent }}% </GraphLabel>
  </Graph>
</template>
