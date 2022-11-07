<script setup lang="ts">
import styled from 'vue3-styled-components';

import Col from '@/components/layouts/Col.vue';

type Props = {
  type: string;
  menus?: string[];
  calories?: number;
};

withDefaults(defineProps<Props>(), {
  type: '아침',
});

const Container = styled.div``;

const MealImage = styled.img`
  height: 88px;
  width: 88px;
  border-radius: 16px;
`;
</script>

<template>
  <Container>
    <Col :gap="4">
      <h4 class="bold">{{ type }}</h4>
      <h5>
        {{ menus && menus.join(', ') }} {{ calories && `${calories}kcal` }}
      </h5>
      <MealImage
        src="https://cdn.be-healthy.life/98aa549a-99dd-402f-ac60-290787149391_20221014105204"
        alt=""
      />
    </Col>
  </Container>
</template>
