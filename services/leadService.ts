
import { LeadData } from '../types';
import { CLIENT_CONFIG } from '../constants';

export const saveLeadToSheets = async (data: LeadData): Promise<boolean> => {
  try {
    if (!CLIENT_CONFIG.googleSheetsUrl) {
      console.warn("URL do Google Sheets não configurada.");
      return true;
    }

    // Preparando o payload conforme solicitado (JSON)
    const payload = {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      origem: 'App Biblioteca Premium',
      data_hora: data.dataHora
    };

    /**
     * IMPORTANTE: Google Apps Script não suporta requisições preflight (OPTIONS).
     * Ao usar 'application/json', o navegador tentará um preflight se não estiver em 'no-cors'.
     * Para garantir compatibilidade com o script do usuário, enviamos o JSON stringificado.
     */
    await fetch(CLIENT_CONFIG.googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors', // Mantido para evitar erro de CORS no Apps Script
      headers: {
        'Content-Type': 'text/plain', // Usamos text/plain para evitar preflight, o script do usuário faz o JSON.parse no rawBody
      },
      body: JSON.stringify(payload),
    });

    // Como usamos 'no-cors', não conseguimos ler o status da resposta,
    // mas o envio é disparado para o script.
    return true;
  } catch (error) {
    console.error("Erro ao enviar lead:", error);
    return false;
  }
};
