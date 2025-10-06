"use client"

import React from 'react';
import {
    CalendarDays,
    TrendingUp,
    TrendingDown,
    Users,
    UserPlus,
    BarChart3,
    Calendar,
    Target,
    Heart,
    Award,
    Activity,
} from "lucide-react";

// --- INLINE UI COMPONENTS (Shadcn/Tailwind Replacements) ---

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
const CardDescription = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);
const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

type ButtonProps = { children: React.ReactNode, className?: string, variant?: 'default' | 'outline' | 'secondary' };
const Button = ({ children, className = '', variant = 'default' }: ButtonProps) => {
    let variantClasses = 'bg-primary text-primary-foreground hover:bg-primary/90';
    if (variant === 'outline') {
        variantClasses = 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
    } else if (variant === 'secondary') {
        variantClasses = 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
    }
    return (
        <button className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-10 px-4 py-2 ${variantClasses} ${className}`}>
            {children}
        </button>
    );
};

type BadgeProps = { children: React.ReactNode, className?: string, variant?: 'default' | 'secondary' | 'destructive' | 'outline' };
const Badge = ({ children, className = '', variant = 'default' }: BadgeProps) => {
    let variantClasses = 'bg-primary/90 text-primary-foreground hover:bg-primary';
    if (variant === 'secondary') {
        variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    } else if (variant === 'destructive') {
        variantClasses = 'bg-red-500 text-white hover:bg-red-600';
    } else if (variant === 'outline') {
        variantClasses = 'text-foreground border border-input bg-white/50';
    }
    return (
        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses} ${className}`}>
            {children}
        </div>
    );
};

const Progress = ({ value, className = '' }: { value: number, className?: string }) => (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
        <div
            role="progressbar"
            aria-valuenow={value}
            className="h-full w-full flex-1 bg-primary transition-all duration-500"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </div>
);

const MockLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); console.log('Navigating to:', href); }} className="block">
        {children}
    </a>
);
const useParams = () => ({ fellowship: 'fellowship1' });

// --- TYPE DEFINITIONS & MOCK DATA ---
interface SundayStats {
    date: string;
    total: number;
    adults: number;
    youth: number;
    children: number;
    newVisitors: number;
    serviceType: string;
}

interface MonthlyStats {
    month: string;
    totalAttendance: number;
    averageWeekly: number;
    growthRate: number;
    newVisitors: number;
}

// --- SAFE DEFAULT VALUES ---
const DEFAULT_SUNDAY_STATS: SundayStats = {
    date: 'N/A',
    total: 0,
    adults: 0,
    youth: 0,
    children: 0,
    newVisitors: 0,
    serviceType: 'Unknown',
};

const DEFAULT_MONTHLY_STATS: MonthlyStats = {
    month: '2024-01',
    totalAttendance: 0,
    averageWeekly: 0,
    growthRate: 0,
    newVisitors: 0,
};

const MOCK_MONTHLY_STATS: MonthlyStats[] = [
    { month: '2024-06', totalAttendance: 500, averageWeekly: 125, growthRate: 3.2, newVisitors: 45 },
    { month: '2024-07', totalAttendance: 510, averageWeekly: 127, growthRate: 2.0, newVisitors: 40 },
    { month: '2024-08', totalAttendance: 470, averageWeekly: 117, growthRate: -7.8, newVisitors: 30 },
    { month: '2024-09', totalAttendance: 620, averageWeekly: 155, growthRate: 31.9, newVisitors: 75 },
];

const getLatestSundayStats = (): SundayStats | undefined => ({
    date: '2024-09-29', total: 155, adults: 100, youth: 35, children: 20, newVisitors: 12, serviceType: 'Sunday Service'
});
const getAverageAttendance = (): number => 140;
const getHighestAttendance = (): SundayStats | undefined => ({
    date: '2024-09-08', total: 175, adults: 110, youth: 45, children: 20, newVisitors: 15, serviceType: 'Special Event'
});
const getLowestAttendance = (): SundayStats | undefined => ({
    date: '2024-01-07', total: 85, adults: 60, youth: 15, children: 10, newVisitors: 5, serviceType: 'Regular Service'
});
const getGrowthTrend = (): number => 18.5;
const getRetentionRate = (): number => 85;
const getEngagementScore = (): number => 78;

// Utility for formatting dates
const formatDate = (dateString: string | undefined) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

