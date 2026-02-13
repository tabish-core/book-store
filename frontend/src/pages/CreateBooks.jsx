import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineUser, HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlinePhoto } from 'react-icons/hi2';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import config from '../config';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    axios.post(`${config.API_URL}/books/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => { setImageURL(res.data.imageURL); setLoading(false); enqueueSnackbar('IMAGE UPLOADED LOUD AND CLEAR', { variant: 'success' }); })
      .catch(() => { setLoading(false); enqueueSnackbar('UPLOAD FAILED', { variant: 'error' }); });
  };

  const handleSave = () => {
    setLoading(true);
    axios.post(`${config.API_URL}/books`, { title, author, publishYear, imageURL }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => { setLoading(false); enqueueSnackbar('DATABASE RECORD CREATED', { variant: 'success' }); navigate('/'); })
      .catch(() => { setLoading(false); enqueueSnackbar('CREATION FAILED', { variant: 'error' }); });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <BackButton />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 bg-white dark:bg-zinc-900 border-2 border-slate-950 dark:border-zinc-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-8 sm:p-12"
        >
          <h1 className="text-4xl sm:text-5xl font-black uppercase mb-8 border-b-2 border-slate-950 dark:border-zinc-50 pb-4">
            Initialize<br />New Item
          </h1>

          <div className="space-y-8">
            <Input label="Title Designation" icon={HiOutlineBookOpen} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ENTER TITLE" className="uppercase" />
            <Input label="Author Identity" icon={HiOutlineUser} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="ENTER AUTHOR" className="uppercase" />
            <Input label="Publish Year" icon={HiOutlineCalendar} type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} placeholder="YYYY" />

            {/* Brutalist Image Upload */}
            <div className="space-y-2 font-mono">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-zinc-50">Visual Asset</label>
              {imageURL ? (
                <div className="relative border-2 border-slate-950 dark:border-zinc-50 p-2 bg-slate-100 dark:bg-zinc-800">
                  <img src={imageURL} alt="Preview" className="w-full h-48 object-cover border border-slate-950 dark:border-zinc-50 grayscale hover:grayscale-0 transition-all" />
                  <button
                    onClick={() => setImageURL('')}
                    className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-xs font-bold border-2 border-slate-950 hover:bg-red-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    DELETE ASSET
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-950 dark:border-zinc-50 bg-slate-50 dark:bg-zinc-900 cursor-pointer hover:bg-orange-100 dark:hover:bg-zinc-800 transition-colors">
                  <HiOutlinePhoto className="text-4xl text-slate-950 dark:text-zinc-50 mb-2" />
                  <span className="text-sm font-bold uppercase">Click to Upload</span>
                  <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                </label>
              )}
            </div>

            <Button onClick={handleSave} loading={loading} className="w-full h-14 text-lg border-2 border-slate-950 bg-slate-950 text-white hover:bg-orange-500 hover:text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-orange-500 dark:hover:text-white">
              {loading ? 'WRITING TO DISC...' : 'COMMIT RECORD'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBooks;