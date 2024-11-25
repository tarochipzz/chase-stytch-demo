"use client";

import React, { useCallback, useState } from "react";
import type { NextPage } from "next";
import { useStytch } from "@stytch/nextjs";
import { useAuth } from "../contexts/AuthContext";

const CHASE_BLUE = "#2D6FC0";
const ACTION_COLOR = "#0360F0";

const Home: NextPage = () => {
  const stytch = useStytch();

  const { setAuthState } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const authenticatePassword = useCallback(
    async (username: string, password: string) => {
      try {
        return await stytch.passwords.authenticate({
          email: username,
          password: password,
          session_duration_minutes: 60,
        });
      } catch (e) {
        console.error(`[${e.status_code}] ${e.error_message}`);
        setLoginError("Authentication failed. Please check your credentials.");
      }
    },
    [stytch]
  );
  const handlePasskeyLogin = async () => {
    try {
      const response = await stytch.webauthn.authenticate({
        session_duration_minutes: 60,
        // authenticatorSelection: {
        //   authenticatorAttachment: "platform",
        // },
      });

      if (response) {
        const { session_token, user } = response;

        localStorage.setItem("session_token", session_token);
        setAuthState({
          user: {
            name: user.name.first_name,
            email: user.emails[0].email,
            phoneNumber: user?.phone_numbers[0]?.phone_number,
          },
          isAuthenticated: true,
        });

        window.location.href = "/homepage";
      }
    } catch (e) {
      console.error("Touch ID Login Failed:", e);
    }
  };

  const handleLogin = async () => {
    if (!username) {
      setError("Please tell us your username.");
    }
    if (!password) {
      setPasswordError("Please tell us your password.");
    }
    if (!username || !password) return;

    const auth = await authenticatePassword(username, password);
    if (!auth) {
      setLoginError("Authentication failed. Please check your credentials.");
    } else {
      const { session_token, user } = auth;
      localStorage.setItem("session_token", session_token);
      setAuthState({
        user: {
          name: user.name.first_name,
          email: user.emails[0].email,
          phoneNumber: user?.phone_numbers[0]?.phone_number,
        },
        isAuthenticated: true,
      });
      window.location.href = "/verify";
    }
  };

  const FunctionalLoginComponent = (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "64px 0",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "32px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          width: "384px",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "18px" }}>Welcome</h2>
        <div style={{ marginBottom: "16px" }}>
          <button
            onClick={handlePasskeyLogin}
            style={{
              marginTop: "16px",
              padding: "10px 16px",
              backgroundColor: ACTION_COLOR,
              color: "white",
              fontWeight: "bold",
              width: "100%",
              borderRadius: "8px",
              border: "none",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Login with Passkey
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "16px 0",
          }}
        >
          <hr
            style={{
              flex: 1,
              border: "none",
              borderTop: "1px solid #ccc",
              margin: "0 8px",
            }}
          />
          <div style={{ textAlign: "center", color: "#555" }}>or</div>
          <hr
            style={{
              flex: 1,
              border: "none",
              borderTop: "1px solid #ccc",
              margin: "0 8px",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            style={{
              border: "1px solid #ccc",
              borderColor: error ? "#EF4444" : "#ccc",
              padding: "8px",
              width: "100%",
              borderRadius: "8px",
              height: 38,
            }}
          />
          {error && (
            <div
              style={{ color: "#EF4444", marginTop: "8px", fontSize: "12px" }}
            >
              {error}
            </div>
          )}
        </div>
        <div style={{ marginTop: "24px", position: "relative" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            style={{
              border: "1px solid #ccc",
              borderColor: passwordError ? "#EF4444" : "#ccc",
              padding: "8px",
              width: "100%",
              borderRadius: "8px",
              height: 38,
            }}
          />
          {passwordError && (
            <div
              style={{ color: "#EF4444", marginTop: "8px", fontSize: "12px" }}
            >
              {passwordError}
            </div>
          )}
          {loginError && (
            <div
              style={{ color: "#EF4444", marginTop: "8px", fontSize: "12px" }}
            >
              {loginError}
            </div>
          )}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: passwordError || loginError ? "55%" : "75%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {!showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={ACTION_COLOR}
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={ACTION_COLOR}
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </span>
        </div>
        <div
          style={{
            marginTop: "16px",
            display: "flex",
          }}
        >
          <input style={{ width: 18 }} type="checkbox" id="remember" />
          <label
            htmlFor="remember"
            style={{ fontSize: "15px", marginLeft: "8px" }}
          >
            Remember Me
          </label>
        </div>
        <button
          onClick={handleLogin}
          style={{
            marginTop: "24px",
            padding: "8px 16px",
            backgroundColor: ACTION_COLOR,
            color: "white",
            fontWeight: "bold",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: "16px",
            color: "#1D4ED8",
            fontSize: "14px",
          }}
        >
          <a href="#">Forgot Username / Password ?</a>
          <a href="#">Not Enrolled? Sign Up Now.</a>
        </div>
      </div>
    </main>
  );

  return (
    <div style={{ backgroundColor: CHASE_BLUE, minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "white",
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "8px",
          }}
        >
          <nav style={{ display: "flex", gap: "19px", paddingBottom: "25px" }}>
            <a
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "5px",
                textDecorationThickness: "2px",
                textDecorationColor: ACTION_COLOR,
                fontWeight: "bold",
                fontSize: "15px",
              }}
              href="#"
            >
              Personal
            </a>
            <a href="#">Business</a>
            <a href="#">Commercial</a>
          </nav>
          <div
            style={{
              fontSize: "14px",
              gap: 15,
              display: "flex",
              color: "grey",
            }}
          >
            <a href="#">Schedule a meeting</a>
            <a href="#">Customer service</a>
          </div>
        </div>
        <div>
          <img
            src="https://www.chase.com/etc/designs/chase-ux/css/img/newheaderlogo.svg"
            alt="CHASE"
            style={{ height: "22px" }}
          />
        </div>
        <nav
          style={{
            display: "flex",
            gap: "28px",
            paddingTop: "25px",
            paddingBottom: "5px",
          }}
        >
          <a href="#">Checking</a>
          <a href="#">Savings & CDs</a>
          <a href="#">Credit cards</a>
          <a href="#">Home loans</a>
          <a href="#">Auto</a>
          <a href="#">Investing by J.P. Morgan</a>
          <a href="#">Education & goals</a>
          <a href="#">Travel</a>
        </nav>
      </header>
      {FunctionalLoginComponent}
    </div>
  );
};

export default Home;
