import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { AiOutlineSearch, AiOutlineAppstore, AiOutlineBars, AiOutlineClose } from 'react-icons/ai';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['All', 'Fiction', 'Tech', 'Science', 'History'];

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    axios
      .get(`${config.API_URL}/books`, authConfig)
      .then((response) => {
        const enrichedData = response.data.data.map(book => ({
          ...book,
          category: getCategory(book._id)
        }));
        setBooks(enrichedData);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
        }
        setLoading(false);
      });
  }, [isAuthenticated, logout]);

  const getCategory = (id) => {
    const sum = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return CATEGORIES[1 + (sum % (CATEGORIES.length - 1))];
  };

  const filtered = books.filter(book => {
    const q = searchQuery.toLowerCase();
    const matchSearch = book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
    const matchCat = selectedCategory === 'All' || book.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 pb-20">
      {/* Brutalist Header */}
      <div className="bg-orange-500 border-b-2 border-slate-950 dark:border-zinc-50 py-8 sm:py-12 px-4">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            {isAuthenticated ? 'YOUR STASH' : 'OUR STASH'}
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-mono font-bold text-slate-950 dark:text-zinc-900 bg-white inline-block px-2 py-1 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {isAuthenticated
              ? 'MANAGE YOUR INTELLECTUAL PROPERTY.'
              : 'PUBLIC KNOWLEDGE.'}
          </p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 space-y-6 sm:space-y-8">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:gap-6 border-b-2 border-slate-950 dark:border-zinc-50 pb-6 sm:pb-8">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-950 dark:text-zinc-50 text-xl font-bold" />
            <input
              type="text"
              placeholder="SEARCH DATABASE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 text-slate-950 dark:text-zinc-50 font-mono text-sm pl-12 pr-10 py-3 placeholder:text-slate-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-4 focus:ring-orange-500/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-950 hover:text-orange-600">
                <AiOutlineClose className="text-lg" />
              </button>
            )}
          </div>

          {/* Filters + ITEMS count + view toggle in a row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Category chips — horizontally scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3 sm:px-4 py-1.5 text-xs font-mono font-bold uppercase border-2 border-slate-950 dark:border-zinc-50 transition-all ${selectedCategory === cat
                    ? 'bg-slate-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] transform -translate-y-1'
                    : 'bg-white text-slate-950 dark:bg-zinc-900 dark:text-zinc-50 hover:bg-orange-100 dark:hover:bg-zinc-800'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-950 dark:text-zinc-50 bg-white dark:bg-zinc-900 px-3 py-1 border-2 border-slate-950 dark:border-zinc-50">
                {filtered.length} ITEMS
              </span>

              <div className="flex gap-1 sm:gap-2">
                <button
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border-2 border-slate-950 dark:border-zinc-50 transition-all ${showType === 'table'
                    ? 'bg-slate-950 text-white dark:bg-zinc-50 dark:text-zinc-950'
                    : 'bg-white text-slate-950 dark:bg-zinc-900 dark:text-zinc-50 hover:bg-orange-100'
                    }`}
                  onClick={() => setShowType('table')}
                >
                  <AiOutlineBars className="text-lg sm:text-xl" />
                </button>
                <button
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border-2 border-slate-950 dark:border-zinc-50 transition-all ${showType === 'card'
                    ? 'bg-slate-950 text-white dark:bg-zinc-50 dark:text-zinc-950'
                    : 'bg-white text-slate-950 dark:bg-zinc-900 dark:text-zinc-50 hover:bg-orange-100'
                    }`}
                  onClick={() => setShowType('card')}
                >
                  <AiOutlineAppstore className="text-lg sm:text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SkeletonLoader count={8} />
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {showType === 'table' ? (
                <BooksTable books={filtered} />
              ) : (
                <BooksCard books={filtered} />
              )}
            </motion.div>
          ) : (
            <EmptyState
              key="empty"
              title="NO DATA FOUND"
              message="Query returned 0 results. Adjust filters or populate database."
              onAction={clearFilters}
              actionLabel="RESET FILTERS"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;