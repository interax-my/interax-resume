import { NextResponse } from "next/server";
import { generateExtractPdfPrompt, getAiBody } from "@/lib/prompt";

export async function POST(request: Request) 
{  
    try {
        const data = await request.json();
        const body = JSON.stringify(getAiBody(generateExtractPdfPrompt(data.content)));
        const response = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
            },
            body,
        });

        if (!response.ok) {
            return NextResponse.json(await response.text(), {
              status: response.status,
            });
        }

        const json = await response.json();
        
        if (json.generations.length === 0) {
            return NextResponse.json({ message: 'Unable to extract resume data.' }, { status: 500 });
        }
          
        return NextResponse.json({ data: json.generations[0].text });
    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}