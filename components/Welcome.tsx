
import React from 'react';
import { CLIENT_CONFIG } from '../constants';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="h-screen h-[100dvh] bg-[#000000] overflow-y-auto touch-pan-y animate-in fade-in duration-700">
      <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
        {/* Container compacto */}
        <div className="w-full max-w-sm flex flex-col items-center space-y-8">
          
          {/* Logo Centralizada */}
          <div className="w-full overflow-hidden rounded-[24px] shadow-lg shadow-yellow-900/5 border border-white/5 shrink-0">
            <img 
              src="https://ligaexecutiva.com.br/Logo%20-%20Liga%20Executiva%20-%201.webp" 
              alt="Liga Executiva" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Textos */}
          <div className="text-center space-y-2 px-2">
            <h2 className="text-3xl font-bold text-[#FFFFFF] leading-tight font-sans">
              {CLIENT_CONFIG.welcomeTitle}
            </h2>
            <p className="text-[#A0A0A0] font-normal text-lg font-sans">
              {CLIENT_CONFIG.welcomeSubtitle}
            </p>
          </div>

          {/* Botão Pílula */}
          <button 
            onClick={onStart}
            className="w-[90%] bg-[#E5C04A] hover:bg-[#D4A017] text-[#000000] font-bold py-5 rounded-[50px] text-lg shadow-xl transform transition-all active:scale-95 uppercase tracking-wide"
          >
            Comece Agora
          </button>

        </div>
      </div>
    </div>
  );
};

export default Welcome;
