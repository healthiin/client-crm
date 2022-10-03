import reports from '@/resources/reports.json';

export type GetReportResponse = {
  id: string;
  user: string;
  createdAt: string;
  exercise: {
    gym: string;
  };
  routines: {
    title: string;
    startedAt: string;
    finishedAt: string;
    weight?: number;
    set?: number;
  }[];
  meals: {
    type: string;
    calories: number;
    photo: string;
    menus: string[];
  }[];
};

const getReport = async (
  reportId: string,
): Promise<{ data: GetReportResponse | null; status: number }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = reports.find(({ id }) => id === reportId);
      if (!data) return resolve({ status: 404, data: null });
      return resolve({ data: data, status: 200 });
    }, 1000);
  });
};

export default {
  getReport,
};
