"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Play,
  Clock3,
  CheckCircle2,
  Download,
  Film,
} from "lucide-react";

export default function VideoPreview() {
  return (
    <Card className="overflow-hidden rounded-3xl shadow-lg">

      {/* Thumbnail */}

      <div className="relative flex h-72 items-center justify-center bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400">

        {/* Decorative circles */}

        <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white/20 blur-xl" />
        <div className="absolute bottom-12 right-12 h-28 w-28 rounded-full bg-white/20 blur-xl" />

        {/* Play Button */}

        <button className="group z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl transition hover:scale-110">

          <Play
            className="ml-2 h-10 w-10 text-orange-500 transition group-hover:scale-110"
            fill="currentColor"
          />

        </button>

      </div>

      {/* Content */}

      <div className="space-y-6 p-6">

        <div>

          <h2 className="text-2xl font-bold">
            Promotional Video
          </h2>

          <p className="mt-2 text-gray-500">
            AI-generated marketing video ready for download.
          </p>

        </div>

        {/* Info */}

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-orange-50 p-4 text-center">

            <Clock3 className="mx-auto mb-2 h-6 w-6 text-orange-500" />

            <p className="text-sm text-gray-500">
              Duration
            </p>

            <p className="font-bold">
              15 sec
            </p>

          </div>

          <div className="rounded-2xl bg-orange-50 p-4 text-center">

            <Film className="mx-auto mb-2 h-6 w-6 text-orange-500" />

            <p className="text-sm text-gray-500">
              Format
            </p>

            <p className="font-bold">
              MP4
            </p>

          </div>

          <div className="rounded-2xl bg-orange-50 p-4 text-center">

            <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-green-500" />

            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="font-bold text-green-600">
              Ready
            </p>

          </div>

        </div>

        {/* Download */}

        <Button className="w-full bg-orange-500 hover:bg-orange-600">

          <Download className="mr-2 h-5 w-5" />

          Download Video

        </Button>

      </div>

    </Card>
  );
}