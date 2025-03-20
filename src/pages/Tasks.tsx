import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  assignee?: string;
  relatedTo?: {
    type: "customer" | "deal";
    name: string;
  };
}

// Sample data
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Call Sarah about website requirements",
    description:
      "Discuss the scope and timeline for the Acme Corp website redesign",
    dueDate: "2023-06-10",
    priority: "high",
    status: "todo",
    assignee: "John Doe",
    relatedTo: {
      type: "customer",
      name: "Acme Corp",
    },
  },
  {
    id: "2",
    title: "Prepare proposal for TechStart",
    dueDate: "2023-06-15",
    priority: "medium",
    status: "in-progress",
    assignee: "Jane Smith",
    relatedTo: {
      type: "deal",
      name: "Software Integration",
    },
  },
  {
    id: "3",
    title: "Follow up with Global Industries",
    description: "Check on the status of the marketing campaign proposal",
    dueDate: "2023-06-08",
    priority: "low",
    status: "todo",
    assignee: "John Doe",
  },
  {
    id: "4",
    title: "Send contract to Nexus Systems",
    dueDate: "2023-06-05",
    priority: "high",
    status: "done",
    assignee: "Jane Smith",
    relatedTo: {
      type: "deal",
      name: "Consulting Services",
    },
  },
  {
    id: "5",
    title: "Schedule training session",
    description:
      "Coordinate a time for the product training with Bright Solutions",
    dueDate: "2023-06-12",
    priority: "medium",
    status: "todo",
    assignee: "John Doe",
    relatedTo: {
      type: "customer",
      name: "Bright Solutions",
    },
  },
  {
    id: "6",
    title: "Review cloud migration plan",
    dueDate: "2023-06-20",
    priority: "medium",
    status: "in-progress",
    assignee: "Jane Smith",
    relatedTo: {
      type: "deal",
      name: "Cloud Migration",
    },
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setTasks(sampleTasks);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "No date";

    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    if (dateOnly.getTime() === today.getTime()) {
      return "Today";
    } else if (dateOnly.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date);
    }
  };

  const isOverdue = (dateStr?: string) => {
    if (!dateStr) return false;

    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    return dateOnly < today && dateStr;
  };

  const priorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "low":
        return <Circle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "done" ? "todo" : "done" }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    switch (activeTab) {
      case "today":
        return task.dueDate && formatDate(task.dueDate) === "Today";
      case "upcoming":
        return (
          task.dueDate &&
          formatDate(task.dueDate) !== "Today" &&
          !isOverdue(task.dueDate)
        );
      case "overdue":
        return isOverdue(task.dueDate);
      case "completed":
        return task.status === "done";
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks and to-dos.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center animate-pulse">
                <p className="text-lg font-medium">Loading tasks...</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we fetch your tasks
                </p>
              </div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-lg font-medium">No tasks found</p>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "all"
                    ? "You don't have any tasks. Add one to get started."
                    : `You don't have any ${activeTab} tasks.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <Card
                  key={task.id}
                  className={`card-hover transition-all ${
                    task.status === "done" ? "opacity-60" : "opacity-100"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.status === "done"}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="mt-1"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <label
                              htmlFor={`task-${task.id}`}
                              className={`font-medium cursor-pointer ${
                                task.status === "done"
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </label>

                            {task.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {task.description}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {priorityIcon(task.priority)}

                            {task.status === "done" && (
                              <Badge
                                variant="outline"
                                className="bg-green-500/10 border-green-500/20 text-green-600"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Done
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                          {task.dueDate && (
                            <div
                              className={`flex items-center ${
                                isOverdue(task.dueDate) &&
                                task.status !== "done"
                                  ? "text-red-500"
                                  : ""
                              }`}
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatDate(task.dueDate)}</span>
                            </div>
                          )}

                          {task.assignee && (
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              <span>{task.assignee}</span>
                            </div>
                          )}

                          {task.relatedTo && (
                            <div className="flex items-center">
                              <Badge
                                variant="outline"
                                className="h-5 text-xs font-normal"
                              >
                                {task.relatedTo.type === "customer"
                                  ? "Customer"
                                  : "Deal"}
                                : {task.relatedTo.name}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
