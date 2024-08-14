import React, { useState, useRef, useEffect } from "react";
import Dashboard_Nav from "../components/Dashboard_Nav";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref, // Add this import
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(imagePercent);

  const { currentUser } = useSelector((state) => state.user);

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
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  return (
    <div className="h-screen bg-[#222831] flex flex-col">
      <Dashboard_Nav />
      <div className="p-3">
        <h1 className="text-3xl font-semibold text-center my-7 text-[#eee]">
          Profile
        </h1>
        <form className="flex flex-col gap-4 w-1/2 mx-auto">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            className="mt-2 h-24 w-24 self-center cursor-pointer rounded-full object-cover"
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            onClick={() => fileRef.current.click()}
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-500">
                Error uploading image (File size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-green-700">{`Uploading: ${imagePercent}%`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-500">
                Image Uploaded Successfully
              </span>
            ) : (
              ""
            )}
          </p>

          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            defaultValue={currentUser.password}
            type="password"
            id="password"
            placeholder="Password"
            className="border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            className={`mb-1 text-sm w-full bg-[#B1B500] text-[#eee] rounded-lg py-2.5 `}
          >
            Update
          </button>
        </form>
        <span className="text-red-500 text-sm">Delete Account</span>
      </div>
    </div>
  );
};

export default Profile;
