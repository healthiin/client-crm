<script setup lang="ts">
import styled from 'vue3-styled-components';

import Col from '@/components/layouts/Col.vue';
import Row from '@/components/layouts/Row.vue';

type Props = { title?: string; time?: string; weight?: number; sets?: number };
const props = withDefaults(defineProps<Props>(), {
  title: '',
  time: '',
  weight: -1,
  sets: -1,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 2px solid ${({ theme }) => theme.colors.Secondary4};
  padding: 6px 12px;
  gap: 4px;
`;

const RoutineTitle = styled.h6``;

const RoutineInfo = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.Secondary7};
`;
</script>

<template>
  <Container>
    <RoutineTitle>{{ props.title }}</RoutineTitle>
    <Col :gap="8">
      <Row :gap="4">
        <RoutineInfo>{{ props.time }}</RoutineInfo>
      </Row>
      <Col :gap="4" v-if="props.weight > 0 || props.sets > 0">
        <RoutineInfo v-if="props.weight > 0">
          무게 {{ props.weight }}kg
        </RoutineInfo>
        <RoutineInfo v-if="props.sets > 0">
          세트 {{ props.sets }}회
        </RoutineInfo>
      </Col>
    </Col>
  </Container>
</template>
