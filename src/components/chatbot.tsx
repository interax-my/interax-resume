import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bot, Forward, Maximize2, Minus, Send, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/seperator';

function Chatbot() {
    const [messages, setMessages] = useState<{ isUser: boolean; txt: string; }[]>([]);
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(true);
    const responses = ['Hello! How can I assist you today?', 'Thank you for your message!'];
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!input) return;
        const randomIndex = Math.floor(Math.random() * responses.length);
        const response = responses[randomIndex];
        setMessages([...messages, { isUser: true, txt: input }, { isUser: false, txt: response}]);
        setInput('');
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const toggleChat = () => {
        setIsMinimized(!isMinimized);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
    <Card className={`fixed bottom-0 right-0 h-12 p-4 rounded shadow flex flex-col space-between ${isMinimized ? 'w-60' : 'md:h-[60vh] w-96'}`}>
        <div className="flex justify-between items-center">
            <Label className='text-primary'>{ isMinimized && 'Ask us anything' }</Label>
            <button onClick={ toggleChat} >{ isMinimized ? <Maximize2 className='text-primary h-4 w-4' /> : <Minus className='text-primary h-4 w-4' /> }</button>
        </div>
        {!isMinimized && (
        <>
            <Separator className='mt-2' />
            <div className="p-4 rounded shadow flex flex-col flex-grow mt-auto overflow-y-auto gap-2">
                {messages.map((message, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                    <div className="flex">
                        { message.isUser ? <User className='mr-1 text-primary'/> : <Bot className='mr-1 text-primary'/>  }
                        <span>{message.txt}</span>
                    </div>
                    {index < messages.length - 1 && (
                        <Separator className="my-1 opacity-50" />
                    )}
                </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex justify-between gap-1">
                <Input
                    className='focus-visible:ring-transparent'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                 <Button type="submit" size="icon" disabled={ !input }>
                    <Forward className="h-4 w-4" />
                </Button>
            </form>
        </>
        )}
    </Card>
    );
}

export default Chatbot;