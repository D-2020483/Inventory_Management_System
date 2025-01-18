"use client";

import { SignUp } from "@clerk/nextjs";
import { Button, Input } from "@mui/material";
import Link from "next/link";
import { useState, FormEvent } from "react";

export default function SignUpPage() {
return (
    <div>
      <SignUp/>
    </div>
  );
}
