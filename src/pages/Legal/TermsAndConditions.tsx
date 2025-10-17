export default function TermsAndConditions() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Terms & Conditions</h1>
      <p className="mb-4 text-gray-700 leading-relaxed">
        By accessing or using <span className="font-semibold">Jaya Stores</span>, you agree to the following terms and conditions. Please read them carefully before making a purchase.
      </p>

      <Section title="Account Responsibility">
        You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
      </Section>

      <Section title="Orders & Pricing">
        All orders are subject to product availability. Prices are subject to change without notice. We reserve the right to refuse or cancel orders at our discretion.
      </Section>

      <Section title="Payment">
        Payments must be made using approved methods at checkout. We ensure secure transactions through industry-standard encryption.
      </Section>

      <Section title="Prohibited Use">
        Users must not misuse the website, engage in fraudulent activities, or violate any applicable laws while using our platform.
      </Section>

      <Section title="Limitation of Liability">
        Jaya Stores is not liable for any indirect, incidental, or consequential damages arising from the use of the website or purchase of products.
      </Section>

      <Section title="Governing Law">
        These terms are governed by the laws of India. Any disputes arising will be subject to the exclusive jurisdiction of the courts in Chengalpattu, Tamil Nadu.
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
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </div>
);
