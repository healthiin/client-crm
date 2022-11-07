<script setup lang="ts">
import styled from 'vue3-styled-components';

type Props = {
  calories: number;
};
const props = defineProps<Props>();

const Container = styled.div`
  display: flex;
  padding: 16px 24px;
  background: ${({ theme }) => theme.Gray1};
  border-radius: 12px;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

const Title = styled.h5``;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const CurrentCalories = styled.p`
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
`;

const MaxCalories = styled.p`
  ${({ theme }) => theme.Body2}
  line-height: 20px;
  color: ${({ theme }) => theme.Gray2};
`;
</script>

<template>
  <Container>
    <Title>섭취 칼로리</Title>
    <InfoContainer>
      <CurrentCalories>{{ props.calories }}kcal</CurrentCalories>
      <MaxCalories> /2000 </MaxCalories>
    </InfoContainer>
  </Container>
</template>
