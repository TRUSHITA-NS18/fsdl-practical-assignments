import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import about from "../assets/images/about.png";
import {
  FaRobot,
  FaChartLine,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden bg-white text-[#1A1A2E]">
      <Navbar />

      {/* HERO */}
      <div className="relative px-6 pt-32 pb-20 text-center">
        <div className="absolute left-1/4 top-40 -z-10 h-72 w-72 rounded-full bg-[#6C63FF]/10 blur-3xl"></div>
        <div className="absolute right-1/4 top-40 -z-10 h-96 w-96 rounded-full bg-[#00BFA6]/10 blur-3xl"></div>

        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Bridging the Gap Between <br />
            <span className="text-[#6C63FF]">
              Entrepreneurs & Financial Experts
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Finance Connect is an AI-powered platform helping women entrepreneurs
            find the right financial guidance at the right time.
          </p>
        </motion.div>
      </div>

      {/* STORY */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
            <h4 className="text-[#6C63FF] font-bold uppercase mb-4">
              Our Story
            </h4>

            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              The problem isn't lack of ambition — <br />
              it's lack of access to guidance.
            </h2>

            <p className="text-gray-600 mb-6">
              Many women entrepreneurs struggle to find the right financial
              advisors who truly understand their business stage and needs.
            </p>

            <p className="text-gray-600 mb-8">
              Traditional systems are inefficient and generic. We built a smarter
              solution using AI to match entrepreneurs with the right experts.
            </p>

            <div className="flex items-center gap-2 text-[#6C63FF] font-bold">
              Finance Connect <FaArrowRight />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <img
              src={about}
              alt="About"
              className="rounded-3xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#F8F9FC] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            What Makes Us Different
          </h2>
          <div className="h-1 w-20 bg-[#6C63FF] mx-auto mt-4"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-3 gap-10"
        >
          <motion.div variants={fadeInUp} className="card">
            <FaRobot className="text-3xl text-[#6C63FF] mb-4" />
            <h3 className="font-bold text-xl mb-2">AI Matching</h3>
            <p className="text-gray-500">
              Smart matching based on business needs and expertise.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="card">
            <FaUserTie className="text-3xl text-[#00BFA6] mb-4" />
            <h3 className="font-bold text-xl mb-2">Expert Advisors</h3>
            <p className="text-gray-500">
              Verified professionals ready to guide startups.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="card">
            <FaChartLine className="text-3xl text-[#6C63FF] mb-4" />
            <h3 className="font-bold text-xl mb-2">Growth Focus</h3>
            <p className="text-gray-500">
              Helping startups scale with better financial decisions.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 px-6">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start Your Journey Today
          </h2>

          <button
            onClick={() => navigate("/")}
            className="bg-[#1A1A2E] text-white px-10 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Started
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}