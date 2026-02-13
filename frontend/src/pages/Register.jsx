import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { PiBookOpenTextLight } from 'react-icons/pi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import config from '../config';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${config.API_URL}/auth/register`, { username, email, password });
            setLoading(false);
            enqueueSnackbar('ENTITY CREATED', { variant: 'success' });
            navigate('/login');
        } catch (error) {
            setLoading(false);
            enqueueSnackbar(error.response?.data?.message || 'CREATION FAILED', { variant: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left — Form */}
            <div className="w-full md:w-1/2 bg-white dark:bg-zinc-950 p-6 sm:p-12 flex flex-col justify-center order-2 md:order-1">
                <div className="max-w-md w-full mx-auto">
                    <Link to="/" className="mb-12 block">
                        <span className="font-mono font-bold text-orange-500 hover:underline">← BACK TO TERMINAL</span>
                    </Link>

                    <h2 className="text-3xl sm:text-4xl font-black uppercase mb-2 text-slate-950 dark:text-zinc-50">New Entity</h2>
                    <p className="font-mono text-sm text-slate-500 dark:text-zinc-400 mb-10">INITIALIZE DATABASE RECORD.</p>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <Input
                            label="Username ID"
                            icon={HiOutlineUser}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="CODENAME"
                            required
                            className="uppercase"
                        />
                        <Input
                            label="Email Address"
                            icon={HiOutlineMail}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="USER@DOMAIN.COM"
                            required
                            className="uppercase"
                        />
                        <Input
                            label="Password Key"
                            icon={HiOutlineLockClosed}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        <Button type="submit" loading={loading} className="w-full h-14 text-lg">
                            {loading ? 'PROCESSING...' : 'INITIALIZE ENTITY'}
                        </Button>
                    </form>

                    <div className="mt-12 pt-8 border-t-2 border-slate-950 dark:border-zinc-800 flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-slate-500 dark:text-zinc-500">ALREADY REGISTERED?</span>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">ACCESS LOGIN</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right — Solid Black Panel */}
            <div className="w-full md:w-1/2 bg-slate-950 text-white border-b-2 md:border-b-0 md:border-l-2 border-orange-500 p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden order-1 md:order-2">
                <div className="z-10">
                    <div className="w-16 h-16 bg-orange-500 flex items-center justify-center border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-8">
                        <PiBookOpenTextLight className="text-4xl text-white" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8]">
                        Join<br />The<br />Grid
                    </h1>
                </div>
                <p className="text-orange-500 font-mono font-bold text-sm sm:text-lg max-w-sm z-10 mt-6 sm:mt-8">
                    Create your account and start building your library.
                </p>

                {/* Decorative Grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="border-r border-b border-white" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Register;
