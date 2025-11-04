import React from "react";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "120px" }}>
      <h1>Login to Continue</h1>
      <button style={{
        padding: "14px 22px",
        fontSize: "18px",
        cursor: "pointer",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#4285F4",
        color: "#fff",
        marginTop: "20px"
      }} onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
}
