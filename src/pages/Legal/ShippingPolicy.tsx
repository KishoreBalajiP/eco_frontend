export default function ShippingPolicy() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Shipping & Delivery Policy
      </h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        Jaya Stores ensures fast, reliable, and trackable shipping for all orders. This page explains our shipping methods, delivery times, and related policies.
      </p>

      <Section title="Delivery Locations">
        We currently deliver to the following areas only: <strong>Theetalam, L.Endathur, and Uthiramerur</strong>. For other locations, please contact our support team for assistance.
      </Section>

      <Section title="Processing Time">
        Orders are processed within 1–2 business days after confirmation. You will receive an email with tracking details once the order is shipped.
      </Section>

      <Section title="Delivery Timeframe">
        Standard delivery usually takes <strong>0–7 business days</strong> depending on the shipping location. Expedited delivery options are available at checkout.
      </Section>

      <Section title="Shipping Charges">
        Shipping charges: Free standard shipping is available for all orders.
      </Section>

      <Section title="Order Tracking">
        After shipment, you will receive a tracking number to monitor your package in real time via the carrier’s website.
      </Section>

      <Section title="Late Delivery">
        In the rare event of delayed delivery, we will notify you via email or phone and take steps to resolve the issue promptly.
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
