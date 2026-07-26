"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

interface Campaign {
  headline: string;
  caption: string;
  hashtags: string[];
}

export default function ResultsPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [posterImage, setPosterImage] = useState("");

  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("campaign");

    if (data) {
      setCampaign(JSON.parse(data));
    }

    const img = sessionStorage.getItem("posterImage");

    if (img) {
      setPosterImage(img);
    }
  }, []);

  async function downloadPoster() {
    if (!posterRef.current) return;

    try {
      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = "PromoChefAI-Poster.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Unable to download poster.");
    }
  }

  if (!campaign) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">No Campaign Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="mb-8 flex justify-center">
        <button
          onClick={downloadPoster}
          className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-600"
        >
          📥 Download Poster
        </button>
      </div>

      <div
        ref={posterRef}
        className="mx-auto w-[900px] overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 p-10 text-white">
          <h1 className="text-5xl font-extrabold">
            🍔 PromoChef AI
          </h1>

          <p className="mt-3 text-xl">
            AI Powered Restaurant Marketing
          </p>
        </div>

        <div className="grid grid-cols-2">

          <div className="flex items-center justify-center bg-orange-50 p-10">
            <img
              src={
                posterImage
                  ? posterImage
                  : "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"
              }
              alt="Food"
              className="h-[450px] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

          <div className="p-10">

            <h2 className="text-4xl font-extrabold leading-tight text-orange-600">
              {campaign.headline}
            </h2>

            <div className="mt-8 rounded-2xl bg-orange-50 p-6">
              <p className="text-lg leading-8 text-gray-700">
                {campaign.caption}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {campaign.hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-orange-500 px-5 py-2 font-semibold text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-red-600 p-8 text-center text-white">
              <h2 className="text-5xl font-black">
                ORDER NOW
              </h2>

              <p className="mt-3 text-xl">
                Limited Time Offer
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}