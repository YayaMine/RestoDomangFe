import useSWR from "swr";
import axios from "@/lib/axios";
import Swal from "sweetalert2";

export const useReservasi = () => {
  // Fetch all reservations
  const { data: reservasiData, error: reservasiError, mutate: mutateReservasi } = useSWR(
    "/api/reservasi",
    async () => {
      const response = await axios.get("/api/reservasi");
      return response.data;
    },
    { revalidateOnFocus: false }
  );

  // Fetch all tables
  const { data: mejaData, error: mejaError, mutate: mutateMeja } = useSWR(
    "/api/meja",
    async () => {
      const response = await axios.get("/api/meja");
      return response.data.data.map((table) => ({
        id: table.id,
        nomorMeja: table.nomor_meja,
        jumlahOrang: table.jumlah_orang,
      }));
    },
    { revalidateOnFocus: false }
  );

  // Fetch available tables dynamically based on jumlah_orang
  const fetchAvailableTables = async (jumlahOrang) => {
    try {
      const response = await axios.post("/api/reservasi/available-tables", {
        jumlah_orang: jumlahOrang,
      });
      return response.data.data.map((table) => ({
        id: table.id,
        nomorMeja: table.nomor_meja,
        jumlahOrang: table.jumlah_orang,
      }));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch available tables",
      });
      throw error.response?.data || error.message;
    }
  };

  // Fetch CSRF token
  const csrf = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch CSRF token",
      });
      throw error;
    }
  };

  // Create a new reservation with Midtrans payment
  const createReservasiWithPayment = async (formData) => {
    await csrf();
    try {
      const response = await axios.post("/api/reservasi/create", formData);

      // Handle Midtrans Snap token
      const snapToken = response.data.snap_token;

      if (!window.snap) {
        throw new Error("Midtrans Snap.js is not loaded");
      }

      // Return Snap Token for further use
      return snapToken;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create reservation",
      });
      throw error.response?.data || error.message;
    }
  };

  // Delete a reservation
  const deleteReservasi = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/reservasi/${id}`);
          mutateReservasi(); // Refresh reservation list
          Swal.fire("Deleted!", "Your reservation has been deleted.", "success");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response?.data?.message || "Failed to delete reservation",
          });
          throw error.response?.data || error.message;
        }
      }
    });
  };

  return {
    reservasi: reservasiData?.data || [], // All reservations
    meja: mejaData || [], // All tables with nomorMeja and jumlahOrang
    fetchAvailableTables, // Fetch available tables by jumlah_orang
    createReservasiWithPayment, // Create reservation and return Snap Token
    deleteReservasi, // Delete a reservation
    reservasiError, // Error for reservations
    mejaError, // Error for tables
    mutateMeja, // Refresh table data
    mutateReservasi, // Refresh reservation data
  };
};
