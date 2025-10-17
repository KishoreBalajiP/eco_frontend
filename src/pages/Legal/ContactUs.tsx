export default function ContactUs() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Contact Us
      </h1>
      <p className="mb-6 text-gray-700 text-center leading-relaxed">
        We're here to help! Reach out for any questions related to orders, products, or policies.
      </p>

      <ContactSection title="Email Support">
        Email us at{" "}
        <a href="mailto:contactjayastores@gmail.com" className="text-blue-600 underline">
          contactjayastores@gmail.com
        </a>{" "}
        for any queries. Response time is typically 24–48 hours.
      </ContactSection>

      <ContactSection title="Phone Support">
        Call us at{" "}
        <a href="tel:+916381858714" className="text-blue-600 underline">
          +91 6381858714
        </a>{" "}
        from 10:00 AM to 6:00 PM IST, Monday to Saturday.
      </ContactSection>

      <ContactSection title="Address">
        Jaya Stores,<br />
        168/3 Bajanai Kovil Street, Theetalam,<br />
        Chengalpattu, TamilNadu, India - 603406
      </ContactSection>

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

interface ContactSectionProps {
  title: string;
  children: React.ReactNode;
}

const ContactSection: React.FC<ContactSectionProps> = ({ title, children }) => (
  <div className="mb-6 animate-fade-in">
    <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </div>
);
