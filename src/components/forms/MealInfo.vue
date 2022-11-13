<script setup lang="ts">
import styled from 'vue3-styled-components';

import Col from '@/components/layouts/Col.vue';
import Row from '@/components/layouts/Row.vue';

type Props = {
  type: string;
  menus?: string[];
  calories?: number;
  photoIds?: string[];
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
      <Row :gap="12">
        <MealImage
          v-for="photoId in photoIds"
          v-bind:key="photoId"
          :src="`https://cdn.be-healthy.life/${photoId}`"
          alt=""
        />
      </Row>
    </Col>
  </Container>
</template>
