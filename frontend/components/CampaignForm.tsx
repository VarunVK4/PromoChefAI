"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LoadingScreen from "./LoadingScreen";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload, Wand2 } from "lucide-react";

import { generateCampaign } from "@/services/campaign";

export default function CampaignForm() {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("Modern");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files) return;

    setImages(Array.from(e.target.files));
  }

  async function handleGenerate() {
    if (!description.trim()) {
      alert("Please enter a promotion description.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("description", description);
      formData.append("style", style);

      if (images.length > 0) {
        formData.append("image", images[0]);
      }

      console.log("=================================");
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      console.log("Description:", description);
      console.log("Style:", style);
      console.log("Images:", images.length);
      console.log("Calling backend...");

      const campaign = await generateCampaign(formData);

      console.log("Backend Response:");
      console.log(campaign);

      // Save AI response
      sessionStorage.setItem(
        "campaign",
        JSON.stringify(campaign)
      );

      // Save uploaded image (if available)
      if (images.length > 0) {
        const reader = new FileReader();

        reader.onload = () => {
          sessionStorage.setItem(
            "posterImage",
            reader.result as string
          );

          router.push("/results");
        };

        reader.readAsDataURL(images[0]);
      } else {
        router.push("/results");
      }

    } catch (error: any) {
      console.error("========== AXIOS ERROR ==========");
      console.error(error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response:", error.response.data);

        alert(
          `Backend Error (${error.response.status})\n\n${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
      } else if (error.request) {
        console.error("Request:", error.request);

        alert(
          "Unable to connect to the backend.\n\n" +
          "Make sure FastAPI is running on port 8000."
        );
      } else {
        console.error("Message:", error.message);

        alert(error.message);
      }

      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Card className="rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-orange-500">
          🚀 Generate Marketing Campaign
        </h1>

        <p className="mt-3 text-gray-600">
          Turn today's offer into a complete AI marketing campaign.
        </p>

        {/* Promotion Description */}

        <div className="mt-10">
          <label className="mb-3 block font-semibold">
            Promotion Description
          </label>

          <Textarea
            rows={8}
            placeholder={`Today's special is Chicken Burger Combo.
Buy 1 Get 1 Free.
Weekend Offer.
Modern Red Theme.`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Upload Images */}

        <div className="mt-10">
          <label className="mb-3 block font-semibold">
            Upload Food Images
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-300 p-12 transition hover:bg-orange-50">
            <Upload className="h-12 w-12 text-orange-500" />

            <p className="mt-4 text-gray-600">
              Click to upload food images
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Image Preview */}

        {images.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 font-semibold">
              Image Preview
            </h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="h-40 w-full rounded-xl object-cover shadow"
                />
              ))}
            </div>
          </div>
        )}

        {/* Style */}

        <div className="mt-10">
          <label className="mb-3 block font-semibold">
            Choose Style
          </label>

          <Select
            value={style}
            onValueChange={setStyle}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Modern">
                Modern
              </SelectItem>

              <SelectItem value="Luxury">
                Luxury
              </SelectItem>

              <SelectItem value="Minimal">
                Minimal
              </SelectItem>

              <SelectItem value="Festive">
                Festive
              </SelectItem>

              <SelectItem value="Surprise">
                Surprise Me
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}

        <Button
          size="lg"
          onClick={handleGenerate}
          className="mt-10 w-full bg-orange-500 hover:bg-orange-600"
        >
          <Wand2 className="mr-2 h-5 w-5" />
          Generate Marketing Campaign
        </Button>
      </Card>
    </div>
  );
}