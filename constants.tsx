
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
  },
  {
    id: 'ia-executiva-2',
    title: 'IA Assistente Executivo para E-mails Estratégicos',
    author: 'LIGA EXECUTIVA',
    coverUrl: 'https://ligaexecutiva.com.br/Ia%20assistente%20de%20e-mail.webp',
    pdfUrl: 'https://ligaexecutiva.com.br/Como-Transformar-a-IA-no-Seu-Assistente-Executivo-para-E-mails-Estrategicos.pdf',
    category: 'IA Corporativa',
    description: 'Transforme sua comunicação corporativa com assistentes de IA especializados em e-mails.',
    content: 'Neste volume, exploramos como configurar prompts específicos para redação de e-mails de alta performance, negociações complexas e gestão de agenda...',
    isNew: true
  },
  {
    id: 'ia-executiva-3',
    title: 'Método Matriz Estratégica - Controle sua rotina com IA',
    author: 'LIGA EXECUTIVA',
    coverUrl: 'https://ligaexecutiva.com.br/M%C3%89TODO%20MATRIZ%20ENERG%C3%89TICA.webp',
    pdfUrl: 'https://ligaexecutiva.com.br/Domine-Sua-Rotina-com-o-Metodo-da-Matriz-Estrategica.pdf',
    category: 'IA Corporativa',
    description: 'Aprenda a controlar sua rotina e maximizar sua produtividade utilizando o método da Matriz Estratégica com IA.',
    content: 'Neste material, você aprenderá como aplicar a Matriz Estratégica aliada à Inteligência Artificial para gerenciar seu tempo, priorizar tarefas e otimizar sua rotina executiva...',
    isNew: true
  }
];
