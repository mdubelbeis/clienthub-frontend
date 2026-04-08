export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'TASK';
export type ActivityStatus = 'OPEN' | 'COMPLETED';

export interface Activity {
  id: string;
  type: ActivityType;
  notes: string;
  status: ActivityStatus;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}
