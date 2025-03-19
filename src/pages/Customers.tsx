import { useState, useEffect } from "react";
import { Search, PlusCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomerCard, Customer } from "@/components/customers/CustomerCard";
import { ThemeButton } from "@/components/ui/ThemeButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddCustomerDialog } from "@/components/customers/AddCustomerDialog";

const STORAGE_KEY = "customers";

// Sample customer data
const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "Acme Corp",
    email: "sarah.johnson@acme.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    subscription: "Premium",
    lastContact: "2 days ago",
  },
  {
    id: "2",
    name: "John Williams",
    company: "TechStart",
    email: "john.williams@techstart.com",
    phone: "+1 (555) 234-5678",
    status: "lead",
    lastContact: "1 week ago",
  },
  {
    id: "3",
    name: "Emily Davis",
    company: "Global Industries",
    email: "emily.davis@global.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    subscription: "Basic",
    lastContact: "Yesterday",
  },
  {
    id: "4",
    name: "Michael Brown",
    company: "Nexus Systems",
    email: "michael.brown@nexus.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    subscription: "Standard",
    lastContact: "1 month ago",
  },
  {
    id: "5",
    name: "Jennifer Taylor",
    company: "Bright Solutions",
    email: "jennifer.taylor@bright.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    subscription: "Premium",
    lastContact: "3 days ago",
  },
  {
    id: "6",
    name: "David Miller",
    company: "Future Vision",
    email: "david.miller@future.com",
    phone: "+1 (555) 678-9012",
    status: "lead",
    lastContact: "5 days ago",
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [subscriptionFilter, setSubscriptionFilter] = useState<string[]>([]);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  useEffect(() => {
    // Load customers from localStorage
    const storedCustomers = localStorage.getItem(STORAGE_KEY);
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      // If no stored customers, use sample data
      setCustomers(sampleCustomers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleCustomers));
    }
  }, []);

  const handleAddCustomer = (newCustomer: Customer) => {
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustomers));
  };

  const filteredCustomers = customers.filter((customer) => {
    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(customer.status);

    // Apply subscription filter
    const matchesSubscription =
      subscriptionFilter.length === 0 ||
      (customer.subscription &&
        subscriptionFilter.includes(customer.subscription));

    return matchesSearch && matchesStatus && matchesSubscription;
  });

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const statusOptions = ["active", "inactive", "lead"];
  const subscriptionOptions = ["Basic", "Standard", "Premium"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <Button onClick={() => setIsAddCustomerOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {statusOptions.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={statusFilter.includes(status)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, status]);
                    } else {
                      setStatusFilter(statusFilter.filter((s) => s !== status));
                    }
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Subscription
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {subscriptionOptions.map((subscription) => (
                <DropdownMenuCheckboxItem
                  key={subscription}
                  checked={subscriptionFilter.includes(subscription)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSubscriptionFilter([
                        ...subscriptionFilter,
                        subscription,
                      ]);
                    } else {
                      setSubscriptionFilter(
                        subscriptionFilter.filter((s) => s !== subscription)
                      );
                    }
                  }}
                >
                  {subscription}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center animate-pulse">
            <p className="text-lg font-medium">Loading customers...</p>
            <p className="text-sm text-muted-foreground">
              Please wait while we fetch the data
            </p>
          </div>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-lg font-medium">No customers found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={handleCustomerClick}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Customer Details Dialog */}
      <Dialog
        open={!!selectedCustomer}
        onOpenChange={(open) => !open && setSelectedCustomer(null)}
      >
        {selectedCustomer && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedCustomer.name}</DialogTitle>
              <DialogDescription>{selectedCustomer.company}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <p className="capitalize">{selectedCustomer.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Subscription
                  </p>
                  <p>{selectedCustomer.subscription || "None"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Last Contact
                  </p>
                  <p>{selectedCustomer.lastContact || "N/A"}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <AddCustomerDialog
        open={isAddCustomerOpen}
        onOpenChange={setIsAddCustomerOpen}
        onCustomerAdd={handleAddCustomer}
      />
    </div>
  );
}
