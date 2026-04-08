interface ConfirmDeleteModalProps {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  errorMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  title = 'Confirm Delete',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isPending = false,
  errorMessage,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4'>
      <div className='w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl'>
        <div>
          <h2 className='text-lg font-semibold text-white'>{title}</h2>
          <p className='mt-2 text-sm leading-6 text-slate-300'>{message}</p>
        </div>

        {errorMessage && (
          <div className='mt-4 rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300'>
            {errorMessage}
          </div>
        )}

        <div className='mt-6 flex justify-end gap-3'>
          <button
            type='button'
            onClick={onCancel}
            disabled={isPending}
            className='rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:border-slate-800 disabled:bg-slate-900 disabled:text-slate-500'
          >
            {cancelLabel}
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={isPending}
            className='rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400'
          >
            {isPending ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
