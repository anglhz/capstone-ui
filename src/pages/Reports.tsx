import { motion } from 'framer-motion';
import { Calendar, TrendingUp, FileText, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Reports = () => {
  const currentYear = new Date().getFullYear();
  const availableYears = [currentYear, currentYear - 1, currentYear - 2];
  
  const months = [
    'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Rapporter
          </h1>
          <p className="text-sm text-muted-foreground">
            Generera och exportera detaljerade finansiella rapporter.
          </p>
        </div>

        <Button variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          Skriv ut
        </Button>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Årets bästa månad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-positive">Juni 2024</p>
            <p className="text-sm text-muted-foreground">+7.2% tillväxt</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tillgängliga rapporter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-sm text-muted-foreground">månadsrapporter</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Senaste rapport
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">Dec 2024</p>
            <p className="text-sm text-muted-foreground">skapad idag</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Years */}
      <div className="space-y-6">
        {availableYears.map((year, yearIndex) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + yearIndex * 0.1 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {year}
                  </CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/reports/${year}`}>
                      Visa årsrapport
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {months.map((month, index) => {
                    const monthNumber = index + 1;
                    const isAvailable = year < currentYear || monthNumber <= new Date().getMonth() + 1;
                    
                    return (
                      <div key={month} className={isAvailable ? '' : 'opacity-50'}>
                        {isAvailable ? (
                          <Link to={`/reports/${year}/${monthNumber}`}>
                            <div className="p-3 rounded-lg glass-panel card-hover text-center">
                              <p className="text-sm font-medium text-foreground">
                                {month}
                              </p>
                              <Badge 
                                variant="outline" 
                                className="mt-1 text-xs bg-positive/10 text-positive border-positive/20"
                              >
                                Klar
                              </Badge>
                            </div>
                          </Link>
                        ) : (
                          <div className="p-3 rounded-lg glass-panel text-center cursor-not-allowed">
                            <p className="text-sm font-medium text-muted-foreground">
                              {month}
                            </p>
                            <Badge 
                              variant="outline" 
                              className="mt-1 text-xs bg-muted/10 text-muted-foreground border-muted/20"
                            >
                              Väntar
                            </Badge>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reports;