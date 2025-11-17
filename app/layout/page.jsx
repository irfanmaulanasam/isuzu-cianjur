// src/app/layout.jsx
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


export const metadata = {
title: "Isuzu Commercial Vehicle",
description: "Solusi Euro 4, TCO rendah, dan reliable untuk usaha logistik.",
};


export default function RootLayout({ children }) {
return (
<html lang="en">
<body className="bg-white text-gray-900">
<Navbar />
{children}
<Footer />
</body>
</html>
);
}