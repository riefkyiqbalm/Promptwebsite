import { NextRequest, NextResponse } from "next/server";
import constData from "@/app/lib/content.json";

const data = constData
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const segment = constData.filter(item => item.segment === 'Engineering')
    const id = searchParams.get("id");
    return NextResponse.json({ status: 200, segment });
}
