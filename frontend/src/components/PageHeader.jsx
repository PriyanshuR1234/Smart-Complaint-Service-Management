import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Smart Portal</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  );
};

export default PageHeader;
