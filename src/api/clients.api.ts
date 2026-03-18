import type { Client } from '../types/client.types';
import api from './axios';

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get('/clients');
  return response.data;
};

export const createClient = async (data: Partial<Client>): Promise<Client> => {
  const response = await api.post('/clients', data);
  return response.data;
};
