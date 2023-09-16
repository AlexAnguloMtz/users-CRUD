import { NextResponse } from "next/server";
import { tablesService } from "../lib/ioc-container/ioc-container";

export async function GET(request: Request) {
    if (request.url) {

    }
    return NextResponse.json(await tablesService.findAll());
}