import { NextResponse } from "next/server";
import { rolesService, tablesService } from "../lib/ioc-container/ioc-container";

export async function GET(request: Request) {
    return NextResponse.json({
        'rolesCount': await rolesService.count(),
        'tablesCount': await tablesService.count(),
    });
}