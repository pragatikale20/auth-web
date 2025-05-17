import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      () => setImageError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.token}`,  // Ensure you send the token
        },
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white transition-all duration-500 bg-gradient-to-r from-[#1a1a2e] to-[#16213e]">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={loadFull}
        options={{
          particles: {
            number: { value: 100 },
            size: { value: 3 },
            move: { speed: 1.5, direction: "none", random: true },
            opacity: { value: 0.7 },
            shape: { type: "circle" },
            color: { value: "#00d9ff" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      <div className="z-10 p-6 rounded-lg shadow-xl border border-gray-700 backdrop-blur-md max-w-lg w-full text-center bg-[#0f0f1a] bg-opacity-90">
        <h1 className="text-3xl font-bold text-[#00d9ff] mb-6 animate-pulse">Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover border-4 shadow-lg hover:scale-110 transition-transform"
            onClick={() => fileRef.current.click()}
          />
         <p className="text-sm self-center">
  {imageError ? (
    <span className="text-red-700">Error uploading image (file size must be &lt; 2MB)</span>
  ) : imagePercent > 0 && imagePercent < 100 ? (
    <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
  ) : imagePercent === 100 ? (
    <span className="text-green-700">Image uploaded successfully</span>
  ) : ('')}
</p>

          <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-gray-800 text-white rounded-lg p-3" onChange={handleChange} />
          <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-gray-800 text-white rounded-lg p-3" onChange={handleChange} />
          <input type="password" id="password" placeholder="Password" className="bg-gray-800 text-white rounded-lg p-3" onChange={handleChange} />

          {/* Update Button with Hover Effect */}
          <button className="bg-[#00d9ff] text-black p-3 rounded-lg uppercase font-bold hover:scale-105 transition-transform hover:shadow-[#00d9ff] hover:text-white">
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>

        <div className="flex justify-between mt-5">
          <span onClick={handleDeleteAccount} className="text-red-400 cursor-pointer hover:text-red-500 hover:scale-105 transition-transform">Delete Account</span>
          <span onClick={handleSignOut} className="text-red-400 cursor-pointer hover:text-red-500 hover:scale-105 transition-transform">Sign Out</span>
        </div>
       

        {error && <p className="text-red-700 mt-5">Something went wrong!</p>}
        {updateSuccess && <p className="text-green-700 mt-5">User updated successfully!</p>}
      </div>
    </div>
  );
}
