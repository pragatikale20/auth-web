import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-bold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-200 p-3 rounded-lg"
        ></input>
     
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-3 rounded-lg"
        ></input>
     
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-200 p-3 rounded-lg"
        ></input>
        <button className="bg-slate-800 text-white
        rounded-lg uppercase hover:opacity-80 h-8">Sign up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to=' /sign-in'>
        <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
