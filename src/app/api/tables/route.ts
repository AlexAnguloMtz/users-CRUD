import { NextResponse } from "next/server";
import { tablesService } from "../lib/ioc-container/ioc-container";

export async function GET() {
    return NextResponse.json({
        'tables': await tablesService.findAll()
    });
}