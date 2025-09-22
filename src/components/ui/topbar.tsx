import { Search, Bell, Settings, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

const teamMembers = [
  { id: '1', name: 'Anna', avatar: '/api/placeholder/32/32' },
  { id: '2', name: 'Erik', avatar: '/api/placeholder/32/32' },
  { id: '3', name: 'Sara', avatar: '/api/placeholder/32/32' },
];

export function Topbar() {
  return (
    <header className="h-16 border-b border-border/50 bg-card/30 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-foreground hover:bg-muted" />
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sök konton, transaktioner..."
            className="pl-10 w-80 bg-muted/50 border-muted-foreground/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Team member avatars */}
        <div className="flex -space-x-2">
          {teamMembers.map((member) => (
            <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {member.name[0]}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-negative flex items-center justify-center">
            <span className="text-xs text-white">2</span>
          </span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/api/placeholder/32/32" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">Johan Doe</span>
                <span className="text-xs text-muted-foreground">Portfolio Manager</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card">
            <DropdownMenuLabel>Mitt konto</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Inställningar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-negative">
              Logga ut
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}