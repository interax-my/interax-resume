import { NextResponse } from "next/server";
import { StreamingTextResponse, CohereStream } from 'ai';
import { getChatDocuments } from "@/lib/prompt";

export const maxDuration = 100;
export const runtime = 'edge'

export async function POST(request: Request) 
{
    try {
        const data = await request.json();


        const body = JSON.stringify({
            message: data.message,
            conversation_id: data.conversation_id,
            stream: true,
            documents: getChatDocuments(),
          })
        
          const response = await fetch('https://api.cohere.ai/v1/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.COHERE_API_KEY}`
            },
            body
          })
        
          const stream = CohereStream(response)
        
          return new StreamingTextResponse(stream)
    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}