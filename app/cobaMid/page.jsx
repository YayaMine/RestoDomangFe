"use client"; // Pastikan ini ada di bagian paling atas file

import React, { useState } from "react";
import { useMidtrans } from "@/hooks/useMidtrans";

const PaymentPage = () => {
  const { createPayment } = useMidtrans();
  const [snapToken, setSnapToken] = useState(null);

  const handleCreatePayment = async () => {
    const paymentData = {
      order_id: `ORDER-${Date.now()}`,
      gross_amount: 150000,
      items: [
        { id: "item1", price: 50000, quantity: 1, name: "Product 1" },
        { id: "item2", price: 100000, quantity: 1, name: "Product 2" },
      ],
      customer_details: {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@mail.com",
        phone: "08123456789",
      },
    };

    try {
      const response = await createPayment(paymentData);
      setSnapToken(response.snap_token);
    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={handleCreatePayment}>Create Payment</button>
      {snapToken && (
        <div>
          <h2>Snap Token</h2>
          <p>{snapToken}</p>
          <button
            onClick={() => {
              window.snap.pay(snapToken, {
                onSuccess: (result) => console.log("Success:", result),
                onPending: (result) => console.log("Pending:", result),
                onError: (result) => console.log("Error:", result),
                onClose: () => console.log("Payment popup closed"),
              });
            }}
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
