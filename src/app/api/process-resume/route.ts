import { getPdfData } from '@/lib/pdf-loader';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid';
import fs from 'fs';
import { generateExtractPdfPrompt, generateImproveResumePrompt, getAiBody } from '@/lib/prompt';
import path from 'path';

export const maxDuration = 100;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const prompt = generateImproveResumePrompt(JSON.stringify(data.resumeObj));

    const body = JSON.stringify(getAiBody(prompt));

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
      return NextResponse.json({ message: 'Unable to process resume.' }, { status: 500 });
    }

    return NextResponse.json(json.generations[0].text);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
