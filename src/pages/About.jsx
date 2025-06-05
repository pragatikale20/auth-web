import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function About() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      style={{
        background: "radial-gradient(circle, rgba(13,27,42,1) 0%, rgba(0,0,0,1) 100%)",
        minHeight: "100vh",
      }}
      className="flex flex-col items-center justify-center text-center px-6 relative"
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 100 },
            size: { value: 3 },
            move: { speed: 1, direction: "none", random: true },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl bg-[#0d1b2a] bg-opacity-90 p-8 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md relative z-10"
      >
        <h1 className="text-5xl font-extrabold text-[#00d9ff] mb-4 drop-shadow-md">
          About <span className="text-[#00ffa2]">Elite PR Solutions</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 font-light">
          We are a cutting-edge public relations agency focused on **brand storytelling, media
          engagement, and digital reputation management**. Our mission is to
          help businesses and individuals **craft compelling narratives** that
          captivate and inspire audiences.
        </p>
      </motion.div>

      {/* Our Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="mt-12 max-w-4xl bg-[#0d1b2a] bg-opacity-90 p-8 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md relative z-10"
      >
        <h2 className="text-3xl font-semibold text-[#00d9ff] mb-4">Our Mission</h2>
        <p className="text-lg text-gray-300 mb-6">
          We are committed to **delivering impactful PR strategies** that help brands **stand
          out** in a competitive landscape. Whether it’s building trust,
          managing reputation, or engaging audiences, we make sure your story
          gets heard.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="mt-8 text-center relative z-10"
      >
        <p className="text-xl text-gray-300 font-medium">
          Ready to elevate your brand with us?
        </p>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="/contact"
          className="mt-4 inline-block bg-[#00d9ff] text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#009fcc] transition transform hover:scale-105"
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </div>
  );
}

export function Contact() {
  return (
    <div
      style={{
        background: "radial-gradient(circle, rgba(13,27,42,1) 0%, rgba(0,0,0,1) 100%)",
        minHeight: "100vh",
      }}
      className="flex flex-col items-center justify-center text-center px-6 relative"
    >
      <h1 className="text-5xl font-extrabold text-[#00d9ff] mb-4 drop-shadow-md">
        Contact <span className="text-[#00ffa2]">Us</span>
      </h1>
      <p className="text-lg text-gray-300 mb-6 font-light">
        Have questions or want to work with us? Reach out through the form below.
      </p>
      <form className="bg-[#0d1b2a] bg-opacity-90 p-8 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-md relative z-10 w-full max-w-lg">
        <input type="text" placeholder="Your Name" className="w-full mb-4 p-3 rounded bg-gray-800 text-white placeholder-gray-400" />
        <input type="email" placeholder="Your Email" className="w-full mb-4 p-3 rounded bg-gray-800 text-white placeholder-gray-400" />
        <textarea placeholder="Your Message" rows="4" className="w-full mb-4 p-3 rounded bg-gray-800 text-white placeholder-gray-400"></textarea>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-[#00d9ff] text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#009fcc] transition transform hover:scale-105 w-full"
        >
          Send Message
        </motion.button>
      </form>
    </div>
  );
}
