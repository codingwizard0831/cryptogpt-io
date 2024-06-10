import jwt from 'jsonwebtoken';

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
    const token = jwt.sign(payload, "process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET", options)
    console.log('signToken: token', token);
    return token;
}

export async function verifyToken(token: string) {
    console.log('verifyToken: token', token);
    console.log('verifyToken: JWT_SECRET', process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET);
    return jwt.verify(token, "process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET")
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