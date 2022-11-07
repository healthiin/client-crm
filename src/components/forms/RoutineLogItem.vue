<script setup lang="ts">
import styled from 'vue3-styled-components';

type Props = {
  title: string;
  playMinute: number;
  setNumber: number;
  weight: number;
};
defineProps<Props>();

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Title = styled.h4`
  ${({ theme }) => theme.Body1};
  font-weight: 700;
`;

const Description = styled.p`
  ${({ theme }) => theme.Body2};
  font-weight: 400;
`;
</script>

<template>
  <Container>
    <Title>{{ title }}</Title>
    <Description>
      <span v-if="Math.floor(playMinute / 60) > 0">
        {{ Math.floor(playMinute / 60) }}시간
      </span>
      <span v-if="playMinute % 60 > 0"> {{ playMinute % 60 }}분 </span>
      {{ ' &middot; ' }}
      <span v-if="weight > 0"> {{ weight }}kg </span>
      {{ ' &middot; ' }}
      <span v-if="setNumber > 0"> {{ setNumber }}세트 </span>
    </Description>
  </Container>
</template>
