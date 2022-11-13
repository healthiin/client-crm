type Log = {
  id: string;
  title: string;
  setNumber: number;
  type: string;
  weight: number;
  startedAt: Date;
  endedAt: Date;
};

type Meal = {
  id: string;
  type: string;
  title: string;
  calories: number;
  photoId: string;
};

type MealStatistics = {
  carbohydrate: number;
  protein: number;
  fat: number;
};

type ReportItem = {
  logs?: Log[];
  logStatistics?: string[];
  meals?: Meal[];
  mealStatistics?: MealStatistics;
};

export interface ReportResult {
  user: string;
  title: string;
  year: number;
  week: number;
  result: Record<string, ReportItem>;
}
