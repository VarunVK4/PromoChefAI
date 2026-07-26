"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ChefHat,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "sonner";

export default function SignupForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup() {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    toast.success("Account created successfully!");

    router.push("/generate");
  }

  return (
    <Card className="w-full max-w-md rounded-3xl p-8 shadow-2xl">

      <div className="flex flex-col items-center">

        <div className="rounded-full bg-orange-100 p-4">
          <ChefHat className="h-10 w-10 text-orange-500" />
        </div>

        <h1 className="mt-4 text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Join PromoChef AI today.
        </p>

      </div>

      <div className="mt-8 space-y-5">

        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="relative">

          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

          <Input
            className="pl-10 pr-10"
            placeholder="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="button"
            className="absolute right-3 top-3"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>

        </div>

        <Input
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <Button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>

      </div>

      <p className="mt-8 text-center text-sm text-gray-500">

        Already have an account?{" "}

        <Link
          href="/login"
          className="font-semibold text-orange-500"
        >
          Login
        </Link>

      </p>

    </Card>
  );
}