import useSWR from 'swr';
import axios from '@/lib/axios';

export const useMeja = () => {
    // Fetch all meja data
    const { data: meja, error, mutate } = useSWR('/api/meja', async () => {
        const response = await axios.get('/api/meja', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    });

    // Fetch a specific meja by ID
    const fetchMejaById = async (id) => {
        try {
            const response = await axios.get(`/api/meja/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (err) {
            console.error('Failed to fetch meja:', err);
            throw err;
        }
    };

    // Create a new meja
    const createMeja = async (data) => {
        try {
            await axios.post('/api/meja', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            mutate(); // Refresh data after creation
        } catch (err) {
            console.error('Failed to create meja:', err);
            throw err;
        }
    };

    // Update an existing meja by ID
    const updateMeja = async (id, data) => {
        try {
            await axios.put(`/api/meja/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            mutate(); // Refresh data after update
        } catch (err) {
            console.error('Failed to update meja:', err);
            throw err;
        }
    };

    // Delete a meja by ID
    const deleteMeja = async (id) => {
        try {
            await axios.delete(`/api/meja/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            mutate(); // Refresh data after deletion
        } catch (err) {
            console.error('Failed to delete meja:', err);
            throw err;
        }
    };

    return {
        meja,
        error,
        fetchMejaById,
        createMeja,
        updateMeja,
        deleteMeja,
        mutate,
    };
};
