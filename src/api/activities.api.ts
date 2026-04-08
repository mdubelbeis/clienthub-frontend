import type { Activity } from '../types/activity.types';
import type { PageResponse } from '../types/page';
import api from './axios';

export const getActivities = async (clientId: string): Promise<Activity[]> => {
  const res = await api.get<PageResponse<Activity>>(
    `/api/clients/${clientId}/activities`,
  );
  return res.data.content;
};

export const createActivity = async (
  clientId: string,
  data: { type: Activity['type']; notes: string },
): Promise<Activity> => {
  const payload = {
    ...data,
    type: data.type.toUpperCase(),
  };

  const res = await api.post<Activity>(
    `/api/clients/${clientId}/activities`,
    payload,
  );
  return res.data;
};

export const updateActivity = async (
  clientId: string,
  activityId: string,
  data: { type: Activity['type']; notes: string },
): Promise<Activity> => {
  const payload = {
    ...data,
    type: data.type.toUpperCase(),
  };

  const res = await api.put<Activity>(
    `/api/clients/${clientId}/activities/${activityId}`,
    payload,
  );
  return res.data;
};

export const updateActivityStatus = async (
  clientId: string,
  activityId: string,
  status: Activity['status'],
): Promise<Activity> => {
  const res = await api.patch<Activity>(
    `/api/clients/${clientId}/activities/${activityId}/status`,
    { status },
  );
  return res.data;
};
