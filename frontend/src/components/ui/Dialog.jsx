import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '../../lib/cn';

const DialogOverlay = ({ onClick }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
        onClick={onClick}
    />
);

const Dialog = ({ open, onClose, className, children }) => {
    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose?.();
        if (open) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <DialogOverlay onClick={onClose} />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, type: 'spring', damping: 20, stiffness: 300 }}
                            className={cn(
                                'w-full max-w-4xl bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] overflow-hidden rounded-none',
                                className
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Dialog;
