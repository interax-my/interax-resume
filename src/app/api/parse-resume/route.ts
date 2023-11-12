import { getPdfData } from "@/lib/pdf-loader";
import { NextResponse } from "next/server";
import { v4 } from "uuid";
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) 
{  
    try {
        const data = await request.json();
        const fileBuffer = Buffer.from(data.file, 'base64');
        const fileName = v4() + '.pdf';
        const filePath = path.join(process.cwd(), 'uploads', fileName);

        await fs.promises.writeFile(filePath, fileBuffer);

        const result = await getPdfData(filePath);

        if (result.length == 0) {
            return NextResponse.json({ message: 'Unable to read pdf' }, { status: 500 });
        }

        return NextResponse.json({ data: result[0].pageContent });
    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 500 });
    }
}