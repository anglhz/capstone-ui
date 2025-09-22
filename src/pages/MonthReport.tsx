import { motion } from 'framer-motion';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MonthReport = () => {
  const { year, month } = useParams();
  
  const monthNames = [
    'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'
  ];
  
  const monthName = monthNames[parseInt(month || '1') - 1];

  const handlePrint = () => {
    window.print();
  };

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
            <Link to={`/reports/${year}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tillbaka
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {monthName} {year}
            </h1>
            <p className="text-sm text-muted-foreground">
              Månadsrapport med detaljerad analys.
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

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Startvärde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-foreground">
              4 250 000 kr
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Slutvärde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-foreground">
              4 400 000 kr
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Månadsförändring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-positive">
              +3.5%
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Absolut förändring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold text-positive">
              +150 000 kr
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Kontouppdelning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg glass-panel">
                  <h4 className="font-medium text-foreground mb-2">Handelsbanken</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start:</span>
                      <span className="text-foreground">1 200 000 kr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Slut:</span>
                      <span className="text-foreground">1 250 000 kr</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Förändring:</span>
                      <span className="text-positive">+4.2%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg glass-panel">
                  <h4 className="font-medium text-foreground mb-2">Avanza ISK</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start:</span>
                      <span className="text-foreground">2 300 000 kr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Slut:</span>
                      <span className="text-foreground">2 400 000 kr</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Förändring:</span>
                      <span className="text-positive">+4.3%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg glass-panel">
                  <h4 className="font-medium text-foreground mb-2">Krypto Portfolio</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start:</span>
                      <span className="text-foreground">750 000 kr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Slut:</span>
                      <span className="text-foreground">750 000 kr</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-muted-foreground">Förändring:</span>
                      <span className="text-muted-foreground">0.0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Månadsanalys</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <div className="text-foreground space-y-4">
              <p>
                <strong>Sammanfattning:</strong> {monthName} {year} visade en stark utveckling med en total tillväxt på 3.5%. 
                Detta motsvarar en ökning om 150 000 kr i absoluta termer.
              </p>
              
              <p>
                <strong>Bästa presterande tillgång:</strong> Avanza ISK-kontot presterade bäst med en tillväxt på 4.3%, 
                drivet av stark utveckling inom tekniksektorn.
              </p>
              
              <p>
                <strong>Stabilaste tillgång:</strong> Bankkontot bibehöll sin stabila utveckling med en modest men säker tillväxt på 4.2%.
              </p>
              
              <p>
                <strong>Observationer:</strong> Kryptoportföljen förblev stabil under månaden utan större svängningar. 
                Detta tyder på en mogen marknad med mindre volatilitet än tidigare perioder.
              </p>

              <p>
                <strong>Rekommendationer:</strong> Baserat på månadens utveckling rekommenderas en fortsatt diversifierad strategi 
                med fokus på långsiktig tillväxt.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MonthReport;