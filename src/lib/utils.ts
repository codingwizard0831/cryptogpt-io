import { SUPABASE_API } from "src/config-global";

const jwt = require('jsonwebtoken');

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init)

    if (!res.ok) {
        const json = await res.json()
        if (json.error) {
            const error = new Error(json.error) as Error & {
                status: number
            }
            error.status = res.status
            throw error
        } else {
            throw new Error('An unexpected error occurred')
        }
    }

    return res.json()
}

export function formatDate(input: string | number | Date): string {
    const date = new Date(input)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

export async function signToken(payload: any, options: any) {
    const token = jwt.sign(payload, SUPABASE_API.jwtSecret, options)
    console.log('signToken: token', token);
    return token;
}

export async function verifyToken(token: string) {
    console.log('verifyToken: token', token);
    console.log('verifyToken: JWT_SECRET', SUPABASE_API.jwtSecret);
    return jwt.verify(token, SUPABASE_API.jwtSecret)
}

export function jsonResponse(status: number, data: any, init?: ResponseInit) {
    return new Response(JSON.stringify(data), {
        ...init,
        status,
        headers: {
            ...init?.headers,
            'Content-Type': 'application/json',
        },
    })
}
