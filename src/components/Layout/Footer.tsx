import { motion } from 'framer-motion';
export default function Footer() {
  return (
    <motion.footer
      className="bg-gray-900/70 text-white w-full fixed bottom-0 left-0 z-50 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-1 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()} Jaya Stores. All rights reserved.
        </div>

        <div className="flex flex-wrap justify-center md:justify-end space-x-4">
          <a href="/privacy-policy" className="hover:underline transition-colors duration-200">Privacy Policy</a>
          <a href="/shipping-policy" className="hover:underline transition-colors duration-200">Shipping & Delivery</a>
          <a href="/refund-policy" className="hover:underline transition-colors duration-200">Returns & Refund</a>
          <a href="/terms-and-conditions" className="hover:underline transition-colors duration-200">Terms & Conditions</a>
          <a href="/contact-us" className="hover:underline transition-colors duration-200">Contact Us</a>
        </div>
      </div>
    </motion.footer>
  );
}
