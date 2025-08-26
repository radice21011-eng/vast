
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AgentCommand, AgentResponse, Message, CommandKind } from './types';
import { sendCommandToAgent } from './services/agentService';
import { getCommandFromNaturalLanguage } from './services/geminiService';
import AgentCommandForm from './components/AgentCommandForm';
import ResponseDisplay from './components/ResponseDisplay';
import Header from './components/Header';
import SendIcon from './components/icons/SendIcon';
import SpinnerIcon from './components/icons/SpinnerIcon';
import Footer from './components/Footer';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import GdprCompliance from './components/legal/GdprCompliance';

const VAST_WATERMARK = 'V.A.S.T. AI Agent © Ervin Remus Radosavlevici';

const App: React.FC = () => {
  const [isManualMode, setIsManualMode] = useState(false);
  const [response, setResponse] = useState<AgentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');

  const handleCommandSubmit = async (command: AgentCommand) => {
    setIsLoading(true);
    setResponse(null);
    try {
      const res = await sendCommandToAgent(command);
      setResponse(res);
      return res;
    } catch (error) {
      const errorResponse = {
        success: false,
        message: 'An unexpected error occurred.',
        error: error instanceof Error ? error.message : String(error),
      };
      setResponse(errorResponse);
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: chatInput, sender: 'user' };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      const command = await getCommandFromNaturalLanguage(chatInput);

      if (command) {
        const agentResponse = await handleCommandSubmit(command);
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: agentResponse.message,
          sender: 'agent',
          response: agentResponse,
        };
        setChatHistory(prev => [...prev, agentMessage]);
      } else {
        // This case is for when Gemini doesn't return a structured command but just text.
         const agentMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "I couldn't determine a specific blockchain command from your request. Please try rephrasing, or switch to manual mode for precise control.",
            sender: 'agent',
            response: null
        };
        setChatHistory(prev => [...prev, agentMessage]);
      }
    } catch (error) {
       const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `Error processing your request: ${error instanceof Error ? error.message : String(error)}`,
            sender: 'agent',
        };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const MainInterface = () => (
    <div className="flex flex-col flex-grow w-full max-w-4xl mx-auto px-4">
      <div className="text-center my-4">
        <button
          onClick={() => setIsManualMode(!isManualMode)}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
        >
          {isManualMode ? 'Switch to AI Chat Mode' : 'Switch to Manual Command Mode'}
        </button>
      </div>

      {isManualMode ? (
        <>
          <AgentCommandForm onSubmit={handleCommandSubmit} isLoading={isLoading} />
          {response && <div className="mt-6"><ResponseDisplay response={response} /></div>}
        </>
      ) : (
        <div className="flex flex-col flex-grow bg-gray-800 bg-opacity-50 rounded-lg shadow-2xl overflow-hidden">
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-lg p-3 rounded-xl ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  {msg.response && <div className="mt-2 border-t border-gray-600 pt-2"><ResponseDisplay response={msg.response} /></div>}
                </div>
              </div>
            ))}
             {isLoading && chatHistory.length > 0 && chatHistory[chatHistory.length - 1].sender === 'user' && (
                <div className="flex justify-start">
                    <div className="max-w-lg p-3 rounded-xl bg-gray-700 text-gray-200 flex items-center space-x-2">
                        <SpinnerIcon className="h-5 w-5 animate-spin" />
                        <span>Processing...</span>
                    </div>
                </div>
             )}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-700 bg-gray-900">
            <div className="relative">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="e.g., Create a token named 'SuperCoin' with symbol 'SPC'"
                className="w-full bg-gray-700 text-gray-200 rounded-full py-3 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                disabled={isLoading || !chatInput.trim()}
              >
                {isLoading ? <SpinnerIcon className="h-5 w-5 animate-spin" /> : <SendIcon className="h-5 w-5" />}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center selection:bg-blue-500 selection:text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute bottom-4 right-4 text-xs text-gray-600 font-mono select-none z-0">{VAST_WATERMARK}</div>

      <div className="w-full z-10">
        <Header />
        <main className="flex-grow w-full flex flex-col items-center justify-center p-4">
           <Routes>
              <Route path="/" element={<MainInterface />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/gdpr" element={<GdprCompliance />} />
           </Routes>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;
