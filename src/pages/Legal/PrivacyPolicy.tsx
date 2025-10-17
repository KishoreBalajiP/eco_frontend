export default function PrivacyPolicy() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Privacy Policy
      </h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        At Jaya Stores, your privacy is our top priority. This policy explains how we collect, use, and protect your personal information when you use our website and services.
      </p>

      <Section title="Information We Collect">
        <ul className="list-disc list-inside space-y-1">
          <li>Personal details such as name, email, phone number, and shipping address.</li>
          <li>Payment and transaction information.</li>
          <li>Order history and preferences.</li>
          <li>Data stored locally on your device via localStorage, such as cart items or session information.</li>
        </ul>
      </Section>

      <Section title="How We Use Your Information">
        Your information is used to process orders, improve our services, personalize your shopping experience, communicate promotional offers (with consent), and provide customer support.
      </Section>

      <Section title="Data Sharing">
        We do not sell your personal data. Data may be shared with shipping partners, payment processors, or for legal compliance purposes only.
      </Section>

      <Section title="Your Rights">
        You can request access, correction, or deletion of your personal information by contacting us via our Contact Us page.
      </Section>

      <Section title="Local Storage & Client-side Data">
        We store certain information on your device using localStorage to provide a seamless shopping experience. This includes items in your cart, session information, and user preferences. This data is only accessible to your browser and not shared with third parties.
      </Section>

      <Section title="Data Security">
        We implement reasonable technical and administrative measures to protect your data against unauthorized access, disclosure, or misuse.
      </Section>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.8s ease-out; }
        `}
      </style>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
    <div className="text-gray-700 leading-relaxed">{children}</div>
  </div>
);
