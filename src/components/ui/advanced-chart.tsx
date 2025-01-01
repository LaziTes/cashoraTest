import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface AdvancedChartProps {
  data: any[];
  dataKey: string;
  title: string;
  color?: string;
}

export const AdvancedChart = ({ data, dataKey, title, color = "#0EA5E9" }: AdvancedChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1F2C" />
          <XAxis 
            dataKey="name" 
            stroke="#64748B"
            tick={{ fill: '#64748B' }}
          />
          <YAxis 
            stroke="#64748B"
            tick={{ fill: '#64748B' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1F2C',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fillOpacity={1}
            fill={`url(#color${dataKey})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};