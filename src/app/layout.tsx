import StytchProvider from "./components/StytchProvider";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StytchProvider>
      <html lang="en">
        <title>Stytch Next.js App Router Example</title>
        <meta
          name="description"
          content="An example Next.js App Router application using Stytch for authentication"
        />
        <head>
          <script src="https://elements.stytch.com/telemetry.js"></script>
        </head>
        <body>
          <main>
            <div className="container">
              <AuthProvider>{children} </AuthProvider>
            </div>
          </main>
        </body>
      </html>
    </StytchProvider>
  );
}
