'use client';
import { useState } from 'react';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { roadsideAssistantFlow } from '@/ai/flows/chatbot-flow';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const commonQuestions = [
  "My car won't start, what should I do?",
  "How do I change a flat tire?",
  "What does it mean if my check engine light is on?",
  "I've run out of gas, what are my options?",
];

export function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (query?: string) => {
    const userQuery = query || input;
    if (!userQuery.trim()) return;

    const userMessage: Message = { role: 'user', text: userQuery };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await roadsideAssistantFlow({ query: userQuery });
      const botMessage: Message = { role: 'bot', text: result.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('AI chatbot error:', error);
      const errorMessage: Message = {
        role: 'bot',
        text: 'Sorry, I am having trouble connecting. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="flex flex-col h-full max-h-[70vh]">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-primary" />
            <div>
                <CardTitle>AI Roadside Assistant</CardTitle>
                <CardDescription>Ask for guidance or select a common question.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden p-4">
        <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                    {message.role === 'bot' && (
                        <div className="p-2 bg-primary rounded-full text-primary-foreground">
                            <Bot className="h-5 w-5" />
                        </div>
                    )}
                    <div className={`rounded-lg p-3 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        <p className="font-semibold">{message.role === 'user' ? 'You' : 'Assistant'}</p>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                    </div>
                    {message.role === 'user' && (
                        <div className="p-2 bg-secondary rounded-full text-secondary-foreground">
                            <User className="h-5 w-5" />
                        </div>
                    )}
                </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary rounded-full text-primary-foreground">
                    <Bot className="h-5 w-5" />
                </div>
                <div className="rounded-lg bg-secondary p-3 text-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            </div>
        </ScrollArea>
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
             <div className="space-y-4">
                <p className="text-muted-foreground">Here are some common questions:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {commonQuestions.map((q) => (
                        <Button key={q} variant="outline" size="sm" onClick={() => handleSend(q)} disabled={isLoading}>
                            {q}
                        </Button>
                    ))}
                </div>
             </div>
          </div>
        )}
      </CardContent>
      <div className="p-4 border-t">
        <div className="relative">
          <Input
            placeholder="Type your question..."
            className="pr-12"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 right-1.5 -translate-y-1/2 h-7 w-7"
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
