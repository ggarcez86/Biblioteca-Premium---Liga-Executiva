
import { Book } from './types';

export const CLIENT_CONFIG = {
  logoName: "LIGA EXECUTIVA",
  welcomeTitle: "Seja Bem-Vindo à biblioteca premium do Proença",
  welcomeSubtitle: "Venha aprender e crescer conosco.",
  googleSheetsUrl: "https://script.google.com/macros/s/AKfycbzxKGnRGZO6sjTZ46TYF8HbQ6zYNhVVvwLOx8w-L5sAg47kb3vJNnkd6FWUWefpBTWPtQ/exec"
};

export const MOCK_BOOKS: Book[] = [
  {
    id: 'ia-executiva-1',
    title: 'Guia Prático Diário - Executivo com IA Corporativa',
    author: 'LIGA EXECUTIVA',
    coverUrl: 'https://ligaexecutiva.com.br/Tela%20de%20captura%20de%20dados.png',
    pdfUrl: 'https://ligaexecutiva.com.br/Guia-Pratico-Diario-Executivo-com-IA-Corporativa.pdf',
    category: 'IA Corporativa',
    description: 'Um guia prático para executivos dominarem a IA no ambiente corporativo.',
    content: 'Este guia foi desenvolvido para transformar a rotina do executivo moderno através de ferramentas de inteligência artificial aplicadas à produtividade e estratégia...',
    isNew: true
  }
];
