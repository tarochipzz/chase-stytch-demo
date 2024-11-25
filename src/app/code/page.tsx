"use client";
import { useStytch } from "@stytch/nextjs";
import React, { useCallback, useState } from "react";

// phone-number-test-6264af39-e7aa-4eb9-902b-47b4f52f80ec
const methodId = "email-test-43e68c7f-eebd-4f4b-bfa8-571d5c582159";

const Code = () => {
  const stytch = useStytch();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const authenticate = useCallback(
    async (code: string) => {
      await stytch.otps.authenticate(String(code), methodId, {
        session_duration_minutes: 60,
      });
    },
    [stytch, code]
  );
  const handleNext = async () => {
    try {
      await authenticate(code);
      window.location.href = "/homepage";
    } catch (e) {
      setError("invalid code");
    }
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
        <p style={{ paddingTop: 35, paddingBottom: 5, fontSize: "18px" }}>
          Enter your one-time code
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            width: "100%",
            borderRadius: "8px",
            height: 38,
          }}
        />
        {error && (
          <div style={{ color: "#EF4444", marginTop: "6px", fontSize: "12px" }}>
            {error}
          </div>
        )}
        <div
          style={{
            display: "flex",
            gap: 35,
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => {
              window.location.href = "/verify";
            }}
            style={{
              background: "#f5f5f5",
              border: "1px solid #e0e0e0",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              width: "80px",
            }}
          >
            Back
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
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Code;
