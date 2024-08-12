import { useRef, useEffect } from "react";

import { Box as MuiBox } from "@mui/material";

import { useAITeacher } from "src/store/strategy/useAITeacher";

// Define TypeScript interfaces for the message structure
interface Message {
    speech: string;
    answer: {
        english: string;
        japanese: JapaneseWord[];
        grammarBreakdown: GrammarBreakdown[];
    };
}

interface JapaneseWord {
    word: string;
    reading?: string;
}

interface GrammarBreakdown {
    english: string;
    japanese: JapaneseWord[];
    chunks: Chunk[];
}

interface Chunk {
    japanese: JapaneseWord[];
    meaning: string;
    grammar: string;
}

export default function DashboardStrategyMessagesList() {
    const messages = useAITeacher((state) => state.messages) as Message[];
    const playMessage = useAITeacher((state) => state.playMessage) as (message: Message) => Promise<void>;
    const { currentMessage } = useAITeacher() as { currentMessage: Message };
    const english = useAITeacher((state) => state.english) as boolean;
    const furigana = useAITeacher((state) => state.furigana) as boolean;
    const classroom = useAITeacher((state) => state.classroom) as string;

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) {
            container.current.scrollTo({
                top: container.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages.length]);

    const renderEnglish = (englishText: string) => (
        <>
            {english && (
                <p className="text-4xl inline-block px-2 rounded-sm font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-300/90 to-white/90">
                    {englishText}
                </p>
            )}
        </>
    );

    const renderJapanese = (japanese: JapaneseWord[]) => (
        <p className="text-white font-bold text-4xl mt-2 font-jp flex flex-wrap gap-1">
            {japanese.map((word, i) => (
                <span key={i} className="flex flex-col justify-end items-center">
                    {furigana && word.reading && (
                        <span className="text-2xl text-white/65">{word.reading}</span>
                    )}
                    {word.word}
                </span>
            ))}
        </p>
    );

    return (
        <MuiBox
            className="p-8 overflow-y-auto flex flex-col space-y-8 bg-transparent opacity-80"
            ref={container}
            sx={{
                width: classroom === "default" ? "1288px" : "2528px",
                height: classroom === "default" ? "676px" : "856px",
            }}
        >
            {messages.length === 0 && (
                <div className="h-full w-full grid place-content-center text-center">
                    <h2 className="text-8xl font-bold text-white/90 italic">
                        Wawa Sensei
                        <br />
                        Japanese Language School
                    </h2>
                    <h2 className="text-8xl font-bold font-jp text-red-600/90 italic">
                        ワワ先生日本語学校
                    </h2>
                </div>
            )}

            {messages.map((message, i) => (
                <div key={i}>
                    <div className="flex">
                        <div className="flex-grow">
                            <div className="flex items-center gap-3">
                                <span
                                    className={`text-white/90 text-2xl font-bold uppercase px-3 py-1 rounded-full  ${message.speech === "formal"
                                        ? "bg-indigo-600"
                                        : "bg-teal-600"
                                        }`}
                                >
                                    {message.speech}
                                </span>
                                {renderEnglish(message.answer.english)}
                            </div>

                            {renderJapanese(message.answer.japanese)}
                        </div>
                        {currentMessage === message ? (
                            <button
                                type="button"
                                className="text-white/65"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-16 h-16"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="text-white/65"
                                onClick={() => playMessage(message)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-16 h-16"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                    <div className="p-5 mt-5  bg-gradient-to-br from-pink-200/20 to-pink-500/20 rounded-xl">
                        <span className="pr-4 italic bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
                            Grammar Breakdown
                        </span>
                        {message.answer.grammarBreakdown.map((grammar, _index) => (
                            <div key={_index} className="mt-3">
                                {message.answer.grammarBreakdown.length > 1 && (
                                    <>
                                        {renderEnglish(grammar.english)}
                                        {renderJapanese(grammar.japanese)}
                                    </>
                                )}

                                <div className="mt-3 flex flex-wrap gap-3 items-end">
                                    {grammar.chunks.map((_chunk, _i) => (
                                        <div key={_i} className="p-2 bg-black/30 rounded-md">
                                            <p className="text-white/90 text-4xl font-jp">
                                                {renderJapanese(_chunk.japanese)}
                                            </p>
                                            <p className="text-pink-300/90 text-2xl">
                                                {_chunk.meaning}
                                            </p>
                                            <p className="text-blue-400/90 text-2xl">
                                                {_chunk.grammar}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </MuiBox>
    );
};