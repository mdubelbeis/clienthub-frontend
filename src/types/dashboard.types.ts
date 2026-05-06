export type RecentActivity = {
  id: string;
  clientId: string;
  clientName: string;
  type: string;
  status: string;
  notes: string | null;
  createdAt: string;
};

export type DashboardSummary = {
  totalClients: number;
  totalActivities: number;
  openActivities: number;
  completedActivities: number;
  recentActivities: RecentActivity[];
};
