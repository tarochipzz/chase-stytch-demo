"use client";

import React, { useCallback } from "react";
import type { NextPage } from "next";
import { useStytch } from "@stytch/nextjs";

const CHASE_BLUE = "#2D6FC0";
const ACTION_COLOR = "#0360F0";

const Touch: NextPage = () => {
  const stytch = useStytch();

  const handleWebAuthnRegister = useCallback(() => {
    stytch.webauthn.register();
  }, [stytch]);

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
        <div style={{ marginTop: "24px" }}>
          <button
            onClick={handleWebAuthnRegister}
            style={{
              backgroundColor: ACTION_COLOR,
              color: "white",
              fontWeight: "bold",
              padding: "10px",
              width: "100%",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Register Touch ID
          </button>
        </div>
      </div>
    </main>
  );

  return (
    <div style={{ backgroundColor: CHASE_BLUE, minHeight: "100vh" }}>
      {FunctionalLoginComponent}
    </div>
  );
};

export default Touch;
