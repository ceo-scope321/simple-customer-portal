
import { useState, useEffect } from 'react';
import { ThemeButton } from '@/components/ui/ThemeButton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Calendar, Clock, User, MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

// Types
interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  contact: string;
  dueDate?: string;
  stage: 'contacted' | 'negotiation' | 'proposal' | 'closed';
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
    stage: "proposal"
  },
  {
    id: "2",
    title: "Software Integration",
    company: "TechStart",
    value: 25000,
    probability: 60,
    contact: "John Williams",
    dueDate: "2023-07-01",
    stage: "negotiation"
  },
  {
    id: "3",
    title: "Marketing Campaign",
    company: "Global Industries",
    value: 8000,
    probability: 90,
    contact: "Emily Davis",
    dueDate: "2023-06-10",
    stage: "contacted"
  },
  {
    id: "4",
    title: "Consulting Services",
    company: "Nexus Systems",
    value: 20000,
    probability: 75,
    contact: "Michael Brown",
    stage: "closed"
  },
  {
    id: "5",
    title: "Product Training",
    company: "Bright Solutions",
    value: 5000,
    probability: 95,
    contact: "Jennifer Taylor",
    dueDate: "2023-06-30",
    stage: "proposal"
  },
  {
    id: "6",
    title: "Cloud Migration",
    company: "Future Vision",
    value: 30000,
    probability: 50,
    contact: "David Miller",
    dueDate: "2023-07-15",
    stage: "negotiation"
  },
  {
    id: "7",
    title: "App Development",
    company: "InnoTech",
    value: 45000,
    probability: 40,
    contact: "Lisa Chen",
    dueDate: "2023-08-01",
    stage: "contacted"
  }
];

const stageDefinitions = [
  { id: "contacted", name: "Contacted", color: "bg-blue-500" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-500" },
  { id: "proposal", name: "Proposal", color: "bg-purple-500" },
  { id: "closed", name: "Closed", color: "bg-green-500" }
];

export default function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDeals(sampleDeals);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    e.dataTransfer.setData('dealId', deal.id);
    setDraggedDeal(deal);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: Deal['stage']) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('dealId');
    
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === dealId ? { ...deal, stage: targetStage } : deal
      )
    );
    
    setDraggedDeal(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'No date';
    
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const calculateStageTotal = (stage: Deal['stage']) => {
    return deals
      .filter(deal => deal.stage === stage)
      .reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your deals through the sales process.</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Deal
          </Button>
        </div>
      </div>
      
      {deals.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center animate-pulse">
            <p className="text-lg font-medium">Loading pipeline...</p>
            <p className="text-sm text-muted-foreground">Please wait while we fetch the data</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
          {stageDefinitions.map(stage => (
            <div 
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id as Deal['stage'])}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-2 h-5 rounded-sm mr-2 ${stage.color}`} />
                  <h3 className="font-medium">{stage.name}</h3>
                </div>
                <Badge variant="outline">
                  {formatCurrency(calculateStageTotal(stage.id as Deal['stage']))}
                </Badge>
              </div>
              
              <div className="flex-1 bg-secondary/50 rounded-lg p-3 min-h-[500px] space-y-3">
                {deals
                  .filter(deal => deal.stage === stage.id)
                  .map(deal => (
                    <Card 
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal)}
                      className={`card-hover cursor-move transition-all ${
                        draggedDeal?.id === deal.id ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{deal.title}</h4>
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
                        
                        <p className="text-xs text-muted-foreground mb-3">{deal.company}</p>
                        
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-sm font-medium">{formatCurrency(deal.value)}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="text-xs font-normal"
                          >
                            {deal.probability}%
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            <span className="truncate">{deal.contact}</span>
                          </div>
                          
                          {deal.dueDate && (
                            <div className="flex items-center justify-end">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatDate(deal.dueDate)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
