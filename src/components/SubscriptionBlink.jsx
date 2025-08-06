// components/SubscriptionPromo.jsx
import React from "react";
import { Link } from "react-router-dom";

const SubscriptionBlink = () => {
  return (
    <section className="px-6 py-10 bg-blue-100 border-y border-blue-300 shadow-inner">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
          🚀 Unlock Full Access
        </h2>
        <p className="text-gray-700 mb-4">
          Subscribe to post projects, apply to work, and engage with the community.
        </p>
        <Link
          to="/subscribe"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300"
        >
          Subscribe Now
        </Link>
      </div>
    </section>
  );
};

export default SubscriptionBlink;
