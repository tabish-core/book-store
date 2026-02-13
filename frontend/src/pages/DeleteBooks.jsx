import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import Button from '../components/ui/Button';

import config from '../config';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setLoading(true);
    axios.delete(`${config.API_URL}/books/${id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => { setLoading(false); enqueueSnackbar('TERMINATION COMPLETE', { variant: 'success' }); navigate('/'); })
      .catch(() => { setLoading(false); enqueueSnackbar('TERMINATION FAILED', { variant: 'error' }); });
  };

  return (
    <div className="min-h-screen bg-red-50 dark:bg-zinc-950 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-900 border-4 border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] p-8 text-center"
        >
          <div className="w-20 h-20 bg-red-600 text-white mx-auto flex items-center justify-center border-2 border-slate-950 mb-6">
            <HiOutlineExclamationTriangle className="text-5xl" />
          </div>

          <h1 className="text-4xl font-black uppercase text-red-600 mb-2">Warning</h1>
          <p className="font-mono text-sm font-bold text-slate-950 dark:text-zinc-50 mb-8">
            YOU ARE ABOUT TO PERMANENTLY ERASE THIS RECORD. THIS ACTION IS IRREVERSIBLE.
          </p>

          <div className="flex flex-col gap-3">
            <Button onClick={handleDelete} loading={loading} className="w-full h-14 bg-red-600 text-white border-2 border-slate-950 hover:bg-red-700 hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {loading ? 'ERASING...' : 'CONFIRM TERMINATION'}
            </Button>
            <Button variant="outline" className="w-full h-12" onClick={() => navigate(-1)}>
              ABORT OPERATION
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeleteBook;