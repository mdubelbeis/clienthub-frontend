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
            <li key={client.id} className='border p-2 mb-2'>
              {client.name} - {client.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
