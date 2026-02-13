import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineUser, HiOutlineCalendar } from 'react-icons/hi';
import { HiOutlinePhoto } from 'react-icons/hi2';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import config from '../config';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`${config.API_URL}/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setImageURL(res.data.imageURL || '');
        setLoading(false);
      })
      .catch(() => { setLoading(false); enqueueSnackbar('ERROR LOADING DATA', { variant: 'error' }); });
  }, [id, enqueueSnackbar]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);
    axios.post(`${config.API_URL}/books/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => { setImageURL(res.data.imageURL); setLoading(false); enqueueSnackbar('ASSET UPDATED', { variant: 'success' }); })
      .catch(() => { setLoading(false); enqueueSnackbar('UPLOAD FAILED', { variant: 'error' }); });
  };

  const handleSave = () => {
    setLoading(true);
    axios.put(`${config.API_URL}/books/${id}`, { title, author, publishYear, imageURL }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => { setLoading(false); enqueueSnackbar('RECORD OVERWRITTEN', { variant: 'success' }); navigate('/'); })
      .catch(() => { setLoading(false); enqueueSnackbar('UPDATE FAILED', { variant: 'error' }); });
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
          <div className="flex justify-between items-start border-b-2 border-slate-950 dark:border-zinc-50 pb-4 mb-8">
            <h1 className="text-4xl sm:text-5xl font-black uppercase">
              Modify<br />Record
            </h1>
            <span className="font-mono bg-slate-200 dark:bg-zinc-800 px-2 py-1 text-xs">ID: {id.slice(-6)}</span>
          </div>

          <div className="space-y-8">
            <Input label="Title Designation" icon={HiOutlineBookOpen} value={title} onChange={(e) => setTitle(e.target.value)} className="uppercase" />
            <Input label="Author Identity" icon={HiOutlineUser} value={author} onChange={(e) => setAuthor(e.target.value)} className="uppercase" />
            <Input label="Publish Year" icon={HiOutlineCalendar} type="number" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />

            <div className="space-y-2 font-mono">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-zinc-50">Visual Asset</label>
              {imageURL ? (
                <div className="relative border-2 border-slate-950 dark:border-zinc-50 p-2 bg-slate-100 dark:bg-zinc-800">
                  <img src={imageURL} alt="Preview" className="w-full h-48 object-cover border border-slate-950 dark:border-zinc-50 grayscale" />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="px-4 py-2 bg-white text-slate-950 font-bold uppercase border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                      Replace Asset
                    </span>
                    <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-950 dark:border-zinc-50 bg-slate-50 dark:bg-zinc-900 cursor-pointer hover:bg-orange-100 dark:hover:bg-zinc-800 transition-colors">
                  <HiOutlinePhoto className="text-4xl text-slate-950 dark:text-zinc-50 mb-2" />
                  <span className="text-sm font-bold uppercase">Click to Upload</span>
                  <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                </label>
              )}
            </div>

            <Button onClick={handleSave} loading={loading} className="w-full h-14 text-lg border-2 border-slate-950 bg-orange-500 text-white hover:bg-orange-600 hover:text-white">
              {loading ? 'SAVING DATA...' : 'SAVE CHANGES'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditBook;