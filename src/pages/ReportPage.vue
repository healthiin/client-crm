<script setup lang="ts">
import {
  addDays,
  differenceInMinutes,
  parseISO,
  setWeek,
  startOfWeek,
} from 'date-fns';
import { range } from 'radash';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { ReportAPI } from '@/api';
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
import type { ReportResult } from '@/models/report';
import { Colors } from '@/utils/styles';

type Props = { reportId: string };
const props = defineProps<Props>();

const router = useRouter();
const isLoading = ref<boolean>(true);
const report = ref<ReportResult | null>(null);

const yearAndMonth = reactive({ year: 0, month: 0 });
const days = ref<number[]>([]);
const currentDateIndex = ref<number>(0);

onMounted(async () => {
  const { data, status } = await ReportAPI.getReport(props.reportId);
  if (status !== 200) return router.push('/');

  isLoading.value = false;
  report.value = data;

  const initialDay = setWeek(
    new Date(report.value.year, 0, 0, 0, 0, 0),
    report.value.week,
  );
  const startDay = startOfWeek(initialDay);

  days.value = Array.from(range(0, 6)).map(day =>
    addDays(startDay, day as number).getDate(),
  );

  yearAndMonth.year = report.value.year;
  yearAndMonth.month = Math.floor((report.value?.week || 4) / 4);
});

const handleSharing = async () => {
  (window as unknown as any).Kakao.Share.sendCustom({
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
    <Padder :top="32" :right="24" :bottom="21" :left="16">
      <Row justify="space-between">
        <p>{{ report.title }}</p>
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
      <DaySelector :days="days" v-model="currentDateIndex" />
    </Padder>

    <Padder :left="16" :right="16" :top="48" v-show="false">
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
        <Card
          type="dimmed"
          v-if="report.result[days[currentDateIndex]].logs.length === 0"
        >
          <h4>기록된 운동이 없습니다.</h4>
        </Card>
        <Card
          type="dimmed"
          v-if="report.result[days[currentDateIndex]].logs.length > 0"
        >
          <Padder :top="16">
            <Col align="center" :gap="20">
              <BodyIcon
                :items="report.result[days[currentDateIndex]].logStatistics"
              />
            </Col>
          </Padder>
        </Card>
        <Card v-if="report.result[days[currentDateIndex]].logs.length > 0">
          <Col align="center" :gap="16">
            <RoutineLogItem
              :title="log.title"
              :weight="log.weight"
              :play-minute="
                Math.abs(
                  differenceInMinutes(
                    parseISO(log.startedAt),
                    parseISO(log.endedAt),
                  ),
                )
              "
              :set-number="log.setNumber"
              v-for="log in report.result[days[currentDateIndex]].logs"
              :key="log.id"
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

        <Card
          type="dimmed"
          v-if="!report.result[days[currentDateIndex]].mealStatistics"
        >
          <h4>기록된 식단이 없습니다.</h4>
        </Card>
        <Card
          type="dimmed"
          v-if="!!report.result[days[currentDateIndex]].mealStatistics"
        >
          <Col align="center" justify="center" :gap="20">
            <PieSolidGraph
              :carbohydrate="
                report.result[days[currentDateIndex]].mealStatistics
                  .carbohydrate
              "
              :protein="
                report.result[days[currentDateIndex]].mealStatistics.protein
              "
              :fat="report.result[days[currentDateIndex]].mealStatistics.fat"
            />
            <Row :gap="12" justify="space-between">
              <Row :gap="6" justify="center" align="center">
                <IndicatorIcon :color="Colors.BulletGreen" />
                <h5>
                  탄수화물
                  {{
                    parseInt(
                      (report.result[days[currentDateIndex]].mealStatistics
                        .carbohydrate /
                        (report.result[days[currentDateIndex]].mealStatistics
                          .carbohydrate +
                          report.result[days[currentDateIndex]].mealStatistics
                            .protein +
                          report.result[days[currentDateIndex]].mealStatistics
                            .fat)) *
                        100,
                    )
                  }}%
                </h5>
              </Row>
              <Row :gap="6" justify="center" align="center">
                <IndicatorIcon :color="Colors.BulletViolet" />
                <h5>
                  단백질
                  {{
                    parseInt(
                      (report.result[days[currentDateIndex]].mealStatistics
                        .protein /
                        (report.result[days[currentDateIndex]].mealStatistics
                          .carbohydrate +
                          report.result[days[currentDateIndex]].mealStatistics
                            .protein +
                          report.result[days[currentDateIndex]].mealStatistics
                            .fat)) *
                        100,
                    )
                  }}%
                </h5>
              </Row>
              <Row :gap="6" justify="center" align="center">
                <IndicatorIcon :color="Colors.BulletRed" />
                <h5>
                  지방
                  {{
                    parseInt(
                      (report.result[days[currentDateIndex]].mealStatistics
                        .fat /
                        (report.result[days[currentDateIndex]].mealStatistics
                          .carbohydrate +
                          report.result[days[currentDateIndex]].mealStatistics
                            .protein +
                          report.result[days[currentDateIndex]].mealStatistics
                            .fat)) *
                        100,
                    )
                  }}%
                </h5>
              </Row>
            </Row>
          </Col>
        </Card>

        <Card v-if="!!report.result[days[currentDateIndex]].mealStatistics">
          <Col :gap="16">
            <CaloriesInfo
              :calories="
                report.result[days[currentDateIndex]].meals.reduce(
                  (acc, meal) => acc + meal.calories,
                  0,
                )
              "
            />
            <Col :gap="24">
              <MealInfo
                type="아침"
                v-if="
                  report.result[days[currentDateIndex]].meals.filter(
                    menu => menu.type === 'breakfast',
                  ).length > 0
                "
                :calories="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'breakfast')
                    .reduce((acc, meal) => acc + meal.calories, 0)
                "
                :menus="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'breakfast')
                    .map(({ title }) => title)
                "
                :photo-ids="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'breakfast')
                    .map(({ photoId }) => photoId)
                "
              />
              <MealInfo
                type="점심"
                v-if="
                  report.result[days[currentDateIndex]].meals.filter(
                    menu => menu.type === 'lunch',
                  ).length > 0
                "
                :calories="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'lunch')
                    .reduce((acc, meal) => acc + meal.calories, 0)
                "
                :menus="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'lunch')
                    .map(({ title }) => title)
                "
                :photo-ids="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'lunch')
                    .map(({ photoId }) => photoId)
                "
              />
              <MealInfo
                type="저녁"
                v-if="
                  report.result[days[currentDateIndex]].meals.filter(
                    menu => menu.type === 'dinner',
                  ).length > 0
                "
                :calories="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'dinner')
                    .reduce((acc, meal) => acc + meal.calories, 0)
                "
                :menus="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'dinner')
                    .map(({ title }) => title)
                "
                :photo-ids="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'dinner')
                    .map(({ photoId }) => photoId)
                "
              />
              <MealInfo
                type="간식"
                v-if="
                  report.result[days[currentDateIndex]].meals.filter(
                    menu => menu.type === 'snack',
                  ).length > 0
                "
                :calories="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'snack')
                    .reduce((acc, meal) => acc + meal.calories, 0)
                "
                :menus="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'snack')
                    .map(({ title }) => title)
                "
                :photo-ids="
                  report.result[days[currentDateIndex]].meals
                    .filter(menu => menu.type === 'snack')
                    .map(({ photoId }) => photoId)
                "
              />
            </Col>
          </Col>
        </Card>
      </Col>
    </Padder>
  </Col>
</template>
