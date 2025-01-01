import useSWR from 'swr';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    // Fetch the authenticated user
    const { data: user, error, mutate } = useSWR('/api/me', () =>
        axios
            .get('/api/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Sertakan token dari localStorage
                },
            })
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 401) {
                    if (middleware === 'auth') {
                        localStorage.removeItem('token'); // Hapus token jika tidak valid
                        router.push('/'); // Redirect ke halaman login
                    }
                }
                throw error;
            })
    );

    // Ambil CSRF token untuk validasi permintaan
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    // Middleware berbasis role
    useSWR('/role-check', () => {
        if (middleware) {
            if (middleware === 'auth' && !user) {
                router.push('/');
            } else if (middleware === 'admin' && user && user.role !== 'admin') {
                router.push('/admin'); // Redirect jika bukan admin
            } else if (redirectIfAuthenticated && user) {
                router.push('/'); // Redirect jika sudah login dan middleware guest
            }
        }
    });

    // Fungsi untuk login user
    const login = async ({ setErrors, ...props }) => {
        await csrf();

        setErrors([]);

        return axios
            .post('/api/login', props)
            .then((response) => {
                localStorage.setItem('token', response.data.token); // Simpan token di localStorage
                mutate(); // Perbarui state user
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    throw error;
                }
            });
    };

    // Fungsi untuk logout user
    const logout = async () => {
        return axios
            .post(
                '/api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Sertakan token
                    },
                }
            )
            .then(() => {
                localStorage.removeItem('token'); // Hapus token dari localStorage
                mutate(null); // Clear state user
                router.push('/'); // Redirect ke halaman login
            })
            .catch((error) => {
                throw error;
            });
    };

    return {
        user, // Data user yang sedang login
        login, // Fungsi untuk login user
        logout, // Fungsi untuk logout user
    };
};
