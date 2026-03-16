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

                    <h2 className="text-3xl sm:text-4xl font-black uppercase mb-2 text-slate-950 dark:text-zinc-50">New User</h2>

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
            <div className="w-full md:w-1/2 bg-slate-950 text-white border-b-2 md:border-b-0 md:border-l-2 border-slate-950 p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden order-1 md:order-2">
                <div className="z-10 text-right">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8]">
                        Join<br />The<br />Grid
                    </h1>
                </div>
                <div className="z-10 mt-8 text-right">
                    <div className="inline-block border-2 border-white p-4">
                        <PiBookOpenTextLight className="text-6xl text-white" />
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[20px] border-orange-500 rounded-full opacity-50" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20" />
            </div>
        </div>
    );
};

export default Register;
