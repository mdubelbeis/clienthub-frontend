import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClient } from '../../../api/clients.api';
import type { Client } from '../../../types/client.types';

interface UpdateClientInput {
  clientId: string;
  data: Partial<Client>;
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, data }: UpdateClientInput) =>
      updateClient(clientId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({
        queryKey: ['client', variables.clientId],
      });
    },
  });
};
