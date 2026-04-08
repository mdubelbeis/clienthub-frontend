import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateActivity } from '../../../api/activities.api';
import type { Activity } from '../../../types/activity.types';

export const useUpdateActivity = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activityId,
      data,
    }: {
      activityId: string;
      data: { type: Activity['type']; notes: string };
    }) => updateActivity(clientId, activityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', clientId] });
    },
  });
};
