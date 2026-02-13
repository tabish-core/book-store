const Spinner = ({ text = 'LOADING DATA...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      {/* Square spinner */}
      <div className="w-12 h-12 border-4 border-slate-950 dark:border-zinc-50 border-t-transparent animate-spin rounded-none" />
      {text && <span className="font-mono text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-zinc-50">{text}</span>}
    </div>
  );
};

export default Spinner;