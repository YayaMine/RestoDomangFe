import useSWR from 'swr';
import axios from '@/lib/axios';

export const useMidtrans = () => {
    // Fetch all payments
    const { data: payments, error: paymentsError, mutate: mutatePayments } = useSWR(
        '/api/payments',
        async () => {
            try {
                const response = await axios.get('/api/payments', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                return response.data.data; // Assuming the API returns data inside a `data` key
            } catch (error) {
                console.error('Failed to fetch payments:', error);
                throw error;
            }
        },
        { revalidateOnFocus: false }
    );

    // Fetch CSRF token for validation
    const csrf = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
        } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
            throw error;
        }
    };

    // Create a new payment (generate Snap Token for reservation transaction)
    const createTransaction = async (transactionData) => {
        await csrf();
        try {
            const response = await axios.post('/api/reservasi/transaction', transactionData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data; // Return transaction data (e.g., Snap token or success message)
        } catch (error) {
            console.error('Transaction creation failed:', error);
            throw error.response?.data || error.message;
        }
    };

    // Handle notification callback from Midtrans
    const handleNotification = async (notificationData) => {
        await csrf();
        try {
            const response = await axios.post('/api/payments/notification', notificationData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            mutatePayments(); // Refresh payment data
            return response.data; // Return success message or relevant data
        } catch (error) {
            console.error('Notification handling failed:', error);
            throw error.response?.data || error.message;
        }
    };

    // Get payment status by order ID
    const getPaymentStatus = async (orderId) => {
        try {
            const response = await axios.get(`/api/payments/status/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data; // Return payment status details
        } catch (error) {
            console.error('Failed to fetch payment status:', error);
            throw error.response?.data || error.message;
        }
    };

    return {
        payments: payments || [], // All payments data
        paymentsError, // Error for payments
        mutatePayments, // Refresh payments
        createTransaction, // Create a transaction for a reservation
        handleNotification, // Handle Midtrans notification
        getPaymentStatus, // Get payment status by order ID
    };
};
