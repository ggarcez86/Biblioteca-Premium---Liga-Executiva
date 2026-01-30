
import React, { useState, useEffect, useRef } from 'react';
import { Book, ReaderTheme } from '../types';
import { summarizeContent, generateSpeech, decode, decodeAudioData } from '../services/geminiService';

interface ReaderProps {
  book: Book;
  onBack: () => void;
  openAI: (context: string) => void;
}

const Reader: React.FC<ReaderProps> = ({ book, onBack, openAI }) => {
  const [theme, setTheme] = useState<ReaderTheme>('light');
  const [fontSize, setFontSize] = useState(20);
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const themeClasses = {
    light: 'bg-white text-gray-900',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
    dark: 'bg-gray-900 text-gray-200'
  };

  const handleSummarize = async () => {
    setLoadingSummary(true);
    try {
      const res = await summarizeContent(book.content);
      setSummary(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleReadAloud = async () => {
    if (isReading) return;
    setIsReading(true);
    
    try {
      const audioData = await generateSpeech(book.content.substring(0, 1000)); // Limiting for demo
      if (audioData) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const decoded = decode(audioData);
        const buffer = await decodeAudioData(decoded, ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsReading(false);
        source.start();
      }
    } catch (e) {
      console.error(e);
      setIsReading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ${themeClasses[theme]}`}>
      {/* Reader Header */}
      <header className="flex items-center justify-between p-4 border-b border-opacity-20 border-gray-400">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-black hover:bg-opacity-5 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="font-bold text-lg leading-tight truncate max-w-[200px] md:max-w-md">{book.title}</h1>
            <p className="text-xs opacity-70">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-black bg-opacity-5 rounded-lg p-1">
            {(['light', 'sepia', 'dark'] as ReaderTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 text-xs rounded-md transition ${theme === t ? 'bg-white shadow-sm text-black font-semibold' : 'opacity-60'}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
              className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg text-sm font-bold"
            >A-</button>
            <button 
              onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
              className="p-2 hover:bg-black hover:bg-opacity-5 rounded-lg text-lg font-bold"
            >A+</button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-6 md:p-12 lg:p-24 flex justify-center">
        <article className="max-w-2xl w-full">
          <div 
            className="font-serif leading-relaxed text-justify space-y-6"
            style={{ fontSize: `${fontSize}px` }}
          >
            {book.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>

        {/* Floating AI Panel Button */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-3">
          <button 
            onClick={handleSummarize}
            disabled={loadingSummary}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loadingSummary ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-medium">Resumo IA</span>
          </button>

          <button 
            onClick={handleReadAloud}
            className={`flex items-center gap-2 ${isReading ? 'bg-red-500' : 'bg-emerald-600'} hover:opacity-90 text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105`}
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{isReading ? 'Lendo...' : 'Narração'}</span>
          </button>

          <button 
            onClick={() => openAI(book.content)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Perguntar</span>
          </button>
        </div>
      </main>

      {/* Summary Modal (inline for simplicity) */}
      {summary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white text-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Resumo da Inteligência Artificial
              </h2>
              <button onClick={() => setSummary(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose prose-indigo">
              <p className="leading-relaxed">{summary}</p>
            </div>
            <button 
              onClick={() => setSummary(null)}
              className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reader;
