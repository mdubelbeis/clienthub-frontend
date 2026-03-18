import type { Activity } from '../types/activity.type';
import api from './axios';

export const getActivities = async (clientId: string): Promise<Activity[]> => {
  const res = await api.get(`/clients/${clientId}/activities`);
  return res.data.content; // assuming Page<>
};

export const createActivity = async (
  clientId: string,
  data: Partial<Activity>,
): Promise<Activity> => {
  data.type = data.type?.toUpperCase();
  const res = await api.post(`/clients/${clientId}/activities`, data);
  return res.data;
};
