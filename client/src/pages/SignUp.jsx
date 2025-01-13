import { useState } from 'react';
import {Link} from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }
 console.log(formData);
 const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    setLoading(true);
    setError(false);
    const res = await fetch('/api/auth/signup', {
      method: 'Post',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);
    if(data.success === false ) {
      setError(true);
      return;
    }
  } catch (error) {
    setLoading(false);
    setError(true);

  }
  
 }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-200 p-3 rounded-lg "
          onChange={handleChange}          
          ></input>
     
        <input
          type="text"
          placeholder="Email"
          id="email"
           className="bg-slate-200 p-3 rounded-lg"
           onChange={handleChange}
          >
          </input>
        
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
          ></input>
        <button disabled={loading} className="bg-slate-800 text-white
        rounded-lg uppercase hover:opacity-80 h-8">
          {loading ? 'Loading...' : 'Sign Up'}
          </button>
      </form>
     

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to=' /sign-in'>
        <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && "Something went wrong !"}</p>
      </div>
   
  );
}
