<script setup lang="ts">
import styled from 'vue3-styled-components';

import Col from '@/components/layouts/Col.vue';

type Props = {
  title: string;
  description: string;
};
const props = defineProps<Props>();

const Title = styled.h3`
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.Primary};
`;
</script>

<template>
  <Col :gap="8">
    <Title>{{ props.title }}</Title>
    <Description>{{ props.description }}</Description>
  </Col>
</template>
