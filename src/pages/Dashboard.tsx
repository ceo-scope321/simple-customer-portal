
import { useEffect, useState } from 'react';
import { Users, DollarSign, BarChart2, Calendar } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { ThemeButton } from '@/components/ui/ThemeButton';
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const leadsBySource = [
  { name: 'Website', value: 40 },
  { name: 'Referral', value: 30 },
  { name: 'Social', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentActivity = [
  { id: 1, action: 'New customer added', user: 'John Doe', time: '2 hours ago' },
  { id: 2, action: 'Meeting scheduled', user: 'Jane Smith', time: '5 hours ago' },
  { id: 3, action: 'Deal closed', user: 'Mike Johnson', time: 'Yesterday' },
  { id: 4, action: 'Email sent', user: 'Sarah Williams', time: 'Yesterday' },
];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your CRM dashboard.</p>
        </div>
        <ThemeButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading skeletons for metric cards
          Array(4).fill(0).map((_, index) => (
            <Skeleton 
              key={`metric-skeleton-${index}`} 
              className="h-[132px] w-full rounded-lg" 
            />
          ))
        ) : (
          <>
            <MetricCard
              title="Total Customers"
              value="1,248"
              icon={<Users className="h-5 w-5 text-primary" />}
              trend={{ value: 12, isPositive: true }}
              index={0}
            />
            <MetricCard
              title="Revenue"
              value="$24,780"
              icon={<DollarSign className="h-5 w-5 text-primary" />}
              trend={{ value: 8, isPositive: true }}
              index={1}
            />
            <MetricCard
              title="Active Deals"
              value="28"
              icon={<BarChart2 className="h-5 w-5 text-primary" />}
              trend={{ value: 5, isPositive: false }}
              index={2}
            />
            <MetricCard
              title="Scheduled Meetings"
              value="12"
              icon={<Calendar className="h-5 w-5 text-primary" />}
              description="For the next 7 days"
              index={3}
            />
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons for chart cards
          <>
            <Skeleton className="h-[400px] w-full rounded-lg lg:col-span-2" />
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </>
        ) : (
          <>
            <DashboardCard 
              title="Sales Performance" 
              description="Last 7 months"
              className="lg:col-span-2"
              index={4}
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      width={30}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
            
            <DashboardCard 
              title="Leads by Source" 
              description="Current distribution"
              index={5}
            >
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadsBySource}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {leadsBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </>
        )}
      </div>
      
      {isLoading ? (
        <Skeleton className="h-[200px] w-full rounded-lg" />
      ) : (
        <DashboardCard 
          title="Recent Activity" 
          description="Latest actions in the system"
          index={6}
        >
          <div className="divide-y divide-border">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">By {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}
    </div>
  );
}
