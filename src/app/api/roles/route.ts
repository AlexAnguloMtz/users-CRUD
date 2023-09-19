import { NextResponse } from "next/server";
import { rolesService } from "../lib/ioc-container/ioc-container";
import { RoleCreationRequest } from "@/app/common/dtos/requests/RoleCreationRequest";
import { HttpStatus } from "@/app/common/utils/HttpStatus";
import { ConflictException } from "@/app/common/exceptions/ConflictException";

export async function GET(request: Request) {
    const url: URL = new URL(request.url);
    const search: string | null = url.searchParams.get("search")
    const rolname: string | null = url.searchParams.get("rolname")
    if (search !== null && search.length > 0) {
        return NextResponse.json(await rolesService.search(search));
    }
    if (rolname !== null && rolname.length > 0) {
        return NextResponse.json(await rolesService.findByName(rolname));
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
    const name = url.searchParams.get("rolname")
    if (name) {
        return NextResponse.json(await rolesService.update(name, await request.json()));
    }
    throw new Error('Invalid query parameters');
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const rolname = url.searchParams.get("rolname")
    if (rolname) {
        await rolesService.delete(rolname);
        return NextResponse.json({ 'deleted': true }, { status: HttpStatus.OK });
    }
    throw new Error('Invalid query parameters');
}