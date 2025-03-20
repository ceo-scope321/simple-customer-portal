import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Types
interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  contact: string;
  dueDate?: string;
  stage: "contacted" | "negotiation" | "proposal" | "closed";
}

// Sample data
const sampleDeals: Deal[] = [
  {
    id: "1",
    title: "Website Redesign",
    company: "Acme Corp",
    value: 12500,
    probability: 80,
    contact: "Sarah Johnson",
    dueDate: "2023-06-15",
    stage: "proposal",
  },
  {
    id: "2",
    title: "Software Integration",
    company: "TechStart",
    value: 25000,
    probability: 60,
    contact: "John Williams",
    dueDate: "2023-07-01",
    stage: "negotiation",
  },
  {
    id: "3",
    title: "Marketing Campaign",
    company: "Global Industries",
    value: 8000,
    probability: 90,
    contact: "Emily Davis",
    dueDate: "2023-06-10",
    stage: "contacted",
  },
  {
    id: "4",
    title: "Consulting Services",
    company: "Nexus Systems",
    value: 20000,
    probability: 75,
    contact: "Michael Brown",
    stage: "closed",
  },
  {
    id: "5",
    title: "Product Training",
    company: "Bright Solutions",
    value: 5000,
    probability: 95,
    contact: "Jennifer Taylor",
    dueDate: "2023-06-30",
    stage: "proposal",
  },
  {
    id: "6",
    title: "Cloud Migration",
    company: "Future Vision",
    value: 30000,
    probability: 50,
    contact: "David Miller",
    dueDate: "2023-07-15",
    stage: "negotiation",
  },
  {
    id: "7",
    title: "App Development",
    company: "InnoTech",
    value: 45000,
    probability: 40,
    contact: "Lisa Chen",
    dueDate: "2023-08-01",
    stage: "contacted",
  },
];

const stageDefinitions = [
  { id: "contacted", name: "Contacted", color: "rose" },
  { id: "negotiation", name: "Negotiation", color: "amber" },
  { id: "proposal", name: "Proposal", color: "sky" },
  { id: "closed", name: "Closed", color: "teal" },
];

export default function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeals(sampleDeals);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Drop outside the list or no destination
    if (!destination) {
      return;
    }

    // Drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the deal being dragged
    const deal = deals.find((d) => d.id === draggableId);
    if (!deal) return;

    // Create new array without the dragged deal
    const newDeals = deals.filter((d) => d.id !== draggableId);

    // Insert the deal at the new position with updated stage
    const updatedDeal = {
      ...deal,
      stage: destination.droppableId as Deal["stage"],
    };

    // Get all deals in the destination stage
    const dealsInDestination = newDeals.filter(
      (d) => d.stage === destination.droppableId
    );

    // Insert the deal at the correct position
    dealsInDestination.splice(destination.index, 0, updatedDeal);

    // Combine all deals
    const finalDeals = newDeals
      .filter((d) => d.stage !== destination.droppableId)
      .concat(dealsInDestination);

    setDeals(finalDeals);
  };

  const calculateStageTotal = (stage: Deal["stage"]) => {
    return deals
      .filter((deal) => deal.stage === stage)
      .reduce((sum, deal) => sum + deal.value, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pipeline</h1>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Deal
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {stageDefinitions.map((stage) => (
            <div key={stage.id} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className={`w-2 h-5 rounded-sm mr-2 bg-${stage.color}-500`}
                  />
                  <h3 className="font-medium">{stage.name}</h3>
                </div>
                <Badge variant="outline">
                  {formatCurrency(
                    calculateStageTotal(stage.id as Deal["stage"])
                  )}
                </Badge>
              </div>

              <Droppable droppableId={stage.id} key={stage.id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 rounded-lg min-h-[500px] p-1 space-y-2 transition-colors duration-200 ${
                        snapshot.isDraggingOver
                          ? `bg-${stage.color}-200`
                          : `bg-${stage.color}-100`
                      }`}
                    >
                      {deals
                        .filter((deal) => deal.stage === stage.id)
                        .map((deal, index) => (
                          <Draggable
                            key={deal.id}
                            draggableId={deal.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`select-none transition-all duration-200 ${
                                  snapshot.isDragging
                                    ? "opacity-50 scale-95"
                                    : "opacity-100 scale-100"
                                }`}
                              >
                                <CardContent className="p-2">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h3 className="font-medium">
                                        {deal.title}
                                      </h3>
                                      <p className="text-sm text-muted-foreground">
                                        {deal.company}
                                      </p>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="h-8 w-8 p-0"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center">
                                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                                      {formatCurrency(deal.value)}
                                    </div>
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 mr-1 text-muted-foreground" />
                                      {deal.contact}
                                    </div>
                                    {deal.dueDate && (
                                      <>
                                        <div className="flex items-center">
                                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                          {new Date(
                                            deal.dueDate
                                          ).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                          {deal.probability}%
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
