import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { motion } from 'framer-motion';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import config from '../config';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios.get(`${config.API_URL}/books/${id}`)
      .then((res) => { setBook(res.data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-zinc-950">
        <div className="w-8 h-8 border-4 border-slate-950 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <BackButton />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-col md:flex-row bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]"
        >
          {/* Cover - Raw */}
          <div className="w-full md:w-1/2 border-b-2 md:border-b-0 md:border-r-2 border-slate-950 dark:border-zinc-50 bg-slate-200 dark:bg-zinc-800 p-8 flex items-center justify-center">
            {book.imageURL ? (
              <img src={book.imageURL} alt={book.title} className="w-full h-auto object-cover border-2 border-slate-950 dark:border-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
            ) : (
              <div className="text-4xl font-black text-slate-300 dark:text-zinc-700 uppercase">No Visual</div>
            )}
          </div>

          {/* Info - Typography */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <Badge className="text-lg px-4 py-1">YEAR: {book.publishYear}</Badge>
                <span className="font-mono text-xs text-slate-500 dark:text-zinc-400">ID: {book._id}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.85] mb-6 text-slate-950 dark:text-zinc-50">
                {book.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <BiUserCircle className="text-4xl text-slate-950 dark:text-zinc-50" />
                <div>
                  <span className="block text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase">Authored By</span>
                  <span className="text-xl font-bold uppercase tracking-tight">{book.author}</span>
                </div>
              </div>

              <div className="p-6 bg-orange-50 dark:bg-zinc-800 border-2 border-slate-950 dark:border-zinc-50">
                <p className="font-mono text-sm leading-relaxed text-slate-800 dark:text-zinc-300">
                  SYSTEM NOTE: This record is finalized. Any modifications require administrative privileges.
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t-2 border-slate-950 dark:border-zinc-50">
                <Link to={`/books/edit/${book._id}`}>
                  <Button variant="outline" className="w-full h-12 text-base border-2 hover:bg-slate-950 hover:text-white">
                    <AiOutlineEdit className="text-xl mr-2" />
                    EDIT
                  </Button>
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <Button variant="destructive" className="w-full h-12 text-base border-2">
                    <MdOutlineDelete className="text-xl mr-2" />
                    DELETE
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShowBook;