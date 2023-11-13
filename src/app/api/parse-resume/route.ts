import { getPdfData } from "@/lib/pdf-loader";
import { NextResponse } from "next/server";
import { v4 } from "uuid";
import fs from 'fs';
import { generateExtractPdfPrompt, getAiBody } from "@/lib/prompt";
import path from "path";

export const maxDuration = 100;

export async function POST(request: Request) 
{  
    try {
        const data = await request.json();
        const fileBuffer = Buffer.from(data.file, 'base64');
        const fileName = v4() + '.pdf';
        const filePath = process.env.NODE_ENV === 'production' ? `/tmp/${fileName}` : path.join(process.cwd(), 'uploads', fileName);
        
        await fs.promises.writeFile(filePath, fileBuffer);

        const result = await getPdfData(filePath);

        if (result.length == 0) {
            return NextResponse.json({ message: 'Unable to read pdf' }, { status: 500 });
        }

        const body = JSON.stringify(getAiBody(generateExtractPdfPrompt(result[0].pageContent)));

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