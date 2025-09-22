import { useState } from 'react';
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockAccounts, formatSEK, Account } from '@/lib/data';

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [newBalance, setNewBalance] = useState<string>('');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');

  const updateAccountBalance = (accountId: string, balance: number) => {
    setAccounts(prev => prev.map(account => 
      account.id === accountId 
        ? { ...account, balance }
        : account
    ));
    setNewBalance('');
    setSelectedAccountId('');
  };

  const handleBalanceSubmit = () => {
    const balance = parseFloat(newBalance);
    if (!isNaN(balance) && selectedAccountId) {
      updateAccountBalance(selectedAccountId, balance);
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Bank':
        return 'bg-positive/10 text-positive border-positive/20';
      case 'Avanza ISK':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Krypto':
        return 'bg-yellow/10 text-yellow border-yellow/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

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
            Konton
          </h1>
          <p className="text-sm text-muted-foreground">
            Hantera dina finansiella konton och saldon.
          </p>
        </div>

        <Button className="gradient-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Nytt konto
        </Button>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Översikt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Totalt saldo</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatSEK(totalBalance)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Antal konton</p>
                <p className="text-2xl font-bold text-foreground">
                  {accounts.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Genomsnittligt saldo</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatSEK(totalBalance / accounts.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="glass-card card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {account.name}
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`mt-2 ${getAccountTypeColor(account.type)}`}
                    >
                      {account.type}
                    </Badge>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Redigera
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-negative">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Ta bort
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Aktuellt saldo
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {formatSEK(account.balance)}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Andel av totalt:</span>
                      <span className="font-medium text-foreground">
                        {((account.balance / totalBalance) * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full bg-positive/10 text-positive border-positive/20 hover:bg-positive/20"
                          onClick={() => setSelectedAccountId(account.id)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Uppdatera saldo
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card">
                        <DialogHeader>
                          <DialogTitle>Uppdatera saldo för {account.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="balance">Nytt saldo (SEK)</Label>
                            <Input
                              id="balance"
                              type="number"
                              placeholder="0"
                              value={newBalance}
                              onChange={(e) => setNewBalance(e.target.value)}
                              className="glass-card"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={handleBalanceSubmit}
                              className="flex-1 bg-positive text-positive-foreground hover:bg-positive/90"
                            >
                              Spara
                            </Button>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1">
                                Avbryt
                              </Button>
                            </DialogTrigger>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;