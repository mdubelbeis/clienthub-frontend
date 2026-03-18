import { useQuery } from '@tanstack/react-query';
import { getActivities } from '../../../api/activities.api';

export const useActivities = (clientId: string) => {
  return useQuery({
    queryKey: ['activities', clientId],
    queryFn: () => getActivities(clientId),
    enabled: !!clientId,
  });
};
