import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-orange-100 p-4">
            <Icon className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <h3 className="mt-6 text-2xl font-bold">
          {title}
        </h3>

        <p className="mt-4 text-gray-600">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}