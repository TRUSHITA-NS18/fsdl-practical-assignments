import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-[#F8F9FC] text-[#1A1A2E] min-h-screen">
      <Navbar />

      {/* HEADER */}
      <section className="pt-32 pb-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-500">
          Reach out anytime.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 pb-20">

        {/* FORM */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">Send a Message</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 p-3 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 p-3 border rounded-lg"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full mb-4 p-3 border rounded-lg"
          />

          <button className="bg-[#6C63FF] text-white px-6 py-3 rounded-full">
            Send Message
          </button>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6 justify-center">
          
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-[#6C63FF]" />
            <span>support@financeconnect.com</span>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-[#00BFA6]" />
            <span>+91 7777777777</span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-[#6C63FF]" />
            <span>Pune, India</span>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}