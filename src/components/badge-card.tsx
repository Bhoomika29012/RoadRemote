'use client';

import type { Badge } from '@/lib/data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BadgeCardProps {
  badge: Badge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const Icon = badge.icon;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/50 transition-colors">
            <div className="p-2 bg-primary/10 rounded-md">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{badge.name}</p>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{badge.name}: {badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
