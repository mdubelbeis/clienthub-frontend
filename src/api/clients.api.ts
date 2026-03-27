import type { Client } from '../types/client.types';
import api from './axios';

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get('/api/clients');
  return response.data.content;
};

export const createClient = async (data: Partial<Client>): Promise<Client> => {
  const response = await api.post('api/clients', data);
  return response.data.content;
};
