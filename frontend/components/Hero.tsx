"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex min-h-[85vh] items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-6">
      <div className="mx-auto max-w-5xl text-center">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 flex justify-center">
            <Sparkles className="h-12 w-12 text-orange-500" />
          </div>

          <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
            AI Marketing Manager
            <br />
            for
            <span className="text-orange-500">
              {" "}Food Businesses
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl text-gray-600">
            Upload food images, describe today's offer,
            and instantly generate a complete
            promotional campaign with AI.
          </p>

          <div className="mt-10 flex justify-center gap-5">
            <Link href="/generate">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Generate Campaign
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}