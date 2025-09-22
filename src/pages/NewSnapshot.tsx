import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockAccounts, saveToLocalStorage, loadFromLocalStorage } from '@/lib/data';

const NewSnapshot = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  
  const [balances, setBalances] = useState(() => {
    const initial: Record<string, number> = {};
    mockAccounts.forEach(account => {
      initial[account.type] = account.balance;
    });
    return initial;
  });

  const handleBalanceChange = (accountType: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setBalances(prev => ({
      ...prev,
      [accountType]: numValue
    }));
  };

  const handleSave = () => {
    const netWorth = Object.values(balances).reduce((sum, val) => sum + val, 0);
    
    const newSnapshot = {
      period,
      netWorth,
      accounts: balances
    };

    // Load existing snapshots and add the new one
    const existingSnapshots = loadFromLocalStorage('financial-snapshots', []);
    const updatedSnapshots = [...existingSnapshots, newSnapshot];
    
    // Sort by period to maintain chronological order
    updatedSnapshots.sort((a, b) => a.period.localeCompare(b.period));
    
    saveToLocalStorage('financial-snapshots', updatedSnapshots);
    
    navigate('/snapshots');
  };

  const totalNetWorth = Object.values(balances).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" asChild>
          <Link to="/snapshots">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tillbaka
          </Link>
        </Button>

        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Ny snapshot
          </h1>
          <p className="text-sm text-muted-foreground">
            Skapa en ny månatlig snapshot av din förmögenhet.
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Snapshot-detaljer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Period */}
              <div className="space-y-2">
                <Label htmlFor="period">Period (YYYY-MM)</Label>
                <Input
                  id="period"
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="2024-01"
                  className="bg-input border-border"
                />
              </div>

              {/* Account Balances */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Kontosaldon
                </h3>
                
                {Object.entries(balances).map(([accountType, balance]) => (
                  <div key={accountType} className="space-y-2">
                    <Label htmlFor={accountType}>{accountType}</Label>
                    <div className="relative">
                      <Input
                        id={accountType}
                        type="number"
                        value={balance}
                        onChange={(e) => handleBalanceChange(accountType, e.target.value)}
                        placeholder="0"
                        className="bg-input border-border pr-12"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                        SEK
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Summary Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Sammanfattning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Period</p>
                <p className="font-semibold text-foreground">{period}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Total förmögenhet</p>
                <p className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat('sv-SE', {
                    style: 'currency',
                    currency: 'SEK',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(totalNetWorth)}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 space-y-2">
                {Object.entries(balances).map(([accountType, balance]) => (
                  <div key={accountType} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{accountType}:</span>
                    <span className="text-sm font-medium text-foreground">
                      {((balance / totalNetWorth) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={handleSave}
              className="w-full gradient-primary text-primary-foreground"
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              Spara snapshot
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/snapshots">
                Avbryt
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewSnapshot;