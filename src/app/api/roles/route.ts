import { NextResponse } from "next/server";
import { rolesService } from "../lib/ioc-container/ioc-container";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")
    if (name) {
        return NextResponse.json(await rolesService.findByName(name));
    }
    return NextResponse.json(await rolesService.findAll());
}

export async function PUT(request: Request) {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")
    if (name) {
        return NextResponse.json(await rolesService.update(name, await request.json()));
    }
    throw new Error('Invalid query parameters');
}