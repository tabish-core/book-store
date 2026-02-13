const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5555';
const config = {
    API_URL: apiUrl.replace(/\/$/, ''),
};

export default config;
