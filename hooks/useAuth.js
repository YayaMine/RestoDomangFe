import useSWR from 'swr';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    // Fetch the authenticated user
    const { data: user, error, mutate } = useSWR('/api/me', async () => {
        try {
            const response = await axios.get('/api/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401 && middleware === 'auth') {
                localStorage.removeItem('token');
                router.push('/');
            }
            throw error;
        }
    }, {
        revalidateOnFocus: false,
    });

    // Fetch CSRF token for validation
    const csrf = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
        } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
            throw error;
        }
    };

    // Create a new user
    const createUser = async ({ setErrors, ...data }) => {
        await csrf();
        setErrors([]);
        try {
            const response = await axios.post('/api/users', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('User creation failed:', error);
                throw error;
            }
        }
    };

    // Update an existing user
    const updateUser = async (id, { setErrors, ...data }) => {
        await csrf();
        setErrors([]);
        try {
            const response = await axios.put(`/api/users/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('User update failed:', error);
                throw error;
            }
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        } catch (error) {
            console.error('User deletion failed:', error);
            throw error;
        }
    };

    // Role-based middleware
    useSWR(
        user ? '/role-check' : null,
        () => {
            if (middleware) {
                if (!user) {
                    if (middleware === 'auth') {
                        router.push('/');
                    }
                } else {
                    if (middleware === 'admin' && user.role !== 'admin') {
                        router.push('/');
                    }
                    if (user.role === 'admin') {
                        router.push('/admin');
                    } else if (user.role === 'member') {
                        router.push('/');
                    }
                }
                if (redirectIfAuthenticated && user) {
                    router.push('/');
                }
            }
        },
        { revalidateOnFocus: false }
    );

    // Login function
    const login = async ({ setErrors, ...credentials }) => {
        await csrf();
        setErrors([]);
        try {
            const response = await axios.post('/api/login', credentials);
            localStorage.setItem('token', response.data.token);
            mutate();

            // Redirect based on role after login
            if (response.data.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Login failed:', error);
                throw error;
            }
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.post('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            localStorage.removeItem('token');
            mutate(null);
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    return {
        user,
        error,
        mutate,
        login,
        logout,
        createUser,
        updateUser,
        deleteUser,
    };
};
