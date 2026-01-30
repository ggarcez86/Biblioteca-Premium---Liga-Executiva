
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

      {/* Content Area - Agora com scroll garantido pelo h-screen no pai */}
      <div className="flex-1 overflow-y-auto px-8 md:px-32 lg:px-60 pb-40 touch-pan-y">
        
        {/* Badge - Recentes */}
        <div className="mb-4 md:mb-6 flex justify-start">
          <span className="px-5 py-1.5 rounded-full font-bold bg-[#E5C04A] text-black shadow-lg shadow-yellow-600/10 text-[10px] uppercase tracking-wider">
            Recentes
          </span>
        </div>

        {/* Lista de Livros - Alinhados à esquerda */}
        <div className="flex flex-col items-start gap-10 md:gap-14">
          {MOCK_BOOKS.map(book => (
            <div key={book.id} className="flex flex-col items-start w-full max-w-[180px] md:max-w-[240px] animate-in slide-in-from-left duration-700">
              
              {/* Container da Capa - Sem max-h para evitar cortes e com object-contain */}
              <div className="w-full rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 group transition-transform active:scale-95 bg-[#111]">
                <img 
                  src={book.coverUrl} 
                  className="w-full h-auto block object-contain" 
                  alt={book.title} 
                />
                {book.isNew && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-[#E5C04A] text-black text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded italic shadow-md">NOVO</div>
                )}
              </div>
              
              {/* Título e Autor - Visíveis abaixo da capa inteira */}
              <div className="mt-4 md:mt-6 text-start space-y-1.5 w-full">
                <h3 className="text-[#E5C04A] font-bold text-xs md:text-base leading-tight uppercase">
                  {book.title}
                </h3>
                <p className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                  {book.author}
                </p>
              </div>

              {/* Botão Abrir */}
              <button 
                onClick={() => onSelectBook(book)}
                className="mt-4 md:mt-6 w-full bg-[#E5C04A] hover:bg-[#D4A017] text-black py-4 rounded-xl md:rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all active:translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Abrir
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
