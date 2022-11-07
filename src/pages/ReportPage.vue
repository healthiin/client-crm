<script setup lang="ts">
import Kakao from 'kakao-js-sdk';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ReportAPI } from '@/api';
import type { GetReportResponse } from '@/api/report';
import Tab from '@/components/buttons/Tab.vue';
import CaloriesInfo from '@/components/forms/CaloriesInfo.vue';
import DaySelector from '@/components/forms/DaySelector.vue';
import MealInfo from '@/components/forms/MealInfo.vue';
import MonthSelector from '@/components/forms/MonthSelector.vue';
import PieGraph from '@/components/forms/PieGraph.vue';
import PieSolidGraph from '@/components/forms/PieSolidGraph.vue';
import RoutineLogItem from '@/components/forms/RoutineLogItem.vue';
import BodyIcon from '@/components/icons/BodyIcon.vue';
import IndicatorIcon from '@/components/icons/IndicatorIcon.vue';
import ShareIcon from '@/components/icons/ShareIcon.vue';
import Card from '@/components/layouts/Card.vue';
import Col from '@/components/layouts/Col.vue';
import Padder from '@/components/layouts/Padder.vue';
import Row from '@/components/layouts/Row.vue';
import SectionTitle from '@/components/texts/SectionTitle.vue';
import { Colors } from '@/utils/styles';

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

const yearAndMonth = reactive({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
});
const days = [16, 17, 18, 19, 20, 21, 22];

const handleSharing = async () => {
  Kakao.Share.sendCustom({
    templateId: 85541,
    templateArgs: {
      reportId: props.reportId,
      nickname: report.value?.user,
    },
  });
};
</script>

<template>
  <Col fill align="center" justify="center" v-if="isLoading" :padding="24">
    <h1>🤯</h1>
    <h3>리포트를 불러오고 있습니다.</h3>
  </Col>

  <Col v-else-if="report">
    <Padder :top="20" :right="24" :bottom="16" :left="16">
      <Row :gap="8">
        <Tab :is-active="true">Day</Tab>
        <Tab>Week</Tab>
        <Tab>Month</Tab>
      </Row>
    </Padder>

    <Padder :top="20" :right="24" :bottom="21" :left="16">
      <Row justify="space-between">
        <p>2022년 8월 첫째주 종합 운동리포트</p>
        <ShareIcon @click="handleSharing" />
      </Row>
    </Padder>

    <Padder :left="16" :right="16" :height="64">
      <Row justify="space-between" align="center">
        <h3>완료한 운동</h3>
        <MonthSelector v-model="yearAndMonth" />
      </Row>
    </Padder>

    <Padder :left="16" :right="16">
      <DaySelector :days="days" />
    </Padder>

    <Padder :left="16" :right="16" :top="48">
      <Row justify="space-around" align="center">
        <Col justify="center" align="center" :gap="16">
          <PieGraph :percent="62" :color="Colors.BulletViolet" />
          평균 섭취 칼로리
        </Col>
        <Col justify="center" align="center" :gap="16">
          <PieGraph :percent="80" :color="Colors.Primary" />
          목표 운동량
        </Col>
      </Row>
    </Padder>

    <Padder :left="16" :right="16" :top="32">
      <Col :gap="16">
        <SectionTitle
          title="💪 운동"
          description="미리 설정한 루틴에 기반한 운동정보입니다."
        />
        <Card type="dimmed">
          <Padder :top="16">
            <Col align="center" :gap="20">
              <BodyIcon />
              <h3>유산소 160분 &middot; 근력 200분</h3>
            </Col>
          </Padder>
        </Card>
        <Card>
          <Col align="center" :gap="16">
            <RoutineLogItem
              title="런닝머신"
              :play-minute="125"
              :weight="45"
              :set-number="3"
            />
            <RoutineLogItem
              title="레그 익스텐션"
              :play-minute="94"
              :weight="70"
              :set-number="3"
            />
            <RoutineLogItem
              title="레그 익스텐션"
              :play-minute="58"
              :weight="70"
              :set-number="3"
            />
            <RoutineLogItem
              title="스컬 크러셔"
              :play-minute="72"
              :weight="70"
              :set-number="3"
            />
          </Col>
        </Card>
      </Col>
    </Padder>

    <Padder :left="16" :right="16" :top="32" :bottom="32">
      <Col :gap="16">
        <SectionTitle
          title="🍽 식단 정보"
          description="오늘의 식단과 예측 칼로리를 알려드려요."
        />
        <Card type="dimmed">
          <Col align="center" justify="center" :gap="20">
            <PieSolidGraph />
            <Row :gap="12" justify="space-between">
              <Row :gap="6" justify="center" align="center">
                <IndicatorIcon :color="Colors.BulletGreen" />
                <h5>탄수화물 40%</h5>
              </Row>
              <Row :gap="6" justify="center" align="center">
                <IndicatorIcon :color="Colors.BulletViolet" />
                <h5>단백질 25%</h5>
              </Row>
              <Row :gap="6" justify="center" align="center">
                <IndicatorIcon :color="Colors.BulletRed" />
                <h5>지방 35%</h5>
              </Row>
            </Row>
          </Col>
        </Card>

        <Card>
          <Col :gap="16">
            <CaloriesInfo :calories="2222" />
            <Col :gap="24">
              <MealInfo type="아침" :menus="['돼지국밥']" :calories="652" />
              <MealInfo type="점심" :menus="['피자']" :calories="524" />
              <MealInfo
                type="저녁"
                :menus="['김치찌개', '계란말이']"
                :calories="923"
              />
              <MealInfo type="간식" :menus="['토스트']" :calories="123" />
            </Col>
          </Col>
        </Card>
      </Col>
    </Padder>
  </Col>
</template>
