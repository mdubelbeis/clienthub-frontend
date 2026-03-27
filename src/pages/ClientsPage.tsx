import { Link } from 'react-router-dom';
import CreateClientForm from '../components/forms/CreateClientForm';
import { useClients } from '../features/clients/hooks/useClients';

export default function ClientsPage() {
  const { data, isLoading, isError } = useClients();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading clients</div>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Clients</h1>
      <div className='bg-white shadow p-4 mb-6 rounded'>
        <CreateClientForm />
      </div>
      <ul>
        {!data?.length ? (
          <div>No clients yet</div>
        ) : (
          data?.map((client) => (
            <div key={client.id} className='border p-2 mb-2'>
              <Link
                to={`api/clients/${client.id}/activities`}
                className='text-purple-600 underline'
              >
                {client.name}
              </Link>
              <div className='text-sm text-gray-600'>{client.email}</div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}
