import useSWR from 'swr';
import axios from '@/lib/axios';

export const useMenu = () => {
    // Fetch all menu data
    const { data: menus, error, mutate } = useSWR('/api/menus', async () => {
        const response = await axios.get('/api/menus', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data.data; // Pastikan akses ke `data` yang relevan
    });

    // Fetch a specific menu by ID
    const fetchMenuById = async (id) => {
        try {
            const response = await axios.get(`/api/menus/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.data;
        } catch (err) {
            console.error('Failed to fetch menu:', err);
            throw err;
        }
    };

    // Create a new menu with image upload
    const createMenu = async (formData) => {
        try {
            await axios.post('/api/menus', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            mutate(); // Refresh data after creation
        } catch (err) {
            console.error('Failed to create menu:', err.response?.data || err.message);
            throw err;
        }
    };

    // Update an existing menu with image upload
    const updateMenu = async (id, formData) => {
        try {
            await axios.post(`/api/menus/${id}?_method=PUT`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            mutate(); // Refresh data after update
        } catch (err) {
            console.error('Failed to update menu:', err.response?.data || err.message);
            throw err;
        }
    };

    // Delete a menu by ID
    const deleteMenu = async (id) => {
        try {
            await axios.delete(`/api/menus/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            mutate(); // Refresh data after deletion
        } catch (err) {
            console.error('Failed to delete menu:', err.response?.data || err.message);
            throw err;
        }
    };

    return {
        menus, // Data of all menus
        error, // Error state for fetching menu
        fetchMenuById, // Fetch a specific menu by ID
        createMenu, // Function to create new menu with image
        updateMenu, // Function to update existing menu with image
        deleteMenu, // Function to delete menu by ID
        mutate, // SWR mutate function for manual data revalidation
    };
};
