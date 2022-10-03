<script setup lang="ts">
import styled from 'vue3-styled-components';

const DividerElement = styled.hr`
  border: 0;
  margin: 0;
  height: 1px;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.Secondary6};
`;
</script>

<template>
  <DividerElement />
</template>
