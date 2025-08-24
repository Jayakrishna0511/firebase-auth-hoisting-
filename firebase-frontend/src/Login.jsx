import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

function Login({ setUser }) {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  );
}

export default Login;
