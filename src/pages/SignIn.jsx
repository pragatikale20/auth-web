import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure, clearError } from '../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OAuth from '../components/OAuth';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError()); 
  }, [dispatch]);

  const particlesInit = async (main) => {
    await loadFull(main); // Load tsparticles engine
  };

  const handleChange = (e) => {
    dispatch(clearError()); // Clear error on typing (optional UX)
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
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
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.message || 'Something went wrong'));
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0d1b2a] overflow-hidden text-white">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { speed: 1, direction: 'none', random: true },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' } },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* Sign In Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="z-10 bg-[#16283a] bg-opacity-90 p-8 rounded-xl shadow-xl border border-gray-700 backdrop-blur-md max-w-md w-full text-center"
      >
        <h1 className="text-4xl font-extrabold text-[#00d9ff] mb-6 animate-pulse">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] transition-all"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] transition-all"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            disabled={loading}
            type="submit"
            className="bg-[#00d9ff] text-black p-3 rounded-lg uppercase font-bold hover:scale-105 transition transform disabled:opacity-70"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </motion.button>
          <OAuth />
        </form>

        <div className="flex justify-center gap-2 mt-5 text-gray-300">
          <p>Don’t have an account?</p>
          <Link to="/sign-up" className="text-[#00ffa2] hover:text-[#00d9ff] transition-colors">
            Sign up
          </Link>
        </div>

        {error && (
          <p className="text-red-400 mt-4 text-sm">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </motion.div>
    </div>
  );
}
