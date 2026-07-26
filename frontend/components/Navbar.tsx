"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            PromoChef AI
          </h1>
        </div>

        <Link href="/generate">
          <Button className="bg-orange-500 hover:bg-orange-600">
            Generate Campaign
          </Button>
        </Link>
      </div>
    </nav>
  );
}