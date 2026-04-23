import { useMutation } from '@tanstack/react-query';
import { generateReport } from '../../../api/reports.api';
import type {
  ReportRequest,
  ReportResponse,
} from '../../../types/report.types';

export function useGenerateReport() {
  return useMutation<ReportResponse, Error, ReportRequest>({
    mutationFn: generateReport,
  });
}
