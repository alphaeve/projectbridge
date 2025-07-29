import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        At AcadUp, we respect your privacy. This Privacy Policy explains what information we collect and how we use it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        <li>Personal details (name, email, etc.) when you register or contact us</li>
        <li>Usage data such as pages visited, features used, etc.</li>
        <li>Cookies to improve your browsing experience</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-5 text-gray-700 space-y-1">
        <li>To provide and improve our services</li>
        <li>To communicate updates and offers</li>
        <li>To ensure platform security and prevent fraud</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Third-Party Services</h2>
      <p className="text-gray-700 mb-4">
        We may use third-party services like Google Analytics or AdSense which may collect anonymized data via cookies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <p className="text-gray-700 mb-4">
        You can request access, correction, or deletion of your data by contacting us via the Contact page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to this Policy</h2>
      <p className="text-gray-700">
        We may update this policy. Check this page regularly for updates. Your continued use of the site means you accept any changes.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
