const EmptyState = ({ title, description, action }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-8 py-14 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
