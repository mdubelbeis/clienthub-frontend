import api from './axios';
import type { ReportRequest, ReportResponse } from '../types/report.types';

export async function generateReport(
  payload: ReportRequest,
): Promise<ReportResponse> {
  const response = await api.post<ReportResponse>('/reports', payload);
  return response.data;
}
