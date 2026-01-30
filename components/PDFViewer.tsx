
import React from 'react';
import { Book } from '../types';

interface PDFViewerProps {
  book: Book;
  onBack: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ book, onBack }) => {
  // O Google Docs Viewer ajuda a renderizar PDFs que possuem restrições de X-Frame-Options no servidor original
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(book.pdfUrl)}&embedded=true`;

  return (
    <div className="fixed inset-0 bg-[#000000] text-white flex flex-col z-50 animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/10 bg-black">
        <button onClick={onBack} className="p-2 transition active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E5C04A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center px-4 overflow-hidden">
          <h2 className="text-[10px] font-black text-[#E5C04A] uppercase tracking-widest truncate max-w-[200px]">{book.title}</h2>
          <p className="text-[8px] text-white/40 font-bold uppercase mt-1">Leitor Digital Liga Executiva</p>
        </div>
        <a 
          href={book.pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-2 transition active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E5C04A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </header>

      {/* PDF View Container */}
      <div className="flex-1 overflow-hidden relative bg-[#F5F5F5]">
        <iframe 
          src={viewerUrl} 
          className="w-full h-full border-none"
          title={book.title}
          allowFullScreen
        />
        
        {/* Camada de suporte caso o carregamento demore ou falhe em alguns dispositivos */}
        <div className="absolute bottom-6 right-6 pointer-events-auto">
           <a 
             href={book.pdfUrl} 
             target="_blank" 
             rel="noopener noreferrer"
             className="bg-[#E5C04A] text-black text-[11px] font-black px-6 py-3 rounded-full shadow-2xl uppercase tracking-wider flex items-center gap-2"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
             </svg>
             Abrir Original
           </a>
        </div>
      </div>

      {/* Mobile Loading Indicator */}
      <div className="h-1.5 bg-white/5">
        <div className="h-full bg-[#E5C04A] w-1/3 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PDFViewer;
