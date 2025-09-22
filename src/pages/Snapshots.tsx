import { useState } from 'react';
import { Plus, Download, Upload, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { initializeData, formatSEK, calculateMetrics, SnapshotData } from '@/lib/data';

const Snapshots = () => {
  const [snapshots] = useState<SnapshotData[]>(() => initializeData());
  const metrics = calculateMetrics(snapshots);

  const exportToCSV = () => {
    const headers = ['Period', 'Net Worth', 'Bank', 'Avanza ISK', 'Krypto'];
    const csvContent = [
      headers.join(','),
      ...snapshots.map(snapshot => [
        snapshot.period,
        snapshot.netWorth,
        snapshot.accounts.Bank || 0,
        snapshot.accounts['Avanza ISK'] || 0,
        snapshot.accounts.Krypto || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `snapshots-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // Here you would parse the CSV and update the snapshots
      console.log('CSV Import:', text);
    };
    reader.readAsText(file);
  };

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
            Snapshots
          </h1>
          <p className="text-sm text-muted-foreground">
            Hantera månatliga snapshots av din förmögenhet.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportera CSV
          </Button>
          
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleImportCSV}
            />
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Importera CSV
              </span>
            </Button>
          </label>

          <Button asChild className="gradient-primary text-primary-foreground">
            <Link to="/snapshots/new">
              <Plus className="h-4 w-4 mr-2" />
              Ny snapshot
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Senaste snapshot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">
              {formatSEK(snapshots[snapshots.length - 1]?.netWorth || 0)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {snapshots[snapshots.length - 1]?.period}
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
            <p className={`text-2xl font-bold ${
              metrics.momChange >= 0 ? 'text-positive' : 'text-negative'
            }`}>
              {metrics.momChange >= 0 ? '+' : ''}{metrics.momChange.toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              vs föregående månad
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Årlig förändring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${
              metrics.ytdChange >= 0 ? 'text-positive' : 'text-negative'
            }`}>
              {metrics.ytdChange >= 0 ? '+' : ''}{metrics.ytdChange.toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              sedan årets början
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Snapshots List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Alla snapshots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {snapshots.slice().reverse().map((snapshot, index) => {
                const previousSnapshot = snapshots[snapshots.length - 2 - index];
                const change = previousSnapshot 
                  ? ((snapshot.netWorth - previousSnapshot.netWorth) / previousSnapshot.netWorth) * 100
                  : 0;

                return (
                  <motion.div
                    key={snapshot.period}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg glass-panel card-hover"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {snapshot.period}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(snapshot.period + '-01').toLocaleDateString('sv-SE', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          {formatSEK(snapshot.netWorth)}
                        </p>
                        {previousSnapshot && (
                          <Badge
                            variant="outline"
                            className={change >= 0 
                              ? 'border-positive/20 text-positive bg-positive/10' 
                              : 'border-negative/20 text-negative bg-negative/10'
                            }
                          >
                            {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Snapshots;