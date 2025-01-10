import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center mx-auto'>
       <Link to='/'>
       <h1 className='font-bold'>Auth App</h1>
         </Link>
     <ul className='flex gap-4'>
        <li>Home</li>
        <Link to='/about'>
        <li>About</li>
        </Link>
        <Link to='/sign-in'>
        <li>Sign In</li>
        </Link>
        <Link to='/sign-up'>
        <li>Sign Up</li>
        </Link>
        </ul>
        </div>
    </div>
  )
}
