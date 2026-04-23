export type ReportType = 'clients' | 'activities';

export interface ReportRequest {
  reportType: ReportType;
  searchTerm: string;
}

export interface ReportResponse {
  title: string;
  generatedAt: string;
  columns: string[];
  rows: Record<string, unknown>[];
}
