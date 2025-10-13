export default function ContactUs() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h1>
      <p className="mb-4 text-gray-700">
        We’re here to help! Reach out for any questions related to orders, products, or policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Email Support</h2>
      <p className="mb-4 text-gray-700">
        Email us at{" "}
        <a href="mailto:support@jayastores.com" className="text-blue-600 underline">
          contactjayastores.gmail.com
        </a>{" "}
        for any queries. Response time is typically 24–48 hours.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Phone Support</h2>
      <p className="mb-4 text-gray-700">
        Call us at{" "}
        <a href="tel:+916381858714" className="text-blue-600 underline">
          +91 6381858714
        </a>{" "}
        from 10:00 AM to 6:00 PM IST, Monday to Saturday.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Address</h2>
      <p className="mb-4 text-gray-700">
        Jaya Stores,<br />
        168/3 Bajanai Kovil Street, Theetalam,<br />
        Chengalpattu, TamilNadu, India – 603406
      </p>
    </div>
  );
}
