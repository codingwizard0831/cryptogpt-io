import create from 'zustand';

type Audio = any

// Define the structure of a message
interface Message {
  question: string;
  id: number;
  answer?: any; // Define a more specific type if possible
  speech?: string;
  audioPlayer?: Audio;
  visemes?: any; // Define a more specific type if possible
}

// Define the state structure
interface AITeacherState {
  messages: Message[];
  currentMessage: Message | null;
  teacher: string;
  classroom: string;
  loading: boolean;
  furigana: boolean;
  english: boolean;
  speech: string;
  setTeacher: (teacher: string) => void;
  setClassroom: (classroom: string) => void;
  setFurigana: (furigana: boolean) => void;
  setEnglish: (english: boolean) => void;
  setSpeech: (speech: string) => void;
  askAI: (question: string) => Promise<void>;
  playMessage: (message: Message) => Promise<void>;
  stopMessage: (message: Message) => void;
}

export const teachers = ['Nanami', 'Naoki'];

export const useAITeacher = create<AITeacherState>((set, get) => ({
  messages: [],
  currentMessage: null,
  teacher: teachers[0],
  classroom: 'default',
  loading: false,
  furigana: true,
  english: true,
  speech: 'formal',
  setTeacher: (teacher) => {
    set(() => ({
      teacher,
      messages: get().messages.map((message) => {
        // Adjusted to set audioPlayer to undefined instead of null
        const updatedMessage = { ...message, audioPlayer: undefined }; // New teacher, new voice
        return updatedMessage;
      }),
    }));
  },
  setClassroom: (classroom) => {
    set(() => ({
      classroom,
    }));
  },
  setFurigana: (furigana) => {
    set(() => ({
      furigana,
    }));
  },
  setEnglish: (english) => {
    set(() => ({
      english,
    }));
  },
  setSpeech: (speech) => {
    set(() => ({
      speech,
    }));
  },
  askAI: async (question) => {
    if (!question) {
      return;
    }
    const message: Message = {
      question,
      id: get().messages.length,
    };
    set(() => ({
      loading: true,
    }));

    // eslint-disable-next-line prefer-destructuring
    const speech = get().speech;

    // Ask AI
    const res = await fetch(`/api/ai?question=${question}&speech=${speech}`);
    const data = await res.json();
    message.answer = data;
    message.speech = speech;

    set(() => ({
      currentMessage: message,
    }));

    set((state) => ({
      messages: [...state.messages, message],
      loading: false,
    }));
    get().playMessage(message);
  },
  playMessage: async (message) => {
    set(() => ({
      currentMessage: message,
    }));

    if (!message.audioPlayer) {
      set(() => ({
        loading: true,
      }));
      // Get TTS
      const audioRes = await fetch(
        `/api/tts?teacher=${get().teacher}&text=${message.answer.japanese
          .map((word: any) => word.word)
          .join(' ')}`
      );
      const audio = await audioRes.blob();
      const visemes = JSON.parse(await audioRes.headers.get('visemes') as string);
      const audioUrl = URL.createObjectURL(audio);
      const audioPlayer = new Audio(audioUrl);

      message.visemes = visemes;
      message.audioPlayer = audioPlayer;
      message.audioPlayer.onended = () => {
        set(() => ({
          currentMessage: null,
        }));
      };
      set(() => ({
        loading: false,
        messages: get().messages.map((m) => {
          if (m.id === message.id) {
            return message;
          }
          return m;
        }),
      }));
    }

    message.audioPlayer.currentTime = 0;
    message.audioPlayer.play();
  },
  stopMessage: (message) => {
    message.audioPlayer?.pause();
    set(() => ({
      currentMessage: null,
    }));
  },
}));
