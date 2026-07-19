import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import Footer from "../components/Footer";
import hero from "../assets/images/hero.png";
import {
  FaUserTie,
  FaUser,
  FaRobot,
  FaLink,
  FaChartLine,
} from "react-icons/fa";

export default function Landing() {
  const navigate = useNavigate();

  // scroll reference
  const heroRef = useRef(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#F8F9FC] text-[#1A1A2E] min-h-screen">

      {/* ================= HERO ================= */}
      <section
        id="hero-section"
        ref={heroRef}
        className="mx-auto max-w-7xl px-6 pt-28 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
              Empowering Women Entrepreneurs <br />
              with{" "}
              <span className="text-[#6C63FF]">
                Smart Financial Guidance
              </span>
            </h1>

            <p className="text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
              Connect with trusted financial advisors using AI-powered matching 
              based on your startup stage, challenges, and goals.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              
              <button
                onClick={() => navigate("/auth?role=entrepreneur")}
                className="bg-[#6C63FF] text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition-all duration-300"
              >
                Join as Entrepreneur
              </button>

              <button
                onClick={() => navigate("/auth?role=advisor")}
                className="bg-[#00BFA6] text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition-all duration-300"
              >
                Join as Advisor
              </button>

            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={hero}
              alt="Finance Connect"
              className="w-full max-w-md drop-shadow-xl"
            />
          </motion.div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-4">
              How Finance Connect Works
            </h2>
            <div className="h-1 w-16 bg-[#6C63FF] mx-auto mb-12 rounded"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Profile",
                icon: <FaUser />,
                text: "Tell us about your startup, stage, and financial challenges.",
              },
              {
                title: "AI Matching",
                icon: <FaRobot />,
                text: "Our AI matches you with relevant advisors.",
              },
              {
                title: "Connect & Grow",
                icon: <FaLink />,
                text: "Connect with advisors and grow your business.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-[#F8F9FC] p-8 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-4xl text-[#6C63FF] mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          
          <div className="bg-white p-6 rounded-xl shadow">
            <FaChartLine className="text-3xl text-[#00BFA6] mb-3 mx-auto" />
            <h3 className="font-bold">60% struggle</h3>
            <p className="text-gray-500 text-sm">
              Women entrepreneurs face financial guidance gaps.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FaUserTie className="text-3xl text-[#00BFA6] mb-3 mx-auto" />
            <h3 className="font-bold">Expert Advisors</h3>
            <p className="text-gray-500 text-sm">
              Connect with verified financial experts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <FaRobot className="text-3xl text-[#00BFA6] mb-3 mx-auto" />
            <h3 className="font-bold">AI Matching</h3>
            <p className="text-gray-500 text-sm">
              Smart matching using your needs.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-[#1A1A2E] text-white text-center py-16 rounded-3xl">
          
          <h2 className="text-3xl font-bold mb-4">
            Start Your Startup Journey Today
          </h2>

          <p className="text-gray-300 mb-6">
            Get the right financial guidance at the right time.
          </p>

          <button
            onClick={scrollToHero}
            className="bg-white text-[#1A1A2E] px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Started
          </button>

        </div>
      </section>

      <Footer />
    </div>
  );
}