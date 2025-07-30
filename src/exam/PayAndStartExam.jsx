import React, { useEffect } from "react";

const PayAndStartExam = ({ onSuccess }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleRazorpay = () => {
    const options = {
      key: "rzp_live_9XF4SqNGyOB0E6", // ✅ Your Test Key
      amount: 100, // ₹100 in paise
      currency: "INR",
      name: "Acadup",
      description: "Developer Exam Fee",
      handler: function (response) {
        alert("✅ Payment successful!");
        onSuccess();
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold mb-4">Pay ₹100 to Start the Exam</h2>
      <button
        onClick={handleRazorpay}
        className="bg-green-600 text-white px-6 py-2 rounded shadow"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PayAndStartExam;
