import { NextResponse } from "next/server";
import { rolesService } from "../../lib/ioc-container/ioc-container";

export async function GET(request: Request) {
    return NextResponse.json({
        'count': await rolesService.count()
    });
}