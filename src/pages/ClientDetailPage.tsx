import { useParams } from 'react-router-dom';
import { useActivities } from '../features/activities/hooks/useActivities';
import CreateActivityForm from '../components/forms/CreateActivityForm';

export default function ClientDetailPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useActivities(id!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading activities</div>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Client Activities</h1>

      <CreateActivityForm clientId={id!} />

      <ul className='mt-4'>
        {data?.map((activity) => (
          <li key={activity.id} className='border p-2 mb-2'>
            <div className='font-semibold'>{activity.type}</div>
            <div>{activity.notes}</div>
            <div className='text-sm text-gray-500'>
              {new Date(activity.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
