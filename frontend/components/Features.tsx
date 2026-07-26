import {
  ImageIcon,
  Video,
  Mic,
  Sparkles,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold">
          Everything you need to promote your food
        </h2>

        <p className="mt-4 text-center text-gray-600">
          AI generates complete marketing campaigns in seconds.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          <FeatureCard
            icon={ImageIcon}
            title="Posters"
            description="Generate beautiful food posters."
          />

          <FeatureCard
            icon={Video}
            title="Promo Videos"
            description="15-second promotional videos."
          />

          <FeatureCard
            icon={Mic}
            title="Voice Over"
            description="Natural AI-generated narration."
          />

          <FeatureCard
            icon={Sparkles}
            title="Marketing Copy"
            description="Captions, headlines and hashtags."
          />

        </div>

      </div>
    </section>
  );
}