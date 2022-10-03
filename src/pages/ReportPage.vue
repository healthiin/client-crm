<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ReportAPI } from '@/api';
import type { GetReportResponse } from '@/api/report';
import Col from '@/components/layouts/Col.vue';
import Divider from '@/components/layouts/Divider.vue';
import Row from '@/components/layouts/Row.vue';
import Spacer from '@/components/layouts/Spacer.vue';
import MealItem from '@/components/reports/MealItem.vue';
import RoutineItem from '@/components/reports/RoutineItem.vue';
import PageDescription from '@/components/texts/PageDescription.vue';
import PageTitle from '@/components/texts/PageTitle.vue';
import SectionMessage from '@/components/texts/SectionMessage.vue';
import SectionTitle from '@/components/texts/SectionTitle.vue';

type Props = { reportId: string };
const props = defineProps<Props>();

const router = useRouter();
const isLoading = ref<boolean>(true);
const report = ref<GetReportResponse | null>(null);

onMounted(async () => {
  const { data, status } = await ReportAPI.getReport(props.reportId);

  if (status === 200) {
    isLoading.value = false;
    report.value = data;
  } else {
    return router.push('/');
  }
});
</script>

<template>
  <Col fill align="center" justify="center" v-if="isLoading" :padding="24">
    <h1>🤯</h1>
    <h3>리포트를 불러오고 있습니다.</h3>
  </Col>
  <Col :gap="32" v-else-if="report" :padding="24">
    <img src="../assets/splashicon.png" height="72" alt="" />

    <Col :gap="8">
      <PageTitle>데일리 리포트</PageTitle>
      <PageDescription>
        {{ report.user }}님의 10월 1일 운동 리포트입니다.
      </PageDescription>
    </Col>

    <Spacer :top="16" :bottom="8">
      <Divider />
    </Spacer>

    <Col :gap="12">
      <SectionTitle>ℹ️ 종합 정보</SectionTitle>
      <Col :gap="8">
        <SectionMessage>오늘은 OOO 헬스장에서 운동을 했어요.</SectionMessage>
        <SectionMessage>
          <strong>운동 시간:</strong> 오후 6시 31분 ~ 오후 7시 40분 (1시간 9분)
        </SectionMessage>
      </Col>
    </Col>

    <Col :gap="8">
      <SectionTitle>💪 운동 정보</SectionTitle>
      <PageDescription>
        미리 설정한 루틴에 기반한 운동 기록입니다.
      </PageDescription>
      <Col :gap="12" :padding="16">
        <RoutineItem
          v-for="(routine, key) in report.routines"
          v-bind:key="key"
          :title="`${key + 1}. ${routine.title}`"
          :time="`${routine.startedAt} ~ ${routine.finishedAt}`"
          :weight="routine.weight"
          :set="routine.set"
        />
      </Col>
    </Col>

    <Col :gap="8">
      <SectionTitle>😫 운동 결과 정보</SectionTitle>
      <PageDescription>
        운동 중 입력한 만족도와 피로도 정보입니다.
      </PageDescription>
      <Spacer :top="32" :bottom="32">
        <Row align="center" justify="center" fill>입력된 정보가 없어요 🥲</Row>
      </Spacer>
    </Col>

    <Col :gap="8">
      <SectionTitle>🍛 식단 정보</SectionTitle>
      <PageDescription>오늘의 식단과 예측 칼로리를 알려드려요.</PageDescription>
      <Col :gap="12" :padding="16">
        <MealItem
          v-for="(meal, key) in report.meals"
          v-bind:key="key"
          :type="meal.type"
          :kcal="meal.calories"
          :menus="meal.menus"
        />
      </Col>
    </Col>
  </Col>
</template>
