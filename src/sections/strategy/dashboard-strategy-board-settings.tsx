import { cn } from "src/utils/cn";

import { teachers, useAITeacher } from "src/store/strategy/useAITeacher";

export default function DashboardStrategyBoardSettings() {
    const furigana = useAITeacher((state) => state.furigana);
    const setFurigana = useAITeacher((state) => state.setFurigana);

    const english = useAITeacher((state) => state.english);
    const setEnglish = useAITeacher((state) => state.setEnglish);

    const teacher = useAITeacher((state) => state.teacher);
    const setTeacher = useAITeacher((state) => state.setTeacher);

    const speech = useAITeacher((state) => state.speech);
    const setSpeech = useAITeacher((state) => state.setSpeech);

    const classroom = useAITeacher((state) => state.classroom);
    const setClassroom = useAITeacher((state) => state.setClassroom);

    return (
        <>
            <div className="absolute right-0 bottom-full flex flex-row gap-10 mb-20">
                {teachers.map((sensei, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            `p-3 transition-colors duration-500 `,
                            ` ${teacher === sensei ? "bg-white/80" : "bg-white/40"}`
                        )}
                    >
                        {/* Add role, tabIndex, and onKeyDown to make it accessible */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setTeacher(sensei)}
                            onKeyDown={(e) => {
                                // Trigger the action on Enter or Space key press
                                if (e.key === "Enter" || e.key === " ") {
                                    setTeacher(sensei);
                                }
                            }}
                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" // Example focus style
                        >
                            <img
                                src={`/images/${sensei}.jpg`}
                                alt={sensei}
                                className="object-cover w-40 h-40"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mt-3 text-center">{sensei}</h2>
                    </div>
                ))}
            </div>
            <div className="absolute left-0 bottom-full flex flex-row gap-2 mb-20">
                <button
                    type="button" // Explicitly setting the button type
                    className={`${classroom === "default"
                        ? "text-white bg-slate-900/40 "
                        : "text-white/45 bg-slate-700/20 "
                        } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
                    onClick={() => setClassroom("default")}
                >
                    Default classroom
                </button>
                <button
                    type="button" // Explicitly setting the button type
                    className={`${classroom === "alternative"
                        ? "text-white bg-slate-900/40 "
                        : "text-white/45 bg-slate-700/20 "
                        } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
                    onClick={() => setClassroom("alternative")}
                >
                    Alternative classroom
                </button>
            </div>
            <div className="absolute left-0 top-full flex flex-row gap-2 mt-20">
                <button
                    type="button"
                    className={`${speech === "formal"
                        ? "text-white bg-slate-900/40 "
                        : "text-white/45 bg-slate-700/20 "
                        } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
                    onClick={() => setSpeech("formal")}
                >
                    Formal
                </button>

                <button
                    type="button"
                    className={` ${speech === "casual"
                        ? "text-white bg-slate-900/40 "
                        : "text-white/45 bg-slate-700/20 "
                        } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
                    onClick={() => setSpeech("casual")}
                >
                    Casual
                </button>
            </div>
            <div className="absolute right-0 top-full flex flex-row gap-2 mt-20">
                <button
                    type="button"
                    className={` ${furigana
                        ? "text-white bg-slate-900/40 "
                        : "text-white/45 bg-slate-700/20 "
                        } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
                    onClick={() => setFurigana(!furigana)}
                >
                    Furigana
                </button>
                <button
                    type="button"
                    className={`${english
                        ? "text-white bg-slate-900/40 "
                        : "text-white/45 bg-slate-700/20 "
                        } py-4 px-10 text-4xl rounded-full transition-colors duration-500 backdrop-blur-md`}
                    onClick={() => setEnglish(!english)}
                >
                    English
                </button>
            </div>
        </>
    );
};