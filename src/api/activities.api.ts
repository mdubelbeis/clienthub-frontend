import type { Activity } from '../types/activity.type';
import api from './axios';

export const getActivities = async (clientId: string): Promise<Activity[]> => {
  const res = await api.get(`/api/clients/${clientId}/activities`);
  return res.data.content;
};

export const createActivity = async (
  clientId: string,
  data: Partial<Activity>,
): Promise<Activity> => {
  data.type = data.type?.toUpperCase();
  const res = await api.post(`/clients/${clientId}`, data);
  return res.data;
};