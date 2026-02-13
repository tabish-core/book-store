import { cn } from '../../lib/cn';

const variants = {
    default: 'bg-orange-500 text-white border-slate-950',
    secondary: 'bg-white text-slate-950 border-slate-950',
    outline: 'bg-transparent text-slate-950 border-slate-950',
};

const Badge = ({ className, variant = 'default', children, ...props }) => (
    <span
        className={cn(
            'inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold uppercase border-2 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] dark:border-zinc-50',
            variants[variant],
            className
        )}
        {...props}
    >
        {children}
    </span>
);

export default Badge;
