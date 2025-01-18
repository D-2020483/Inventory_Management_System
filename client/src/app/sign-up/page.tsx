import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/app/(components)/Navbar"; 
import Dashboard from "@/app/dashboard/page";
import SignUpPage from "@/components/sign-up.page";

export default function Home() {
  return (
    <main className="flex items-center justify-center px-4 min-h-screen">
        <SignUpPage/>
    </main>
  );
}
