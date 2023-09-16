import { NextResponse } from "next/server";
import { tablesService } from "../lib/ioc-container/ioc-container";

export async function GET(request: Request) {
    return NextResponse.json(await tablesService.findAll());
}