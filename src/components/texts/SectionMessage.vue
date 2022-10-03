<script setup lang="ts">
import styled from 'vue3-styled-components';

const Container = styled.p`
  color: ${({ theme }) => theme.colors.Secondary7};
  padding-left: 16px;

  strong {
    color: ${({ theme }) => theme.colors.Secondary8};
    font-weight: 600;
  }
`;
</script>

<template>
  <Container>
    <slot />
  </Container>
</template>
