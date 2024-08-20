import { NextRequest, NextResponse } from "next/server";

const { HUGGING_FACE_API_KEY } = process.env;
const { HUGGING_FACE_API_URL } = process.env

export async function GET(req: NextRequest) {
    if (!HUGGING_FACE_API_KEY) {
        return NextResponse.json({ error: "Hugging Face API key is not set" }, { status: 500 });
    }
    try {
        let allModels: any[] = [];
        let offset = 0;
        const limit = 100;
        let hasMore = true;

        while (hasMore) {
            // eslint-disable-next-line no-await-in-loop
            const response = await fetch(
                `${HUGGING_FACE_API_URL}/models?filter='text-generation&limit=${limit}&offset=${offset}`,
                {
                    headers: {
                        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(response)

            if (!response.ok) {
                throw new Error("Failed to fetch models from Hugging Face");
            }

            // eslint-disable-next-line no-await-in-loop
            const data = await response.json();
            allModels = [...allModels, ...data];

            if (data.length < limit) {
                hasMore = false;
            } else {
                offset += limit;
            }

            // eslint-disable-next-line no-await-in-loop
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const transformedData = allModels.map((model: any) => ({
            id: model.id,
            modelId: model.modelId,
            downloads: model.downloads,
            likes: model.likes,
            private: model.private,
            author: model.author,
            lastModified: model.lastModified,
        }));

        return NextResponse.json(transformedData);

    } catch (error) {
        console.log('Error fetching models: ', error);
        return NextResponse.json({ error }, { status: 500 })
    }
}