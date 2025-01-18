"use client";

import { SignIn } from "@clerk/nextjs";
import { Button, Input, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  
  return ( <div className="flex items-center justify-center px-4 min-h-screen">
    <SignIn/>
  </div>);
}
