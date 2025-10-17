export default function RefundPolicy() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-gray-50 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Returns & Refund Policy
      </h1>

      <p className="mb-4 text-gray-700 leading-relaxed">
        Jaya Stores is committed to customer satisfaction. If you are not satisfied with your purchase, please follow the steps below:
      </p>

      <Section title="Return Eligibility">
        <ul className="list-disc list-inside space-y-1">
          <li>Items must be returned within 7 days of delivery.</li>
          <li>Products should be unused, in original packaging, and in resalable condition.</li>
          <li>Non-returnable items: Perishable goods (milk, fresh dairy), opened hygiene items (toothpaste, toothbrush, etc.).</li>
        </ul>
      </Section>

      <Section title="Return Process">
        Send an email to our support team with your order ID and reason for return. Our team will review your request and provide instructions to collect the item.
      </Section>

      <Section title="Refund Processing">
        Once the returned item is received and inspected, refunds will be processed within 5–7 business days to the original payment method.
      </Section>

      <Section title="Exchanges">
        Exchanges are allowed if the requested item is in stock. Contact support for assistance.
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
