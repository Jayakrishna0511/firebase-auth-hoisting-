import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ message: "" });

  // Fetch messages from backend
  const fetchMessages = async () => {
    const res = await fetch("http://localhost:4000/messages");
    const data = await res.json();
    setMessages(data);
  };

  // Send message to backend
  const sendMessage = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.displayName,
        message: form.message,
      }),
    });
    setForm({ message: "" });
    fetchMessages();
  };

  // Login with Google
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // If not logged in → show login
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Welcome to Firebase Demo</h2>
        <button onClick={login}>Sign in with Google</button>
      </div>
    );
  }

  // If logged in → show chat app
  return (
    <div style={{ padding: "20px" }}>
      <h2>Firebase Fullstack Demo</h2>
      <div style={{ marginBottom: 20 }}>
        <img
          src={user.photoURL}
          alt="profile"
          width={40}
          style={{ borderRadius: "50%", marginRight: 10 }}
        />
        <b>{user.displayName}</b> ({user.email})
        <button style={{ marginLeft: 20 }} onClick={logout}>
          Logout
        </button>
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Write a message..."
          value={form.message}
          onChange={(e) => setForm({ message: e.target.value })}
        />
        <button type="submit">Send</button>
      </form>

      <h3>Messages:</h3>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <b>{msg.name}:</b> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
