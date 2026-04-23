import { useState } from 'react';
import type { ReportType } from '../types/report.types';
import { useGenerateReport } from '../features/activities/hooks/useGenerateReport';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('clients');
  const [searchTerm, setSearchTerm] = useState('');

  const { mutate, data, isPending, isError, error, reset } =
    useGenerateReport();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    reset();
    mutate({
      reportType,
      searchTerm,
    });
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold text-slate-900'>Reports</h1>
        <p className='mt-1 text-sm text-slate-600'>
          Generate client and activity reports using an optional search filter.
        </p>
      </div>

      <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
        <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-3'>
          <div>
            <label
              htmlFor='reportType'
              className='mb-1 block text-sm font-medium text-slate-700'
            >
              Report Type
            </label>
            <select
              id='reportType'
              value={reportType}
              onChange={(e) => setReportType(e.target.value as ReportType)}
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none'
            >
              <option value='clients'>Client Summary Report</option>
              <option value='activities'>Activity Report</option>
            </select>
          </div>

          <div>
            <label
              htmlFor='searchTerm'
              className='mb-1 block text-sm font-medium text-slate-700'
            >
              Search Term
            </label>
            <input
              id='searchTerm'
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search by name, email, phone, status, notes...'
              className='w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none'
            />
          </div>

          <div className='flex items-end'>
            <button
              type='submit'
              disabled={isPending}
              className='inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isPending ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </form>
      </div>

      {isError && (
        <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {error?.message || 'Failed to generate report.'}
        </div>
      )}

      {data && (
        <div className='space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
          <div>
            <h2 className='text-xl font-semibold text-slate-900'>
              {data.title}
            </h2>
            <p className='mt-1 text-sm text-slate-600'>
              Generated at: {new Date(data.generatedAt).toLocaleString()}
            </p>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full border-collapse'>
              <thead>
                <tr className='bg-slate-50'>
                  {data.columns.map((column) => (
                    <th
                      key={column}
                      className='border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700'
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={data.columns.length}
                      className='border border-slate-200 px-3 py-6 text-center text-sm text-slate-500'
                    >
                      No results found.
                    </td>
                  </tr>
                ) : (
                  data.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className='odd:bg-white even:bg-slate-50/40'
                    >
                      {data.columns.map((column) => (
                        <td
                          key={`${rowIndex}-${column}`}
                          className='border border-slate-200 px-3 py-2 text-sm text-slate-700 align-top'
                        >
                          {formatCellValue(row[column])}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    const maybeDate = Date.parse(value);
    if (!Number.isNaN(maybeDate) && value.includes('T')) {
      return new Date(value).toLocaleString();
    }
    return value;
  }

  return String(value);
}
