import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  index?: number;
}

export function MetricCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
  index = 0,
}: MetricCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // Remove initial opacity-0 class
      cardRef.current.classList.remove("opacity-0");
      // Add animation class
      cardRef.current.classList.add("animate-slide-in-bottom");
    }
  }, []);

  return (
    <Card
      ref={cardRef}
      className={cn(
        "opacity-0 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      style={
        {
          animationDelay: `${index * 100}ms`,
          animationFillMode: "forwards",
        } as React.CSSProperties
      }
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>

            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}

            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={`text-xs font-medium ${
                    trend.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  vs last month
                </span>
              </div>
            )}
          </div>

          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
