
import React, { useState } from 'react';
import { Book, AppView } from './types';
import Welcome from './components/Welcome';
import LeadCapture from './components/LeadCapture';
import Library from './components/Library';
import PDFViewer from './components/PDFViewer';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('welcome');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleStart = () => setView('capture');
  const handleLeadSuccess = () => setView('library');
  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setView('viewer');
  };
  const handleBackToLibrary = () => setView('library');
  const handleGoHome = () => setView('welcome');

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-[#E5C04A] selection:text-black">
      {view === 'welcome' && <Welcome onStart={handleStart} />}
      
      {view === 'capture' && <LeadCapture onSuccess={handleLeadSuccess} />}
      
      {view === 'library' && (
        <Library onSelectBook={handleSelectBook} onGoHome={handleGoHome} />
      )}
      
      {view === 'viewer' && selectedBook && (
        <PDFViewer book={selectedBook} onBack={handleBackToLibrary} />
      )}

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-yellow-900/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-yellow-900/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default App;
