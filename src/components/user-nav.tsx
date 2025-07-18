import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Award } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { mockVolunteers } from '@/lib/data';

export function UserNav() {
  const pathname = usePathname();
  const isVolunteer = pathname.includes('volunteer');
  const volunteerPoints = isVolunteer ? mockVolunteers[0].points : 0; // Demo points

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        {isVolunteer && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-transparent cursor-default">
              <Award className="mr-2 h-4 w-4 text-primary" />
              <span>{volunteerPoints} Points</span>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/" prefetch={false}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
