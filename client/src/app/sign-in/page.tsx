"use client"
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/app/(components)/Navbar"; 
import Dashboard from "@/app/dashboard/page";
import SignInPage from "@/components/sign-in.page";

export default function Home() {
  return (
    <div>
      <SignInPage />
    </div>
  );
}
