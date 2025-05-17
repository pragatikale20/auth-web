import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OAuth from '../components/OAuth';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const error = user.error;

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/profile');
    } catch (error) {
      dispatch(signInFailure(error.message || 'An error occurred'));
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0d1b2a] overflow-hidden text-white">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80 },
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 bg-[#16283a] bg-opacity-90 p-8 rounded-xl shadow-xl border border-gray-700 backdrop-blur-md max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#00d9ff]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-white">
             
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] transition-all w-full"
              whileFocus={{ scale: 1.05 }}
            />
                  </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-white">
             
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] transition-all w-full"
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-white">
             
            </label>
            <motion.input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] transition-all w-full"
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <motion.button
            type="submit"
            className="bg-[#00d9ff] text-black p-3 rounded-lg uppercase font-bold hover:scale-105 transition transform disabled:opacity-70 w-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        <OAuth />
        </form>
        <div className="flex justify-center gap-2 mt-5 text-gray-300">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="text-[#00ffa2] hover:text-[#00d9ff] transition-colors">
            Sign In
            </Link>
        </div>
        <p className="text-gray-500 mt-5">
          {typeof error === 'object' ? error.message : error || 'Something went wrong!'}
        </p>
      </motion.div>
    </div>
  );
}