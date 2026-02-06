
import React from 'react';
import { Book } from '../types';
import { MOCK_BOOKS } from '../constants';

interface LibraryProps {
  onSelectBook: (book: Book) => void;
  onGoHome: () => void;
}

const Library: React.FC<LibraryProps> = ({ onSelectBook, onGoHome }) => {
  return (
    <div className="h-screen h-[100dvh] bg-[#000000] text-white flex flex-col animate-in fade-in duration-500 overflow-hidden">
      {/* Header Bar - Centralizado e compacto */}
      <header className="px-6 pt-6 md:pt-10 pb-4 md:pb-8 flex flex-col items-center space-y-4 md:space-y-6 text-center shrink-0">
        <div className="w-full max-w-[90px] md:max-w-[130px] overflow-hidden rounded-xl border border-white/5 shadow-2xl">
          <img 
            src="https://ligaexecutiva.com.br/Logo%20-%20Liga%20Executiva%20-%201.webp" 
            alt="Liga Executiva" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        <h1 className="text-xl md:text-4xl font-black text-white uppercase tracking-tight leading-none whitespace-nowrap">
          Minha Biblioteca
        </h1>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-8 md:px-16 lg:px-32 pb-40 touch-pan-y">
        
        {/* Badge - Recentes */}
        <div className="mb-8 md:mb-12 flex justify-center md:justify-start">
          <span className="px-5 py-1.5 rounded-full font-bold bg-[#E5C04A] text-black shadow-lg shadow-yellow-600/10 text-[10px] uppercase tracking-wider">
            Lançamentos Premium
          </span>
        </div>

        {/* Lista de Livros em Grade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16 justify-items-center">
          {MOCK_BOOKS.map(book => (
            <div key={book.id} className="flex flex-col items-center sm:items-start w-full max-w-[200px] md:max-w-[240px] animate-in slide-in-from-bottom duration-700">
              
              {/* Container da Capa */}
              <div 
                onClick={() => onSelectBook(book)}
                className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group transition-all hover:scale-[1.02] active:scale-95 bg-[#111] cursor-pointer"
              >
                <img 
                  src={book.coverUrl} 
                  className="w-full h-full object-cover" 
                  alt={book.title} 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-[#E5C04A] text-black rounded-full p-3 shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                   </div>
                </div>
                {book.isNew && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-[#E5C04A] text-black text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded italic shadow-md z-10">NOVO</div>
                )}
              </div>
              
              {/* Título e Autor */}
              <div className="mt-4 md:mt-6 text-center sm:text-start space-y-1.5 w-full">
                <h3 className="text-[#E5C04A] font-bold text-xs md:text-sm leading-tight uppercase line-clamp-2 h-8 md:h-10">
                  {book.title}
                </h3>
                <p className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  {book.author}
                </p>
              </div>

              {/* Botão Abrir */}
              <button 
                onClick={() => onSelectBook(book)}
                className="mt-4 md:mt-5 w-full bg-[#E5C04A] hover:bg-[#D4A017] text-black py-3.5 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all active:translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Ler Agora
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#000000]/95 border-t border-white/5 px-8 py-5 md:py-7 flex justify-center items-center z-40 backdrop-blur-xl shrink-0">
        <button 
          onClick={onGoHome}
          className="flex flex-col items-center gap-1.5 text-[#E5C04A] transition-all hover:opacity-80 active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Início</span>
        </button>
      </nav>
    </div>
  );
};

export default Library;
