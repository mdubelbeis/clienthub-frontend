import { useQuery } from '@tanstack/react-query';
import { getClientById } from '../api/clients.api';

export function useClient(clientId: string) {
  return useQuery({
    queryKey: ['client', clientId],
    queryFn: () => getClientById(clientId),
    enabled: !!clientId,
  });
}
