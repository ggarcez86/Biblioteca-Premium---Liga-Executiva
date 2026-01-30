
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  pdfUrl: string;
  category: string;
  description: string;
  content: string;
  progress?: number; // 0 a 100
  isNew?: boolean;
}

export interface LeadData {
  nome: string;
  telefone: string;
  email: string;
  dataHora: string;
}

export type AppView = 'welcome' | 'capture' | 'library' | 'viewer';
export type ReaderTheme = 'light' | 'sepia' | 'dark';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface GroundingLink {
  title: string;
  uri: string;
}
