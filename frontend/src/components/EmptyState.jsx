import { PiBookOpenTextLight } from 'react-icons/pi';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const EmptyState = ({ title = 'No books found', message = 'Try adjusting your search or filters.', onAction, actionLabel = 'Clear filters' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-24 text-center"
        >
            <div className="w-24 h-24 bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <PiBookOpenTextLight className="text-4xl text-slate-950 dark:text-white" />
            </div>
            <h3 className="text-2xl font-black uppercase text-slate-950 dark:text-white mb-2 tracking-tight">{title}</h3>
            <p className="text-sm font-mono font-bold text-slate-500 dark:text-slate-400 max-w-sm mb-8 uppercase">{message}</p>
            {onAction && (
                <Button onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </motion.div>
    );
};

export default EmptyState;
