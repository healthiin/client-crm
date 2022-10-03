<script setup lang="ts">
import styled from 'vue3-styled-components';

const Container = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.Secondary8};
`;
</script>

<template>
  <Container>
    <slot />
  </Container>
</template>
