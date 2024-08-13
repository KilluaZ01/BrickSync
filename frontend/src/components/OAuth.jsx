import React from "react";
import { assets } from "../assets/assets";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";

export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <button
      type="button"
      className="flex flex-row justify-center gap-3 items-center text-sm w-full p-[0.6rem] bg-[#fff]  rounded-[10px]"
      onClick={handleGoogleClick}
    >
      <img className="w-4" src={assets.google_icon} alt="" />
      Sign Up with Google
    </button>
  );
}
