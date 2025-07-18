import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

export function ChatWindow() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Chat with Helper</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/02.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="rounded-lg bg-secondary p-3 text-sm">
            <p className="font-semibold">John (Volunteer)</p>
            <p>Hey! I've accepted your request. I'm about 5 minutes away.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="rounded-lg bg-primary text-primary-foreground p-3 text-sm">
             <p className="font-semibold">You</p>
            <p>Great, thank you so much! I'm in a blue sedan.</p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <div className="relative">
          <Input placeholder="Type a message..." className="pr-12" />
          <Button type="submit" size="icon" className="absolute top-1/2 right-1.5 -translate-y-1/2 h-7 w-7">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
