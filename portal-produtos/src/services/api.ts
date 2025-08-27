import axios from 'axios';

const baseURL = (() => {
    if (typeof window !== 'undefined') {
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:5150/api';
        }
        return '/api';
    }
    return '/api';
})();

export const api = axios.create({
    baseURL,
});


