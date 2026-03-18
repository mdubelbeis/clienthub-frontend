import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivity } from '../../../api/activities.api';

export const useCreateActivity = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => createActivity(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activities', clientId],
      });
    },
  });
};
