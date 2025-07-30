// File: /pages/CancelRefund.jsx
import React from "react";

const CancelRefund = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Cancellations & Refunds
      </h1>

      <p className="mb-4">
        At <strong>AcadUp</strong>, we aim to deliver fair, transparent services for all users. Please read the following policies regarding cancellations and refunds for exams, subscriptions, and services.
      </p>

      <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-2">🧾 Exam Payments</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>All exam fees are non-refundable once payment is successfully completed.</li>
        <li>We do not offer refunds for missed or incomplete exams.</li>
        <li>In case of technical issues on our end, we may reschedule your exam at no extra cost.</li>
      </ul>

      <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-2">📦 Project Posting & Services</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Clients may cancel a posted project before a developer is assigned. No refund is applicable after collaboration begins.</li>
        <li>All disputes must be reported within 7 days of project start. Contact us at <a href="mailto:support@acadup.site" className="text-blue-500 underline">support@acadup.site</a>.</li>
      </ul>

      <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-2">🔁 Refund Exceptions</h2>
      <p className="mb-4">
        Refunds are granted only under special conditions such as:
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>Double payment due to technical error (with proof).</li>
        <li>Service not delivered and verified by our team.</li>
      </ul>

      <p className="mt-6 text-gray-600 text-sm">
        ⚠️ We reserve the right to update our refund policies at any time. Users will be notified on our website for any significant changes.
      </p>
    </div>
  );
};

export default CancelRefund;
