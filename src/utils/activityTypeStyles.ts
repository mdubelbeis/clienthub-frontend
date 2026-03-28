export function getActivityTypeClasses(type: string) {
  switch (type) {
    case 'CALL':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
    case 'EMAIL':
      return 'border-sky-500/20 bg-sky-500/10 text-sky-300';
    case 'MEETING':
      return 'border-violet-500/20 bg-violet-500/10 text-violet-300';
    case 'TASK':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-300';
    case 'NOTE':
      return 'border-slate-500/20 bg-slate-500/10 text-slate-300';
    default:
      return 'border-slate-500/20 bg-slate-500/10 text-slate-300';
  }
}
