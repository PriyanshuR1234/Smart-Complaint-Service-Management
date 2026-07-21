import clsx from 'clsx';

const statusStyles = {
  OPEN: 'bg-sky-100 text-sky-700 border border-sky-200',
  IN_PROGRESS: 'bg-amber-100 text-amber-700 border border-amber-200',
  RESOLVED: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  CLOSED: 'bg-slate-100 text-slate-700 border border-slate-200',
};

const StatusBadge = ({ status, className = '' }) => {
  const normalized = (status || '').toUpperCase().replace(/\s+/g, '_');
  const label = normalized.replace(/_/g, ' ');
  const style = statusStyles[normalized] || 'bg-slate-100 text-slate-700 border border-slate-200';

  return (
    <span className={clsx('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide', style, className)}>
      {label}
    </span>
  );
};

export default StatusBadge;
