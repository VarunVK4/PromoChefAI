"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";

const steps = [
  "Understanding your promotion...",
  "Writing marketing headline...",
  "Creating engaging caption...",
  "Generating hashtags...",
  "Preparing voice-over...",
  "Rendering promotional video...",
];

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < steps.length - 1 ? prev + 1 : prev
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <Card className="w-full max-w-2xl rounded-3xl p-10 shadow-xl">

        <div className="flex justify-center">
          <Loader2 className="h-14 w-14 animate-spin text-orange-500" />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">
          AI is Creating Your Campaign
        </h1>

        <p className="mt-3 text-center text-gray-500">
          This usually takes just a few seconds.
        </p>

        <div className="mt-10 space-y-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              {index < currentStep ? (
                <CheckCircle2 className="text-green-500" />
              ) : index === currentStep ? (
                <Loader2 className="animate-spin text-orange-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              )}

              <span
                className={
                  index <= currentStep
                    ? "font-medium"
                    : "text-gray-400"
                }
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-orange-500 transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

      </Card>
    </div>
  );
}