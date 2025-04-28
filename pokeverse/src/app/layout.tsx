import { ReactNode } from "react";
import "./globals.css"; // Import global styles if you have them

export const metadata = {
  title: "PokeVerse",
  description: "Welcome to the Pokémon universe!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Add the Google Fonts links here */}
        <link
          href="https://fonts.googleapis.com/css2?family=Piedra&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Aclonica&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mogra&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
       
        {children}
      </body>
    </html>
  );
}
