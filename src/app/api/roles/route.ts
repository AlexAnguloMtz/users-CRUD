import { NextResponse } from "next/server";
import { rolesService } from "../lib/ioc-container/ioc-container";
import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";
import { HttpStatus } from "@/app/common/utils/HttpStatus";
import { ConflictException } from "@/app/common/exceptions/ConflictException";

export async function GET(request: Request) {
    const url: URL = new URL(request.url);
    const search: string | null = url.searchParams.get("search")
    const name: string | null = url.searchParams.get("name")
    console.log('name = ' + name);
    console.log('search = ' + search);
    if (search != null && search.length > 0) {
        return NextResponse.json(await rolesService.search(search));
    }
    if (name != null && name.length > 0) {
        console.log('Inside name if statement');
        return NextResponse.json(await rolesService.findByName(name));
    }
    return NextResponse.json(await rolesService.findAll());
}

export async function POST(request: Request) {
    try {
        await rolesService.create(await request.json() as RoleCreationRequest);
        return NextResponse.json({}, { status: HttpStatus.CREATED });
    } catch (e) {
        if (e instanceof ConflictException) {
            return NextResponse.json({}, { status: HttpStatus.CONFLICT });
        } else {
            return NextResponse.json({}, { status: HttpStatus.INTERNAL_SERVER_ERROR });
        }
    }
}

export async function PUT(request: Request) {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")
    if (name) {
        return NextResponse.json(await rolesService.update(name, await request.json()));
    }
    throw new Error('Invalid query parameters');
}