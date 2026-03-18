import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../../../api/clients.api';

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      console.log('INVALIDATING CLIENTS');
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
