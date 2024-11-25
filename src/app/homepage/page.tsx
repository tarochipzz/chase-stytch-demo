"use client";

import React from "react";
import type { NextPage } from "next";
import { useAuth } from "../contexts/AuthContext";

export const CHASE_BLUE = "#2D6FC0";
export const ACTION_COLOR = "#0360F0";

const DummyHome: NextPage = () => {
  const { authState } = useAuth();
  console.log(authState);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "64px 0",
          fontSize: "55px",
          color: "white",
        }}
      >
        <div>YAY YOU ARE LOGGED IN 🎉</div>
        <br />
        <br />

        <div
          style={{
            fontSize: "40px",
          }}
        >
          Authed User Details
        </div>
        <div
          style={{
            fontSize: "32px",
          }}
        >
          Name: {authState.user.name || "Sylvia"}
        </div>
        <div
          style={{
            fontSize: "32px",
          }}
        >
          Email: {authState.user.email || "stytch6@gmail.com"}
        </div>
      </div>
    </div>
  );
};

export default DummyHome;
