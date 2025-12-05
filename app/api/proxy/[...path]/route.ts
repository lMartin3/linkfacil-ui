// noinspection ES6RedundantAwait

import { NextRequest, NextResponse } from "next/server";
import {getJwtFromCookie} from "@/lib/server/cookies";

async function handleProxy(
    method: string,
    req: NextRequest,
    path: string[]
): Promise<NextResponse> {
    const url = new URL(`${process.env.API_BASE_URL}/${path.join("/")}`);
    url.search = new URL(req.url).search;

    const accessToken = await getJwtFromCookie()

    const body = ["POST", "PUT", "PATCH", "DELETE"].includes(method)
        ? await req.text()
        : undefined;

    const headers = new Headers(req.headers);


    console.log(accessToken)
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const response = await fetch(url, {
        method,
        headers,
        body,
    })

    const data = await response.text();

    return new NextResponse(data, {
        status: response.status,
        headers: response.headers,
    });
}


function makeHandler(method: string) {
    return async (req: NextRequest, { params }: { params: Promise<{path: string[]}> }) => {
        return handleProxy(method, req, (await params).path);
    };
}

export const GET = makeHandler("GET");
export const POST = makeHandler("POST");
export const PUT = makeHandler("PUT");
export const PATCH = makeHandler("PATCH");
export const DELETE = makeHandler("DELETE");