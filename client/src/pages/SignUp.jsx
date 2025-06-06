import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OAuth from '../components/OAuth';
import { signInStart, signInSuccess, signInFailure, clearError } from '../redux/user/userSlice';

export default function SignUp() {
 const [formData, setFormData] = useState({
  username: '',    
  email: '',
  password: '',
});


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const error = user.error;

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

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


    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});


      let data;
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch (jsonErr) {
        data = {};
        console.error('Invalid JSON response:', jsonErr);
      }

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data?.message || 'Signup failed'));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/profile');
    } catch (error) {
      dispatch(signInFailure(error.message || 'An error occurred'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1b2a] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#16283a] p-8 rounded-xl shadow-xl border border-gray-700 max-w-md w-full text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#00d9ff]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="text"
            placeholder="Username"
            id="username"
            name='username'
              value={formData.username}
             onChange={handleChange}
            required
            className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] w-full"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] w-full"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            id="password"
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-[#1c2d3d] text-white p-3 rounded-lg focus:ring-2 focus:ring-[#00d9ff] w-full"
            whileFocus={{ scale: 1.05 }}
          />
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
        {error && (
          <p className="text-red-500 mt-4 text-sm">
            {typeof error === 'object' ? error.message : error}
          </p>
        )}
      </motion.div>
    </div>
  );
}
