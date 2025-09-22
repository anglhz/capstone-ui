import { motion } from 'framer-motion';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const YearReport = () => {
  const { year } = useParams();
  
  // Mock data for the year
  const monthlyData = [
    { month: 'Jan', value: 3800000, change: 2.1 },
    { month: 'Feb', value: 3900000, change: 2.6 },
    { month: 'Mar', value: 3850000, change: -1.3 },
    { month: 'Apr', value: 4000000, change: 3.9 },
    { month: 'Maj', value: 4100000, change: 2.5 },
    { month: 'Jun', value: 4350000, change: 6.1 },
    { month: 'Jul', value: 4250000, change: -2.3 },
    { month: 'Aug', value: 4400000, change: 3.5 },
    { month: 'Sep', value: 4300000, change: -2.3 },
    { month: 'Okt', value: 4450000, change: 3.5 },
    { month: 'Nov', value: 4350000, change: -2.2 },
    { month: 'Dec', value: 4500000, change: 3.4 },
  ];

  const allocationData = [
    { name: 'Avanza ISK', value: 2400000, color: '#7C3AED' },
    { name: 'Bank', value: 1250000, color: '#22C55E' },
    { name: 'Krypto', value: 850000, color: '#F59E0B' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const totalStart = monthlyData[0]?.value || 0;
  const totalEnd = monthlyData[monthlyData.length - 1]?.value || 0;
  const yearGrowth = ((totalEnd - totalStart) / totalStart) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between no-print"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/reports">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tillbaka
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Årsrapport {year}
            </h1>
            <p className="text-sm text-muted-foreground">
              Fullständig översikt för hela året.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Skriv ut
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportera PDF
          </Button>
        </div>
      </motion.div>

      {/* Summary KPIs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Startkapital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-foreground">
              {new Intl.NumberFormat('sv-SE', {
                style: 'currency',
                currency: 'SEK',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalStart)}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Slutkapital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-foreground">
              {new Intl.NumberFormat('sv-SE', {
                style: 'currency',
                currency: 'SEK',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalEnd)}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Årstillväxt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-xl font-bold ${yearGrowth >= 0 ? 'text-positive' : 'text-negative'}`}>
              {yearGrowth >= 0 ? '+' : ''}{yearGrowth.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Absolut vinst
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-xl font-bold ${(totalEnd - totalStart) >= 0 ? 'text-positive' : 'text-negative'}`}>
              {new Intl.NumberFormat('sv-SE', {
                style: 'currency',
                currency: 'SEK',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalEnd - totalStart)}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Månadsvis utveckling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value: any) => [
                        new Intl.NumberFormat('sv-SE', {
                          style: 'currency',
                          currency: 'SEK',
                          minimumFractionDigits: 0,
                        }).format(value),
                        'Förmögenhet'
                      ]}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Asset Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Tillgångsfördelning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [
                        new Intl.NumberFormat('sv-SE', {
                          style: 'currency',
                          currency: 'SEK',
                          minimumFractionDigits: 0,
                        }).format(value),
                        'Värde'
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-2">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {((item.value / allocationData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default YearReport;