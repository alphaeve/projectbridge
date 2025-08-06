import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Subscribe = () => {
  const { user } = useAuth();

  const loadRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_live_9XF4SqNGyOB0E6", // Replace with your Razorpay Key ID
      amount: 29900, // ₹299 in paisa
      currency: "INR",
      name: "Acadup",
      description: "3-Month Subscription",
      handler: async function (response) {
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 90);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          subscribed: true,
          subscriptionStart: start.toISOString(),
          subscriptionEnd: end.toISOString(),
        });

        alert("🎉 Subscription successful! Please reload the site to unlock all features.");
      },
      prefill: {
        email: user.email,
        name: user.username || "User",
      },
      theme: {
        color: "#1DA1F2",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 border border-blue-200 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2">Unlock Full Access</h1>
        <p className="text-gray-600 mb-6">Subscribe now and enjoy premium features for 3 months.</p>

        <div className="bg-blue-100 p-4 rounded-xl mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">What You Get:</h2>
          <ul className="text-sm text-blue-900 space-y-2 text-left">
            <li>✅ Post unlimited project ideas</li>
            <li>✅ Apply to real-world developer tasks</li>
            <li>✅ In-app messaging & collaboration</li>
            <li>✅ Get featured on homepage</li>
            <li>✅ Access to exclusive contests</li>
            <li>✅ Detailed analytics & insights</li>
          </ul>
        </div>

        <div className="mb-4">
  <p className="text-lg text-red-700 line-through">₹599</p>
  <p className="text-2xl font-bold text-green-600">Now ₹299 / 3 Months</p>
</div>


        <button
          onClick={loadRazorpay}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-sm font-bold shadow-md transition transform hover:scale-105"
        >
          🔐 Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
