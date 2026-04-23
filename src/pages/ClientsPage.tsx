import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import EditClientModal from '../components/modals/EditClientModal';
import CreateClientForm from '../components/forms/CreateClientForm';
import { useClients } from '../features/clients/hooks/useClients';
import { useDeleteClient } from '../hooks/useDeleteClient';
import type { Client } from '../types/client.types';

interface PendingDeleteClient {
  id: string;
  name: string;
}

export default function ClientsPage() {
  const { data: clients = [], isLoading, isError } = useClients();
  const deleteClientMutation = useDeleteClient();

  const [pendingDeleteClient, setPendingDeleteClient] =
    useState<PendingDeleteClient | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleOpenDeleteModal = (clientId: string, clientName: string) => {
    deleteClientMutation.reset();
    setPendingDeleteClient({
      id: clientId,
      name: clientName,
    });
  };

  const handleCloseDeleteModal = () => {
    if (deleteClientMutation.isPending) return;
    deleteClientMutation.reset();
    setPendingDeleteClient(null);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteClient) return;

    deleteClientMutation.mutate(pendingDeleteClient.id, {
      onSuccess: () => {
        setPendingDeleteClient(null);
      },
    });
  };

  const handleOpenEditModal = (client: Client) => {
    setEditingClient(client);
  };

  const handleCloseEditModal = () => {
    setEditingClient(null);
  };

  const deleteErrorMessage = (() => {
    if (!deleteClientMutation.isError) return '';

    const error = deleteClientMutation.error;

    if (axios.isAxiosError(error)) {
      return (
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Failed to delete client.'
      );
    }

    return 'Failed to delete client.';
  })();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading clients</div>;
  }

  return (
    <>
      <div>
        <h1 className='mb-4 text-2xl font-bold'>Clients</h1>

        <div className='mb-6 rounded bg-white p-4 shadow'>
          <CreateClientForm />
        </div>

        {!clients.length ? (
          <div>No clients yet</div>
        ) : (
          <ul className='space-y-3'>
            {clients.map((client) => {
              const isDeleting =
                deleteClientMutation.isPending &&
                pendingDeleteClient?.id === client.id;

              return (
                <li key={client.id} className='rounded border p-3'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <Link
                        to={`/clients/${client.id}`}
                        className='text-purple-600 underline'
                      >
                        {client.name}
                      </Link>

                      <div className='text-sm text-gray-600'>
                        {client.email || '—'}
                      </div>

                      <div className='text-sm text-gray-600'>
                        {client.phone || '—'}
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <button
                        type='button'
                        onClick={() => handleOpenEditModal(client)}
                        className='rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-500'
                      >
                        Edit
                      </button>

                      <button
                        type='button'
                        onClick={() =>
                          handleOpenDeleteModal(client.id, client.name)
                        }
                        disabled={deleteClientMutation.isPending}
                        className='rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-400'
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {pendingDeleteClient && (
        <ConfirmDeleteModal
          title='Delete Client'
          message={`Are you sure you want to delete ${pendingDeleteClient.name}? This action cannot be undone.`}
          confirmLabel='Delete Client'
          cancelLabel='Keep Client'
          isPending={deleteClientMutation.isPending}
          errorMessage={deleteErrorMessage}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
        />
      )}

      {editingClient && (
        <EditClientModal
          client={editingClient}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}