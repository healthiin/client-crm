<script setup lang="ts">
import { ref } from 'vue';
import styled, { css } from 'vue3-styled-components';

const DAY_OF_WEEKS = ['월', '화', '수', '목', '금', '토', '일'];

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DayItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const DayOfWeekLabel = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 48px;
  font-weight: 700;
`;

const DayNumberButton = styled('div', { active: Boolean })`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 32px;
  width: 32px;
  background: ${({ theme, active }) =>
    active ? theme.Primary : 'transparent'};
  border-radius: 100%;
  cursor: pointer;
`;

const DayNumberLabel = styled('span', { active: Boolean })`
  ${({ theme }) => theme.Body2};

  ${({ active }) =>
    active &&
    css`
      font-weight: 700;
    `};
`;

type Props = {
  days: number[];
  modelValue: number;
};
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const selectedIndex = ref<number>(props.modelValue);

const handleSelect = (index: number) => {
  selectedIndex.value = index;
  emit('update:modelValue', index);
};
</script>

<template>
  <Container>
    <DayItem v-for="(day, key) in props.days" v-bind:key="key">
      <DayOfWeekLabel>{{ DAY_OF_WEEKS[key] }}</DayOfWeekLabel>
      <DayNumberButton
        :active="selectedIndex === key"
        @click="handleSelect(key)"
      >
        <DayNumberLabel :active="selectedIndex === key">
          {{ day }}
        </DayNumberLabel>
      </DayNumberButton>
    </DayItem>
  </Container>
</template>
