<script setup lang="ts">
import styled from 'vue3-styled-components';

import Col from '@/components/layouts/Col.vue';
import Row from '@/components/layouts/Row.vue';

type Props = { type?: string; kcal?: number; menus?: string[] };
const props = withDefaults(defineProps<Props>(), {
  type: '',
  kcal: -1,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

const MealTitle = styled.h6``;

const MealInfo = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.Secondary7};
`;
</script>

<template>
  <Container>
    <MealTitle>{{ props.type }}</MealTitle>
    <Col :gap="8">
      <Row :gap="4">
        <MealInfo v-for="(menu, key) in menus" v-bind:key="key">
          {{ menu }}
        </MealInfo>
      </Row>
      <Row :gap="4">
        <MealInfo>
          {{ props.kcal }}kcal (예측) | 식단 사진 | 상세 내역
        </MealInfo>
      </Row>
    </Col>
  </Container>
</template>
