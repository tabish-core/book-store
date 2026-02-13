import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { PiBookOpenTextLight } from 'react-icons/pi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import config from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${config.API_URL}/auth/login`, { email, password });
            login(response.data.token, { username: response.data.username });
            setLoading(false);
            enqueueSnackbar('ACCESS GRANTED', { variant: 'success' });
            navigate('/');
        } catch (error) {
            setLoading(false);
            enqueueSnackbar(error.response?.data?.message || 'ACCESS DENIED', { variant: 'error' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left — Solid Orange Panel */}
            <div className="w-full md:w-1/2 bg-orange-500 border-b-2 md:border-b-0 md:border-r-2 border-slate-950 p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden">
                <div className="z-10">
                    <div className="w-16 h-16 bg-slate-950 flex items-center justify-center border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-8">
                        <PiBookOpenTextLight className="text-4xl text-white" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8]">
                        Enter<br />The<br />System
                    </h1>
                </div>
                <p className="text-slate-950 font-mono font-bold text-sm sm:text-lg max-w-sm z-10 mt-6 sm:mt-8">
                    How did you end up here? :D
                </p>

                {/* Decorative Grid */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="border-r border-b border-slate-950" />
                    ))}
                </div>
            </div>

            {/* Right — Form */}
            <div className="w-full md:w-1/2 bg-white dark:bg-zinc-950 p-6 sm:p-12 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-black uppercase mb-2 text-slate-950 dark:text-zinc-50">Identity Verification</h2>
                    <p className="font-mono text-sm text-slate-500 dark:text-zinc-400 mb-10">PLEASE PROVIDE CREDENTIALS.</p>

                    <form onSubmit={handleLogin} className="space-y-6">
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
                            {loading ? 'AUTHENTICATING...' : 'INITIATE SESSION'}
                        </Button>
                    </form>

                    <div className="mt-12 pt-8 border-t-2 border-slate-950 dark:border-zinc-800 flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-slate-500 dark:text-zinc-500">NO ID FOUND?</span>
                        <Link to="/register">
                            <Button variant="outline" size="sm">REGISTER NEW USER</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
