import React, { useMemo, useState, type ReactNode, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, type TooltipProps
} from 'recharts';

// --- 1. TYPESCRIPT INTERFACES ---

// General prop interface for components that accept children
interface ChildrenProps {
  children: ReactNode;
  className?: string;
}

// Props for components using 'onClick' and 'children'
interface NavButtonProps extends ChildrenProps {
  onClick?: () => void;
}

// Props for the ToggleGroup components (Simplified for single-select use)
interface CustomToggleGroupProps extends ChildrenProps {
  value: string;
  onValueChange: (value: string) => void;
}

// Props for Select components
interface CustomSelectProps extends ChildrenProps {
  value: string;
  onValueChange: (value: string) => void;
}

// Data structures for Recharts
interface MonthlyData {
  month: string;
  attendance: number;
  visitors: number;
  growth: number; // percentage
  average: number; // running average
}

interface GivingData {
  name: string;
  value: number;
  color: string;
}

// Chart configuration for the Legend/Tooltip colors
interface ChartMetric {
  label: string;
  color: string;
}

interface ChartConfig {
  attendance: ChartMetric;
  visitors: ChartMetric;
  average: ChartMetric;
  growth: ChartMetric;
  giving?: ChartMetric;
}

// Custom Tooltip Props (using Recharts TooltipProps structure)
interface CustomTooltipContentProps extends TooltipProps<number, string> {
  config: ChartConfig;
}

// Custom Card Wrapper props (to fix 2322 error on config prop)
interface CardWithChartConfigProps extends ChildrenProps {
  config: ChartConfig;
}

// This interface was missing, causing an implicit 'any' error on ChartToggleItem props
interface ToggleGroupItemProps extends ChildrenProps {
  value: string;
}

// --- 2. MOCK DATA & CONFIG ---

const ANALYTICS_CONFIG: ChartConfig = {
  attendance: { label: 'Attendance', color: 'hsl(142 71.8% 42.9%)' }, // Green
  visitors: { label: 'Visitors', color: 'hsl(200 70% 50%)' }, // Sky Blue
  average: { label: 'Average Att.', color: 'hsl(222.2 47.4% 11.2%)' }, // Dark Blue
  growth: { label: 'MoM Growth %', color: 'hsl(24 9.8% 25%)' }, // Black/Gray
  giving: { label: 'Giving Breakdown', color: 'hsl(142 71.8% 52.9%)' }
};

const MOCK_MONTHLY_DATA: MonthlyData[] = [
  { month: 'Jan', attendance: 300, visitors: 40, growth: 5, average: 280 },
  { month: 'Feb', attendance: 320, visitors: 55, growth: 6.7, average: 290 },
  { month: 'Mar', attendance: 290, visitors: 30, growth: -9.4, average: 300 },
  { month: 'Apr', attendance: 350, visitors: 70, growth: 20.7, average: 310 },
  { month: 'May', attendance: 340, visitors: 50, growth: -2.8, average: 320 },
  { month: 'Jun', attendance: 380, visitors: 90, growth: 11.7, average: 330 },
  { month: 'Jul', attendance: 395, visitors: 110, growth: 3.9, average: 340 },
  { month: 'Aug', attendance: 410, visitors: 120, growth: 3.8, average: 350 },
  { month: 'Sep', attendance: 405, visitors: 100, growth: -1.2, average: 360 },
  { month: 'Oct', attendance: 430, visitors: 130, growth: 6.2, average: 370 },
  { month: 'Nov', attendance: 450, visitors: 150, growth: 4.6, average: 380 },
  { month: 'Dec', attendance: 500, visitors: 200, growth: 11.1, average: 390 },
];

const MOCK_GIVING_DATA: GivingData[] = [
  { name: 'General Fund', value: 15000, color: 'hsl(142 71.8% 42.9%)' },
  { name: 'Missions', value: 6000, color: 'hsl(200 70% 50%)' },
  { name: 'Building Fund', value: 4000, color: 'hsl(222.2 47.4% 11.2%)' },
];

// --- 3. INLINE UI COMPONENTS (Shadcn/Tailwind Replacements) ---

