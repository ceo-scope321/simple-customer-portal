import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MoreHorizontal, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "lead";
  subscription?: string;
  lastContact?: string;
  avatar?: string;
}

interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
  index?: number;
}

export function CustomerCard({
  customer,
  onClick,
  index = 0,
}: CustomerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simplified animation logic
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.remove("opacity-0");
        cardRef.current.classList.add("animate-slide-in-bottom");
      }
    }, index * 100); // Stagger the animations

    return () => clearTimeout(timer);
  }, [index]);

  // Status color mapping
  const statusColor = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
    lead: "bg-blue-500",
  };

  return (
    <Card
      ref={cardRef}
      className={cn(
        "card-hover opacity-0 overflow-hidden cursor-pointer transition-all duration-300",
        onClick && "hover:border-border/80"
      )}
      style={
        {
          "--index": index,
          animationDelay: `${index * 100}ms`,
          animationFillMode: "forwards",
        } as React.CSSProperties
      }
      onClick={onClick ? () => onClick(customer) : undefined}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {customer.avatar ? (
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <User className="h-5 w-5 text-primary" />
              </div>
            )}

            <div>
              <h3 className="font-medium text-base">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">
                {customer.company}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <div className={`status-dot ${statusColor[customer.status]}`} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm truncate">{customer.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-sm">{customer.phone}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {customer.subscription && (
            <Badge variant="outline" className="text-xs">
              {customer.subscription}
            </Badge>
          )}

          {customer.lastContact && (
            <span className="text-xs text-muted-foreground">
              Last contact: {customer.lastContact}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
