import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateActivityStatus } from '../../../api/activities.api';
import type { Activity } from '../../../types/activity.types';

export const useUpdateActivityStatus = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activityId,
      status,
    }: {
      activityId: string;
      status: Activity['status'];
    }) => updateActivityStatus(clientId, activityId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', clientId] });
    },
  });
};
