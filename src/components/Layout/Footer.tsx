export default function Footer() {
  return (
    <footer className="bg-gray-900/70 text-white w-full fixed bottom-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-1 md:mb-0 text-center md:text-left">
          &copy; 2025 Jaya Stores. All rights reserved.
        </div>

        <div className="flex flex-wrap justify-center md:justify-end space-x-4">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/shipping-policy" className="hover:underline">Shipping & Delivery</a>
          <a href="/refund-policy" className="hover:underline">Returns & Refund</a>
          <a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a>
          <a href="/contact-us" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
