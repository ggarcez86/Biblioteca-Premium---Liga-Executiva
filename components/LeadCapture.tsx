
import React, { useState } from 'react';
import { saveLeadToSheets } from '../services/leadService';

interface LeadCaptureProps {
  onSuccess: () => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ nome: '', telefone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    setFormData({ ...formData, telefone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || formData.telefone.length < 14) {
      setError('Por favor, preencha todos os campos corretamente.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    const success = await saveLeadToSheets({ ...formData, dataHora: new Date().toLocaleString() });
    if (success) {
      onSuccess();
    } else {
      setError('Erro ao salvar dados. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#000000] flex flex-col items-center justify-center p-6 py-12 animate-in slide-in-from-right duration-500">
      <div className="w-full max-w-sm flex flex-col items-center space-y-6">
        
        {/* Logo Centralizada */}
        <div className="w-full overflow-hidden rounded-[24px] shadow-lg shadow-yellow-900/5 border border-white/5 shrink-0">
          <img 
            src="https://ligaexecutiva.com.br/Logo%20-%20Liga%20Executiva%20-%201.webp" 
            alt="Liga Executiva" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Textos de Chamada */}
        <div className="text-center space-y-1 px-2">
          <h2 className="text-2xl font-bold text-[#FFFFFF] leading-tight font-sans">
            Acesso Exclusivo
          </h2>
          <p className="text-[#A0A0A0] font-normal text-sm font-sans">
            Libere sua biblioteca premium agora.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#E5C04A] uppercase ml-1">Nome Completo</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              required
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-4 text-white focus:border-[#E5C04A] outline-none transition text-sm"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#E5C04A] uppercase ml-1">E-Mail Corporativo</label>
            <input
              type="email"
              placeholder="exemplo@empresa.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-4 text-white focus:border-[#E5C04A] outline-none transition text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-widest text-[#E5C04A] uppercase ml-1">WhatsApp</label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              required
              value={formData.telefone}
              onChange={handlePhoneChange}
              className="w-full bg-[#1A1A1A] border border-white/5 rounded-xl p-4 text-white focus:border-[#E5C04A] outline-none transition text-sm"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E5C04A] hover:bg-[#D4A017] text-[#000000] font-bold py-5 rounded-[50px] text-lg shadow-xl transform transition-all active:scale-95 uppercase tracking-wide mt-2"
          >
            {isSubmitting ? 'Processando...' : 'Acessar Biblioteca'}
          </button>
        </form>

        {/* Rodapé de Segurança */}
        <div className="flex flex-col items-center gap-1 opacity-40 pt-4">
           <div className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
             <span className="text-[8px] uppercase font-bold tracking-widest">Dados Criptografados</span>
           </div>
           <p className="text-[8px] font-medium tracking-wider uppercase">© 2024 Liga Executiva Premium</p>
        </div>
        
      </div>
    </div>
  );
};

export default LeadCapture;
