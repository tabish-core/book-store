import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Input = forwardRef(({ className, label, icon: Icon, error, ...props }, ref) => {
    return (
        <div className="space-y-1.5 font-mono">
            {label && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-zinc-50">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-950 dark:text-zinc-50 w-5 h-5 pointer-events-none" />
                )}
                <input
                    ref={ref}
                    className={cn(
                        'w-full bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 px-4 py-3 text-sm text-slate-950 dark:text-zinc-50 placeholder:text-slate-500 dark:placeholder:text-zinc-500 rounded-none',
                        'focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-slate-950 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        Icon && 'pl-12',
                        error && 'border-red-600 focus:ring-red-500/50',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-600 font-bold uppercase">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
