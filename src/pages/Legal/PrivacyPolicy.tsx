export default function PrivacyPolicy() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        At Jaya Stores, your privacy is our top priority. This policy explains how we collect, use, and protect your personal information when you use our website and services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Personal details such as name, email, phone number, and shipping address.</li>
        <li>Payment and transaction information.</li>
        <li>Order history and preferences.</li>
        <li>Data stored locally on your device via localStorage, such as cart items or session information.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">How We Use Your Information</h2>
      <p className="mb-4 text-gray-700">
        Your information is used to process orders, improve our services, personalize your shopping experience, communicate promotional offers (with consent), and provide customer support.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Data Sharing</h2>
      <p className="mb-4 text-gray-700">
        We do not sell your personal data. Data may be shared with shipping partners, payment processors, or for legal compliance purposes only.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Your Rights</h2>
      <p className="mb-4 text-gray-700">
        You can request access, correction, or deletion of your personal information by contacting us via our Contact Us page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Local Storage & Client-side Data</h2>
      <p className="mb-4 text-gray-700">
        We store certain information on your device using localStorage to provide a seamless shopping experience. This includes items in your cart, session information, and user preferences. This data is only accessible to your browser and not shared with third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Data Security</h2>
      <p className="mb-4 text-gray-700">
        We implement reasonable technical and administrative measures to protect your data against unauthorized access, disclosure, or misuse.
      </p>
    </div>
  );
}
