import { useQuery } from '@tanstack/react-query';
import { getClients } from '../../../api/clients.api';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });
};
