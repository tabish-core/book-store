import { Link, useLocation } from 'react-router-dom';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { MdOutlineAddBox } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './ui/Button';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const [dark, setDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    if (location.pathname === '/login' || location.pathname === '/register') return null;

    return (
        <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b-2 border-slate-950 dark:border-zinc-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <div className="bg-orange-500 border-2 border-slate-950 dark:border-zinc-50 p-1 sm:p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        <PiBookOpenTextLight className="text-xl sm:text-2xl text-white" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-slate-950 dark:text-zinc-50 font-sans">
                        Books<span className="text-orange-500">World</span>
                    </span>
                </Link>

                {/* Desktop Actions — hidden on mobile */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={() => setDark(!dark)}
                        className="p-2 border-2 border-transparent hover:border-slate-950 dark:hover:border-zinc-50 transition-all text-slate-950 dark:text-zinc-50"
                        aria-label="Toggle dark mode"
                    >
                        {dark ? <HiOutlineSun className="w-6 h-6" /> : <HiOutlineMoon className="w-6 h-6" />}
                    </button>

                    {isAuthenticated ? (
                        <>
                            <div className="flex flex-col items-end mr-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500">Logged in as</span>
                                <span className="text-sm font-mono font-bold text-slate-950 dark:text-zinc-50">@{user?.username}</span>
                            </div>
                            <Link to="/books/create">
                                <Button size="sm" className="gap-2">
                                    <MdOutlineAddBox className="text-lg" />
                                    <span>Add Book</span>
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login">
                                <Button variant="outline" size="sm">Sign In</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile: theme toggle + hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        onClick={() => setDark(!dark)}
                        className="p-2 text-slate-950 dark:text-zinc-50"
                        aria-label="Toggle dark mode"
                    >
                        {dark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 border-2 border-slate-950 dark:border-zinc-50 text-slate-950 dark:text-zinc-50"
                        aria-label="Open menu"
                    >
                        <HiOutlineMenuAlt3 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* ─── Mobile Drawer ─── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 z-50"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer panel */}
                        <motion.div
                            key="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white dark:bg-zinc-950 border-l-4 border-slate-950 dark:border-zinc-50 z-50 flex flex-col shadow-[-8px_0px_0px_0px_rgba(249,115,22,1)]"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between px-6 h-16 border-b-2 border-slate-950 dark:border-zinc-50">
                                <span className="text-lg font-black uppercase tracking-tighter text-slate-950 dark:text-zinc-50">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 border-2 border-slate-950 dark:border-zinc-50 text-slate-950 dark:text-zinc-50 hover:bg-slate-950 hover:text-white dark:hover:bg-zinc-50 dark:hover:text-zinc-950 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <HiOutlineX className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Drawer body */}
                            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                                {isAuthenticated && (
                                    <div className="bg-slate-100 dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 p-4 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-500 block">Logged in as</span>
                                        <span className="text-base font-mono font-bold text-slate-950 dark:text-zinc-50">@{user?.username}</span>
                                    </div>
                                )}

                                <Link to="/" className="mobile-nav-link">
                                    <span className="text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-zinc-50 block border-b-2 border-slate-200 dark:border-zinc-800 pb-3">
                                        Home
                                    </span>
                                </Link>

                                {isAuthenticated ? (
                                    <>
                                        <Link to="/books/create" className="mobile-nav-link">
                                            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-950 dark:text-zinc-50 border-b-2 border-slate-200 dark:border-zinc-800 pb-3">
                                                <MdOutlineAddBox className="text-lg text-orange-500" />
                                                Add Book
                                            </span>
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setMobileOpen(false); }}
                                            className="w-full text-left text-sm font-bold uppercase tracking-wider text-red-600 border-b-2 border-slate-200 dark:border-zinc-800 pb-3"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-3 pt-2">
                                        <Link to="/login" className="block">
                                            <Button variant="outline" className="w-full">Sign In</Button>
                                        </Link>
                                        <Link to="/register" className="block">
                                            <Button className="w-full">Get Started</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Drawer footer */}
                            <div className="px-6 py-4 border-t-2 border-slate-950 dark:border-zinc-50">
                                <p className="font-mono text-[10px] uppercase text-slate-400 dark:text-zinc-600">
                                    BooksWorld © 2026
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
