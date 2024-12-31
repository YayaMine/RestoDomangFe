import axios from '@/lib/axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export const useRegister = () => {
    const [errors, setErrors] = useState([]); // State untuk menyimpan error
    const router = useRouter();

    const csrf = async () => {
        await axios.get('/sanctum/csrf-cookie'); // Ambil CSRF token jika menggunakan Sanctum
    };

    const register = async ({ name, email, password, password_confirmation }) => {
        await csrf(); // Pastikan CSRF token tersedia

        setErrors([]); // Reset error state

        return axios
            .post('/api/register', {
                name,
                email,
                password,
                password_confirmation,
            })
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registrasi Berhasil!',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                });

                router.push('/'); // Redirect ke halaman utama setelah berhasil
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors); // Tangani error validasi
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Registrasi Gagal!',
                        text: error.response?.data?.message || 'Terjadi kesalahan.',
                    });
                }

                throw error;
            });
    };

    return {
        register, // Fungsi untuk melakukan registrasi
        errors, // Error state untuk ditampilkan di UI
    };
};
