import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#000", // Black background like Grok
        minHeight: "100vh",
      }}
      className="flex flex-col items-center justify-center text-center px-6"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl bg-[#0d1b2a] bg-opacity-90 p-8 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md"
      >
        <h1 className="text-5xl font-extrabold text-[#00d9ff] mb-4 drop-shadow-md animate-pulse hover:text-gray-300 transition-colors duration-500">
          Elevate Your Brand with <span className="text-[#00ffa2]">Elite PR Solutions</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 font-light">
          We craft compelling stories, build strong reputations, and connect brands with the right audience.
          Let us take your business to the next level.
        </p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="/contact"
          className="bg-[#00ffa2] text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#00cc82] transition transform hover:scale-105"
        >
          Get in Touch
        </motion.a>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="mt-12 max-w-4xl bg-[#0d1b2a] bg-opacity-90 p-8 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md"
      >
        <h2 className="text-3xl font-semibold text-[#00d9ff] mb-4 animate-bounce hover:text-gray-300 transition-colors duration-500">Our Expertise</h2>
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-lg"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {["📢 Media Relations", "🎯 Brand Strategy", "🌍 Digital & Social PR", "📑 Crisis Management", "📺 Influencer Collaborations", "✍️ Content & Storytelling"].map((service, index) => (
            <motion.li
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="p-2 bg-[#1b263b] rounded-md shadow-md hover:bg-[#00ffa2] hover:text-black transition transform hover:scale-110 hover:text-gray-300"
            >
              {service}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="mt-8 text-center"
      >
        <p className="text-xl text-gray-300 font-medium animate-fadeIn hover:text-gray-500 transition-colors duration-500">
          Ready to shape your brand's future?
        </p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="/services"
          className="mt-4 inline-block bg-[#00d9ff] text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#009fcc] transition transform hover:scale-105"
        >
          Explore Our Services
        </motion.a>
      </motion.div>
    </div>
  );
}
