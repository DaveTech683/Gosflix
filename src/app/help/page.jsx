"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";




export default function help() {
 

 
  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div className="pt-24 px-4 md:px-12 max-w-screen-xl mx-auto">
        <h2>Help Page</h2>
      </div>

      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
