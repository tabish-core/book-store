import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]',
    secondary: 'bg-white text-slate-950 hover:bg-slate-100 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900 dark:text-zinc-50 dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]',
    destructive: 'bg-red-600 text-white hover:bg-red-700 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]',
    ghost: 'bg-transparent text-slate-950 hover:bg-slate-100 dark:text-zinc-50 dark:hover:bg-zinc-800',
    outline: 'bg-transparent border-2 border-slate-950 text-slate-950 hover:bg-slate-100 dark:border-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-900',
};

const sizes = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-12 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
};

const Button = forwardRef(({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
        <button
            ref={ref}
            disabled={disabled || loading}
            className={cn(
                'inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 border-2 border-slate-950 dark:border-zinc-50 rounded-none',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-500/50 focus-visible:ring-offset-0',
                'disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {loading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin shrink-0 mr-2" />
            )}
            {children}
        </button>
    );
});

Button.displayName = 'Button';
export default Button;
