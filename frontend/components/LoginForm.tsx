"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff, Mail, Lock, ChefHat } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Temporary authentication simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Login Successful!");

    router.push("/generate");
  }

  return (
    <Card className="w-full max-w-md rounded-3xl p-8 shadow-2xl">

      {/* Logo */}

      <div className="flex flex-col items-center">

        <div className="rounded-full bg-orange-100 p-4">

          <ChefHat className="h-10 w-10 text-orange-500" />

        </div>

        <h1 className="mt-4 text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Login to continue generating AI marketing campaigns.
        </p>

      </div>

      {/* Email */}

      <div className="mt-8">

        <label className="mb-2 block font-medium">
          Email
        </label>

        <div className="relative">

          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

          <Input
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

      </div>

      {/* Password */}

      <div className="mt-6">

        <label className="mb-2 block font-medium">
          Password
        </label>

        <div className="relative">

          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="pl-10 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>

        </div>

      </div>

      {/* Forgot Password */}

      <div className="mt-3 text-right">

        <button className="text-sm text-orange-500 hover:underline">
          Forgot Password?
        </button>

      </div>

      {/* Login Button */}

      <Button
        onClick={handleLogin}
        disabled={loading}
        className="mt-8 w-full bg-orange-500 hover:bg-orange-600"
      >
        {loading ? "Signing In..." : "Login"}
      </Button>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-gray-300" />

        <span className="mx-3 text-sm text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-300" />

      </div>

      {/* Google */}

      <Button
        variant="outline"
        className="w-full"
      >
        Continue with Google
      </Button>

      {/* Signup */}

      <p className="mt-8 text-center text-sm text-gray-500">

        Don't have an account?{" "}

        <Link
          href="/signup"
          className="font-semibold text-orange-500"
        >
          Create Account
        </Link>

      </p>

    </Card>
  );
}