// --- MAIN COMPONENT ---

export default function AnalyticsOverview() {
    const params = useParams();
    const fellowship = params.fellowship;

    // Defensive data fetching using nullish coalescing (??)
    const latestStats = getLatestSundayStats() ?? DEFAULT_SUNDAY_STATS;
    const averageAttendance = getAverageAttendance();
    const highestRecord = getHighestAttendance() ?? DEFAULT_SUNDAY_STATS;
  

    // Defensive array access:
    const mockMonthlyStats: MonthlyStats[] = MOCK_MONTHLY_STATS;
    const currentMonth = mockMonthlyStats[mockMonthlyStats.length - 1] ?? DEFAULT_MONTHLY_STATS;

    const growthTrend = getGrowthTrend();
    const retentionRate = getRetentionRate();
    const engagementScore = getEngagementScore();

    return (
        <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-gray-50 min-h-screen">
            {/* Enhanced Header */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600/10 via-white to-background p-6 sm:p-8 border border-gray-200 shadow-lg">
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Fellowship Analytics Dashboard</h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                        
                        Comprehensive insights into your fellowship&apos;s spiritual growth, attendance patterns, and community
                        engagement.
                    </p>
                </div>

                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-indigo-600/10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-indigo-600/10 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
            </div>

            {/* Enhanced Quick Stats Cards */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="relative overflow-hidden border-l-4 border-l-indigo-600 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Last Sunday</CardTitle>
                        <div className="p-2 bg-indigo-600/10 rounded-full">
                            <Users className="h-4 w-4 text-indigo-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">{latestStats.total}</div>
                        <p className="text-xs text-gray-500 mb-3">{formatDate(latestStats.date)}</p>
                        <div className="grid grid-cols-3 gap-1">
                            <Badge variant="secondary" className="text-xs justify-center px-1">
                                A: {latestStats.adults}
                            </Badge>
                            <Badge variant="secondary" className="text-xs justify-center px-1">
                                Y: {latestStats.youth}
                            </Badge>
                            <Badge variant="secondary" className="text-xs justify-center px-1">
                                C: {latestStats.children}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Weekly Average</CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-full">
                            <BarChart3 className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">{averageAttendance}</div>
                        <p className="text-xs text-gray-500 mb-2">Last 6 months</p>
                        <div className="flex items-center gap-1">
                            {growthTrend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-green-600" />
                            ) : (
                                <TrendingDown className="h-3 w-3 text-red-600" />
                            )}
                            <span className={`text-xs font-medium ${growthTrend > 0 ? "text-green-600" : "text-red-600"}`}>
                                {Math.abs(Math.round(growthTrend))}% trend
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Highest Record</CardTitle>
                        <div className="p-2 bg-green-500/10 rounded-full">
                            <Award className="h-4 w-4 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">{highestRecord.total}</div>
                        <p className="text-xs text-gray-500 mb-2">{formatDate(highestRecord.date)}</p>
                        <Badge variant="outline" className="text-xs">
                            {highestRecord.serviceType}
                        </Badge>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-l-4 border-l-orange-500 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">New Visitors</CardTitle>
                        <div className="p-2 bg-orange-500/10 rounded-full">
                            <UserPlus className="h-4 w-4 text-orange-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">{currentMonth.newVisitors}</div>
                        <p className="text-xs text-gray-500 mb-2">This month</p>
                        <div className="text-xs text-gray-500">
                            Last Sunday: <span className="font-medium text-gray-800">{latestStats.newVisitors}</span> visitors
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* New Engagement Metrics */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-gray-800">
                            <Heart className="h-5 w-5 text-red-500" />
                            Community Engagement
                        </CardTitle>
                        <CardDescription className="text-sm">Measures of fellowship participation and connection</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Retention Rate</span>
                                <span className="font-medium">{retentionRate}%</span>
                            </div>
                            <Progress value={retentionRate} className="h-2" />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Engagement Score</span>
                                <span className="font-medium">{engagementScore}%</span>
                            </div>
                            <Progress value={engagementScore} className="h-2" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-gray-800">
                            <Target className="h-5 w-5 text-purple-500" />
                            Growth Insights
                        </CardTitle>
                        <CardDescription className="text-sm">Key performance indicators and trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div className="text-center p-3 bg-indigo-500/10 rounded-lg">
                                <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                                    {latestStats.total === 0 ? '0' : Math.round((latestStats.adults / latestStats.total) * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Adult Attendance</div>
                            </div>
                            <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                                    {latestStats.total === 0 ? '0' : Math.round((latestStats.youth / latestStats.total) * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Youth Engagement</div>
                            </div>
                            <div className="text-center p-3 bg-green-500/10 rounded-lg">
                                <div className="text-xl sm:text-2xl font-bold text-green-600">
                                    {latestStats.total === 0 ? '0' : Math.round((latestStats.children / latestStats.total) * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">Children Ministry</div>
                            </div>
                            <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                                <div className="text-xl sm:text-2xl font-bold text-orange-600">
                                    {latestStats.total === 0 ? '0' : Math.round((latestStats.newVisitors / latestStats.total) * 100)}%
                                </div>
                                <div className="text-xs text-gray-600">New Visitors</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-indigo-600/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 group-hover:text-indigo-600 transition-colors text-base sm:text-lg">
                            <div className="p-2 bg-indigo-600/10 rounded-full group-hover:bg-indigo-600/20 transition-colors">
                                <BarChart3 className="h-5 w-5 text-indigo-600" />
                            </div>
                            Attendance Trends
                        </CardTitle>
                        <CardDescription className="text-sm">Detailed charts, patterns, and weekly analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MockLink href={`/${fellowship}/analytics/attendance`}>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 group-hover:shadow-lg transition-shadow">View Detailed Analytics</Button>
                        </MockLink>
                    </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-blue-500/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 group-hover:text-blue-500 transition-colors text-base sm:text-lg">
                            <div className="p-2 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
                                <Calendar className="h-5 w-5 text-blue-500" />
                            </div>
                            Monthly Reports
                        </CardTitle>
                        <CardDescription className="text-sm">Comprehensive summaries and growth analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MockLink href={`/${fellowship}/analytics/monthly`}>
                            <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-500/10 group-hover:shadow-lg transition-shadow">
                                View Monthly Reports
                            </Button>
                        </MockLink>
                    </CardContent>
                </Card>

                <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-green-500/20 md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 group-hover:text-green-500 transition-colors text-base sm:text-lg">
                            <div className="p-2 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors">
                                <Activity className="h-5 w-5 text-green-500" />
                            </div>
                            Live Counter
                        </CardTitle>
                        <CardDescription className="text-sm">Real-time attendance tracking during services</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MockLink href={`/${fellowship}/analytics/counter`}>
                            <Button variant="secondary" className="w-full bg-green-500 text-white hover:bg-green-600 group-hover:shadow-lg transition-shadow">
                                Open Live Counter
                            </Button>
                        </MockLink>
                    </CardContent>
                </Card>
            </div>

            {/* Enhanced Recent Activity */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-gray-800">
                        <CalendarDays className="h-5 w-5 text-indigo-600" />
                        Recent Monthly Performance
                    </CardTitle>
                    <CardDescription className="text-sm">Last 4 months attendance summary and growth trends</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockMonthlyStats
                            .slice(-4)
                            .reverse()
                            .map((month, _index) => ( 
                                <div
                                    key={month.month}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-indigo-600/10 rounded-full flex-shrink-0">
                                            <CalendarDays className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-base sm:text-lg">
                                                {new Date(month.month + "-01").toLocaleDateString("en-US", {
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium text-gray-800">{month.totalAttendance}</span> total attendance &bull;
                                                <span className="font-medium text-gray-800"> {month.averageWeekly}</span> weekly average
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                                        <Badge
                                            variant={month.growthRate > 0 ? "default" : month.growthRate < -5 ? "destructive" : "secondary"}
                                            className={`text-sm px-3 py-1 ${
                                                month.growthRate > 0
                                                    ? 'bg-green-100 text-green-700 border-green-200'
                                                    : month.growthRate < -5
                                                        ? 'bg-red-100 text-red-700 border-red-200'
                                                        : 'bg-gray-100 text-gray-700 border-gray-200'
                                                }`}
                                        >
                                            {month.growthRate > 0 ? "+" : ""}
                                            {month.growthRate}%
                                        </Badge>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-gray-800">{month.newVisitors} new visitors</div>
                                            <div className="text-xs text-gray-600">
                                                {month.totalAttendance === 0 ? '0' : Math.round((month.newVisitors / month.totalAttendance) * 100)}% visitor rate
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}