<script setup lang="ts">
import { reactive } from 'vue';
import styled from 'vue3-styled-components';

import ArrowIcon from '@/components/icons/ArrowIcon.vue';

const Container = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Button = styled(ArrowIcon)`
  cursor: pointer;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  padding: 4px 10px;
  ${({ theme }) => theme.Body1};
  font-weight: 700;
`;

type Props = {
  modelValue: { year: number; month: number };
};
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const date = reactive({
  year: props.modelValue.year,
  month: props.modelValue.month,
});

const handlePrev = () => {
  if (date.month === 1) {
    date.year -= 1;
    date.month = 12;
  } else {
    date.month -= 1;
  }
  emit('update:modelValue', date);
};

const handleNext = () => {
  if (date.month === 12) {
    date.year += 1;
    date.month = 1;
  } else {
    date.month += 1;
  }
};
</script>

<template>
  <Container>
    <Button :deg="270" @click="handlePrev" v-show="false" />
    <Label>{{ date.year }}. {{ date.month.toString().padStart(2, '0') }}</Label>
    <Button :deg="90" @click="handleNext" v-show="false" />
  </Container>
</template>
