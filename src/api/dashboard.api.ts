import api from './axios';
import type { DashboardSummary } from '../types/dashboard.types';

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get('/api/dashboard/summary');
  return response.data;
};