const Card = ({ children, className }: ChildrenProps) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-lg ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className }: ChildrenProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ children, className }: ChildrenProps) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);
const CardDescription = ({ children, className }: ChildrenProps) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);
const CardContent = ({ children, className }: ChildrenProps) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);
const CardFooter = ({ children, className }: ChildrenProps) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className }: NavButtonProps & { variant?: 'ghost' | 'default' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4
      ${className} hover:bg-gray-100 text-gray-700 bg-transparent
    `}
  >
    {children}
  </button>
);

// Simplified Select components
const Select = ({ value, onValueChange, children }: CustomSelectProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-[120px] h-10 py-2 px-3 text-sm rounded-lg border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none pr-8"
      >
        {children}
      </select>
      <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};
const SelectItem = ({ value, children }: { value: string, children: ReactNode }) => (
  <option value={value}>{children}</option>
);

// Simple Toggle Group implementation (acts like a radio button group visually)
const ChartTypeToggle = ({ value, onValueChange, children, className }: CustomToggleGroupProps & { className?: string }) => (
  <div className={`flex p-1 rounded-xl bg-gray-100 shadow-inner ${className || ''}`}>
    {React.Children.map(children, (child) => {
      if (React.isValidElement<ToggleGroupItemProps>(child)) {
        return React.cloneElement(child, {
          // Pass necessary props to make the item clickable and handle state
          onClick: () => onValueChange(child.props.value),
          selected: child.props.value === value,
        });
      }
      return child;
    })}
  </div>
);

// Item for the Toggle Group
const ChartToggleItem = ({ children, value, onClick, selected, className }: ToggleGroupItemProps & { onClick?: () => void, selected?: boolean }) => (
  <button
    onClick={onClick}
    value={value}
    className={`px-3 py-1 text-sm font-medium rounded-lg transition-all
      ${selected
        ? 'bg-green-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-200'
      } ${className}`}
  >
    {children}
  </button>
);

// Component that wraps content with chart configuration
const CardWithChartConfig = ({ children, config, className }: CardWithChartConfigProps) => (
  <Card className={`h-full ${className}`}>
    {children}
  </Card>
);


// --- 4. CUSTOM RENDERERS & TYPED WRAPPERS ---

// FIX: Update children type to React.ReactElement to satisfy Recharts ResponsiveContainer type constraints.
const TypedResponsiveContainer = ({ children, width = "100%", height = 300 }: Omit<ChildrenProps, 'children'> & { children: React.ReactElement | React.ReactElement[], width?: string | number, height?: string | number }) => (
  <ResponsiveContainer width={width} height={height}>
    {children}
  </ResponsiveContainer>
);

// Custom Tooltip component to display information on hover
const CustomTooltip = ({ active, payload, label, config }: CustomTooltipContentProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-white p-3 shadow-2xl text-sm border-gray-200">
        <p className="font-bold mb-1 text-gray-800">{`Month: ${label}`}</p>
        {payload.map((entry, index) => {
          const { dataKey, value, name } = entry;
          const metricConfig = config[dataKey as keyof ChartConfig];
          const displayValue = dataKey === 'growth' ? `${value.toFixed(1)}%` : value;

          return (
            <div key={`item-${index}`} className="flex justify-between items-center space-x-2">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: metricConfig?.color || entry.color || '#000' }}></span>
              <p className="flex-1" style={{ color: metricConfig?.color || entry.color || '#000' }}>
                {name}:
              </p>
              <p className="font-semibold text-right" style={{ color: metricConfig?.color || entry.color || '#000' }}>
                {displayValue}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};


// --- 5. MAIN PAGE COMPONENT ---

export default function MonthlyAnalyticsPage({ params }: { params: { fellowship_id: string } }) {
  // Use a hardcoded ID for the demo since 'params' might not be available in all preview environments
  const fellowship_id = params?.fellowship_id || 'DEMO_CHURCH'; 
  
  const [selectedYear, setSelectedYear] = useState('2024');
  const [chartType, setChartType] = useState('attendance'); // Not currently used to filter data, but used for options
  const [displayType, setDisplayType] = useState('bar'); // 'bar' or 'line'

  // Helper component to conditionally render Bar or Line based on displayType
  const DynamicChartElement = useCallback(({ dataKey, fill, name, yAxisId, type, stroke, strokeDasharray }: any) => {
    // Determine if it's the main attendance metric (Attendance or Visitors)
    const isPrimaryMetric = dataKey === 'attendance' || dataKey === 'visitors';

    if (isPrimaryMetric && displayType === 'bar') {
      return (
        <Bar
          yAxisId={yAxisId}
          dataKey={dataKey}
          fill={fill}
          name={name}
          radius={[4, 4, 0, 0]}
          barSize={10}
        />
      );
    } else if (isPrimaryMetric && displayType === 'line') {
      return (
        <Line
          yAxisId={yAxisId}
          type="monotone"
          dataKey={dataKey}
          stroke={stroke || fill}
          name={name}
          dot={false}
          strokeWidth={2}
        />
      );
    } else {
      // Growth and Average are always lines for comparison
      return (
        <Line
          yAxisId={yAxisId}
          type="monotone"
          dataKey={dataKey}
          stroke={stroke || fill}
          name={name}
          strokeDasharray={strokeDasharray}
          dot={false}
          strokeWidth={2}
        />
      );
    }
  }, [displayType]);


  const renderAttendanceChart = (data: MonthlyData[]) => (
    <CardWithChartConfig config={ANALYTICS_CONFIG} className="col-span-12 lg:col-span-8 h-[450px]">
      <CardHeader>
        <CardTitle className="text-xl text-gray-700">Monthly Attendance & Visitor Analysis</CardTitle>
        <CardDescription>
          Tracking core weekly service metrics for the year {selectedYear}.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] p-4 pr-6">
        <TypedResponsiveContainer>
          <BarChart // Using BarChart here allows rendering both Bar and Line children
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 40% 96.1%)" opacity={0.8} />
            <XAxis
              dataKey="month"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: ANALYTICS_CONFIG.average.color }}
            />
            {/* Left Y-Axis for headcount metrics (Attendance, Visitors, Average) */}
            <YAxis
              yAxisId="left"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: ANALYTICS_CONFIG.attendance.color }}
              allowDecimals={false}
            />
            {/* Right Y-Axis for percentage metrics (Growth) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: ANALYTICS_CONFIG.growth.color }}
              tickFormatter={(value: number) => `${value}%`}
            />

            <Tooltip
              content={<CustomTooltip config={ANALYTICS_CONFIG} />}
              cursor={{ fill: 'hsl(210 40% 90%)', opacity: 0.2 }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />

            {/* Attendance (Dynamic Bar/Line) */}
            <DynamicChartElement
              yAxisId="left"
              dataKey="attendance"
              fill={ANALYTICS_CONFIG.attendance.color}
              name={ANALYTICS_CONFIG.attendance.label}
            />
            {/* Visitors (Dynamic Bar/Line) */}
            <DynamicChartElement
              yAxisId="left"
              dataKey="visitors"
              fill={ANALYTICS_CONFIG.visitors.color}
              name={ANALYTICS_CONFIG.visitors.label}
            />
            {/* Growth (Always Line on Right Axis) */}
            <DynamicChartElement
              yAxisId="right"
              dataKey="growth"
              stroke={ANALYTICS_CONFIG.growth.color}
              name={ANALYTICS_CONFIG.growth.label}
            />
            {/* Average (Always Dashed Line on Left Axis) */}
            <DynamicChartElement
              yAxisId="left"
              dataKey="average"
              stroke={ANALYTICS_CONFIG.average.color}
              name={ANALYTICS_CONFIG.average.label}
              strokeDasharray="5 5"
            />
          </BarChart>
        </TypedResponsiveContainer>
      </CardContent>
    </CardWithChartConfig>
  );

  const renderGivingChart = (data: GivingData[]) => (
    <CardWithChartConfig config={ANALYTICS_CONFIG} className="col-span-12 lg:col-span-4 h-[450px]">
      <CardHeader>
        <CardTitle className="text-xl text-gray-700">Giving Breakdown</CardTitle>
        <CardDescription>
          Contribution by category for {selectedYear} (Year-to-Date).
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] p-4 flex items-center justify-center">
        <TypedResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
              cursor={{ fill: 'transparent' }}
            />
            <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '10px' }} />
          </PieChart>
        </TypedResponsiveContainer>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">Total Giving: ${MOCK_GIVING_DATA.reduce((sum, item) => sum + item.value, 0).toLocaleString()} (YTD)</p>
      </CardFooter>
    </CardWithChartConfig>
  );

  return (
    <div className="p-4 md:p-8 space-y-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">Monthly Sunday Analytics <span className="text-xl font-normal text-gray-500">({fellowship_id})</span></h1>
        <div className="flex items-center space-x-3">
          <YearSelect value={selectedYear} onValueChange={setSelectedYear}>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </YearSelect>

          <Button onClick={() => console.log('Download CSV clicked')} className="bg-white border hover:bg-gray-50">
            Download CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Chart Controls */}
        <Card className="col-span-12">
            <CardContent className='flex flex-col sm:flex-row items-start sm:items-center pt-6 space-y-3 sm:space-y-0 sm:space-x-8'>
              <div className="flex items-center space-x-3">
                <p className="font-medium text-sm text-gray-700">Display Type:</p>
                <ChartTypeToggle value={displayType} onValueChange={(val) => setDisplayType(val)}>
                    <ChartToggleItem value="bar">Bar Chart</ChartToggleItem>
                    <ChartToggleItem value="line">Line Chart</ChartToggleItem>
                </ChartTypeToggle>
              </div>

              {/* The chartType state is not actively used for data filtering but is here for future expansion */}
              <div className="flex items-center space-x-3">
                <p className="font-medium text-sm text-gray-700">Primary Focus:</p>
                <ChartTypeToggle value={chartType} onValueChange={(val) => setChartType(val)}>
                    <ChartToggleItem value="attendance">Attendance</ChartToggleItem>
                    <ChartToggleItem value="visitors">Visitors</ChartToggleItem>
                    <ChartToggleItem value="average">Average</ChartToggleItem>
                </ChartTypeToggle>
              </div>
            </CardContent>
        </Card>

        {/* Attendance/Growth/Visitor Chart */}
        {renderAttendanceChart(MOCK_MONTHLY_DATA)}

        {/* Giving Chart */}
        {renderGivingChart(MOCK_GIVING_DATA)}

      </div>
    </div>
  );
}
