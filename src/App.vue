<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ThemeProvider } from 'vue3-styled-components';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import { Colors, Typography } from '@/utils/styles';

const theme = { ...Colors, ...Typography };
</script>

<template>
  <ThemeProvider :theme="theme">
    <BaseLayout>
      <RouterView />
    </BaseLayout>
  </ThemeProvider>
</template>
