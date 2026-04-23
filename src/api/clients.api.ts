import type { Client } from '../types/client.types';
import api from './axios';

export const getClients = async (): Promise<Client[]> => {
  const response = await api.get('/api/clients');
  return response.data.content;
};

export const createClient = async (data: Partial<Client>): Promise<Client> => {
  const response = await api.post('/api/clients', data);
  return response.data;
};

export const getClientById = async (clientId: string) => {
  const response = await api.get(`/api/clients/${clientId}`);
  return response.data;
};

export const deleteClient = async (clientId: string): Promise<void> => {
  await api.delete(`/api/clients/${clientId}`);
};

export const updateClient = async (
  clientId: string,
  data: Partial<Client>,
): Promise<Client> => {
  const response = await api.put(`/api/clients/${clientId}`, data);
  return response.data;
};