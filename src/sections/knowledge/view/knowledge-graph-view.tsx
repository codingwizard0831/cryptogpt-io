'use client';

import { Box } from "@mui/material";

import OrganizationalChart from "src/components/organizational-chart/organizational-chart";

import { KNOWLEDGEBASE_EMPTY_BOTTOM_FOR_INPUT } from "../config-layout";

export default function KnowledgeGraph() {
    return <Box sx={{
        flex: 1,
        width: 1,
        pb: `${KNOWLEDGEBASE_EMPTY_BOTTOM_FOR_INPUT}px`, // for message input
    }}>
        <OrganizationalChart data={SIMPLE_DATA} variant="standard" lineHeight="40px" />
    </Box>
}

const createData = (
    name: string,
    group: string,
    role: string | null,
    avatarUrl: string | null
) => ({
    name,
    group,
    role,
    avatarUrl,
});

const SIMPLE_DATA = {
    ...createData('tasha mcneill', 'root', 'ceo, co-founder', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
    children: [
        {
            ...createData('john stone', 'product design', 'lead', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
            children: [
                {
                    ...createData('rimsha wynn', 'product design', 'senior', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
                    children: null,
                },
            ],
        },
        {
            ...createData('ponnappa priya', 'development', 'lead', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
            children: [
                {
                    ...createData('tyra elliott', 'development', 'senior', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
                    children: [
                        {
                            ...createData(
                                'sheridan mckee',
                                'development',
                                'back end developer',
                                "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                            ),
                            children: [
                                {
                                    ...createData(
                                        'ang li',
                                        'development',
                                        'back end developer',
                                        "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"
                                    ),
                                    children: null,
                                },
                            ],
                        },
                        {
                            ...createData('hope ahmad', 'development', 'front end', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
                            children: null,
                        },
                    ],
                },
            ],
        },
        {
            ...createData('peter stanbridge', 'marketing', 'lead', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
            children: [
                {
                    ...createData('madeline harding', 'marketing', 'support', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
                    children: null,
                },
                {
                    ...createData('eoin medrano', 'marketing', 'content writer', "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg"),
                    children: null,
                },
            ],
        },
    ],
};