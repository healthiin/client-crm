<script setup lang="ts">
import Kakao from 'kakao-js-sdk';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { ThemeProvider } from 'vue3-styled-components';

import BaseLayout from '@/components/layouts/BaseLayout.vue';
import { Colors, Typography } from '@/utils/styles';

const theme = { ...Colors, ...Typography };

onMounted(() => {
  if (!Kakao.isInitialized()) {
    Kakao.init('276ca335211bcebd261cd53d447469fb');
  }
});
</script>

<template>
  <ThemeProvider :theme="theme">
    <BaseLayout>
      <RouterView />
    </BaseLayout>
  </ThemeProvider>
</template>
