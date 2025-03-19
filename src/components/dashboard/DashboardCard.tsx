import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function DashboardCard({
  title,
  description,
  children,
  className,
  index = 0,
}: DashboardCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // Remove initial opacity-0 class
      cardRef.current.classList.remove("opacity-0");
      cardRef.current.classList.add("animate-slide-in-bottom");
    }
  }, []);

  return (
    <Card
      ref={cardRef}
      className={cn("card-hover transition-all duration-300", className)}
      style={
        {
          "--index": index,
          animationDelay: `${index * 100}ms`,
        } as React.CSSProperties
      }
    >
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
