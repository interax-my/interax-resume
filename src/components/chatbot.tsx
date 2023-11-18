import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bot, Forward, Maximize2, Minus, Send, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/seperator';
import axios from 'axios';
import BouncingDotsLoader from '@/components/bouncing-dots';

function Chatbot() {
    const [messages, setMessages] = useState<{ isUser: boolean; txt: string; }[]>([]);
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);

    const sendMessage = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!input) return;
        const message = input;
        setInput('');
        setIsLoading(true);

        setMessages(prevMessages => [...prevMessages, { isUser: true, txt: message }]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

        setConversationId(conversationId ?? Math.random().toString(36).substring(2, 15));

        axios.post('api/chat', { message: message, conversationId: conversationId })
        .then(response => {
            setMessages(prevMessages => [...prevMessages, { isUser: false, txt: response.data }]);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const toggleChat = () => {
        setIsMinimized(!isMinimized);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
    <Card className={`fixed bottom-0 right-0 p-4 rounded shadow flex flex-col space-between ${isMinimized ? 'w-60 h-12' : 'h-4/5 md:h-[72vh] md:w-96 w-full'}`}>
        <Button variant='ghost' asChild onClick={ toggleChat} className='p-0 cursor-pointer flex justify-between '>
            <div className="flex justify-between items-center">
                <Label className='text-primary'>{ isMinimized && 'Ask us anything' }</Label>
                { isMinimized ? <Maximize2 className='text-primary h-4 w-4' /> : <Minus className='text-primary h-4 w-4' /> }
            </div>
        </Button>
        {!isMinimized && (
        <>
            <Separator className='mt-2' />
            <div className="p-4 flex flex-col flex-grow mt-auto overflow-y-auto gap-2">
                {messages.map((message, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                    <div className="grid grid-cols-8 gap-1">
                        { message.isUser ? <User className='mr-1 text-primary col-span-1'/> : <Bot className='mr-1 text-primary col-span-1'/>  }
                        <span className='col-span-7 text-sm'>{message.txt}</span>
                    </div>
                    {index < messages.length - 1 && (
                        <Separator className="my-1 opacity-50" />
                    )}
                </div>
                ))}
                { isLoading && (
                <div className="flex flex-col items-start gap-2">
                    <Separator className="my-1 opacity-50" />
                    <div className="grid grid-cols-8 gap-1">
                        <Bot className='mr-1 text-primary col-span-1'/>
                        <div className='col-span-7 pt-2'>
                            <BouncingDotsLoader />
                        </div>
                    </div>
                </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex justify-between gap-1">
                <Input
                    className='focus-visible:ring-transparent'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button type="submit" size="icon" disabled={ !input || isLoading }>
                    <Forward className="h-4 w-4" />
                </Button>
            </form>
        </>
        )}
    </Card>
    );
}

export default Chatbot;