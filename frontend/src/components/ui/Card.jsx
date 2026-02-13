import { cn } from '../../lib/cn';

const Card = ({ className, children, ...props }) => (
    <div
        className={cn(
            'bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-none',
            className
        )}
        {...props}
    >
        {children}
    </div>
);

const CardHeader = ({ className, children, ...props }) => (
    <div className={cn('px-6 py-4 border-b-2 border-slate-950 dark:border-zinc-50', className)} {...props}>
        {children}
    </div>
);

const CardContent = ({ className, children, ...props }) => (
    <div className={cn('p-6', className)} {...props}>
        {children}
    </div>
);

export { Card, CardHeader, CardContent };
export default Card;
