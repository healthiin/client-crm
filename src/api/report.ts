import type { AxiosResponse } from 'axios';

import { axiosInstance } from '@/api/instance';
import type { ReportResult } from '@/models/report';

const getReport = async (
  reportId: string,
): Promise<AxiosResponse<ReportResult>> => {
  return axiosInstance.get<ReportResult>(`/reports/${reportId}`);
};

export default {
  getReport,
};
