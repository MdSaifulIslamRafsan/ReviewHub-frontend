import ReviewPieChart from '@/components/dashboard/dashboardOverview';
import PopularPremiumReviewList from '@/components/dashboard/PopularPremiumReviewList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Clock,
  Star,
  DollarSign,
  Users,
  LucideIcon,
} from 'lucide-react';

type TCard = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description: string;
};


export default async function AdminDashboardPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard-overview`,
    {
      cache: 'no-store',
    }
  );

  const data = await res.json();
  // console.log(data)

  const cards: TCard[] = [
    {
      title: 'Total Reviews',
      value: data?.data?.totalReviews,
      icon: BarChart,
      description: 'All reviews in the system',
    },
    {
      title: 'Pending Reviews',
      value: data?.data?.totalPendingReviews,
      icon: Clock,
      description: 'Reviews awaiting approval',
    },
    {
      title: 'Premium Reviews',
      value: data?.data?.totalPremiumReviews,
      icon: Star,
      description: 'Paid premium reviews',
    },
    {
      title: 'Revenue',
      value: `$${data?.data?.totalPayments.toFixed(2)}`,
      icon: DollarSign,
      description: 'Total revenue from all payments',
    },
    {
      title: 'Total Users',
      value: data?.data?.totalUsers,
      icon: Users,
      description: 'Registered users',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold  mb-6">Admin Overview</h2>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4  gap-6">
        {cards.map((card, idx) => (
          <Card key={idx} className="border-green-100 gap-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {card?.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ReviewPieChart
          total={data.data.totalReviews}
          published={data.data.totalPublishedReviews}
          pending={data.data.totalPendingReviews}
        />
        <PopularPremiumReviewList></PopularPremiumReviewList>
      </div>
    </div>
  );
}
