<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ThemeProvider } from 'vue3-styled-components';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import { LightThemeColors } from '@/utils/styles';

const theme = {
  colors: LightThemeColors,
};
</script>

<template>
  <ThemeProvider :theme="theme">
    <BaseLayout>
      <RouterView />
    </BaseLayout>
  </ThemeProvider>
</template>
