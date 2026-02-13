import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BookModal from './BookModal';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

const BookSingleCard = ({ book, index = 0 }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className="group relative bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] hover:-translate-y-1 hover:z-10 transition-all duration-200"
      >
        {/* Cover - Compact aspect ratio */}
        <div className="w-full aspect-square overflow-hidden border-b-2 border-slate-950 dark:border-zinc-50 relative bg-slate-100 dark:bg-zinc-800">
          {book.imageURL ? (
            <img
              src={book.imageURL}
              alt={book.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <PiBookOpenTextLight className="text-slate-950 dark:text-zinc-50 text-6xl mb-4" />
              <span className="font-mono text-xs uppercase text-slate-500">No Cover Image</span>
            </div>
          )}

          {/* Year Badge - Absolute hard position */}
          <div className="absolute top-0 right-0">
            <div className="bg-slate-950 text-white dark:bg-zinc-50 dark:text-zinc-950 px-3 py-1 font-mono font-bold text-xs border-l-2 border-b-2 border-white dark:border-zinc-900">
              {book.publishYear}
            </div>
          </div>
        </div>

        {/* Info - High contrast */}
        <div className="p-4 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-black uppercase leading-none mb-2 text-slate-950 dark:text-zinc-50 line-clamp-2">
              {book.title}
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-0.5 bg-orange-500"></span>
              <p className="text-sm font-mono font-bold text-slate-600 dark:text-zinc-400 truncate uppercase">
                {book.author}
              </p>
            </div>
          </div>

          {/* Actions - Hard buttons */}
          <div className={`grid gap-2 pt-4 border-t-2 border-slate-950 dark:border-zinc-50/20 ${isAuthenticated ? 'grid-cols-4' : 'grid-cols-2'}`}>
            <button
              onClick={() => setShowModal(true)}
              className="col-span-1 flex items-center justify-center h-10 border-2 border-slate-950 dark:border-zinc-50 hover:bg-slate-950 hover:text-white dark:hover:bg-zinc-50 dark:hover:text-zinc-950 transition-colors"
              title="Quick View"
            >
              <BiShow className="text-lg" />
            </button>
            <Link
              to={`/books/details/${book._id}`}
              className="col-span-1 flex items-center justify-center h-10 border-2 border-slate-950 dark:border-zinc-50 hover:bg-slate-950 hover:text-white dark:hover:bg-zinc-50 dark:hover:text-zinc-950 transition-colors"
              title="Details"
            >
              <PiBookOpenTextLight className="text-lg" />
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to={`/books/edit/${book._id}`}
                  className="col-span-1 flex items-center justify-center h-10 border-2 border-slate-950 dark:border-zinc-50 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"
                  title="Edit"
                >
                  <AiOutlineEdit className="text-lg" />
                </Link>
                <Link
                  to={`/books/delete/${book._id}`}
                  className="col-span-1 flex items-center justify-center h-10 border-2 border-slate-950 dark:border-zinc-50 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                  title="Delete"
                >
                  <MdOutlineDelete className="text-lg" />
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default BookSingleCard;