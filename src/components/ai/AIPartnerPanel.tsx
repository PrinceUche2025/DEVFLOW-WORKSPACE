import React, { useState } from 'react';
import { FileItem } from '../../types';
import { Send, Bot, User, Sparkles, X, Check, Code2 } from 'lucide-react';

interface AIPartnerPanelProps {
  activeFile: FileItem;
  onClose: () => void;
  onApplyCode: (newCode: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  codeSnippet?: string;
}

export function AIPartnerPanel({ activeFile, onClose, onApplyCode }: AIPartnerPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hey! I'm your DevFlow AI partner. Working on **${activeFile.name}** with you today. How's it going?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateHumanResponse = (query: string, file: FileItem) => {
    const lower = query.toLowerCase();

    // Handling compliments & casual banter
    if (lower.includes('good job') || lower.includes('awesome') || lower.includes('great') || lower.includes('thanks') || lower.includes('thank you') || lower.includes('smart')) {
      const compliments = [
        "Appreciate that! We make a pretty solid architect-and-engineer duo.",
        "Thanks! Just doing my job keeping DevFlow running smoothly for you.",
        "Much appreciated! Working with a sharp lead architect makes it easy.",
        "Thank you! Ready for whatever architectural challenge we tackle next."
      ];
      return { text: compliments[Math.floor(Math.random() * compliments.length)] };
    }

    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return { text: `Hey there! Ready to write some clean code in **${file.name}**? What are we building next?` };
    }

    if (lower.includes('who are you') || lower.includes('what are you')) {
      return { text: `I'm your dedicated engineering partner inside DevFlow. You design the system architecture, and I help write, refine, and deploy the code.` };
    }

    // Code generation intents
    if (lower.includes('button') || lower.includes('component') || lower.includes('add')) {
      const snippet = `export default function App() {\n  return (\n    <div className=\"p-8 bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center\">\n      <h1 className=\"text-3xl font-bold mb-4 text-indigo-400\">DevFlow Active Workspace</h1>\n      <button className=\"px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/30\">\n        Click Me\n      </button>\n    </div>\n  );\n}`;
      return {
        text: `Here is the component implementation for **${file.name}**. Take a look at the snippet below and hit apply when you're ready:`,
        codeSnippet: snippet
      };
    }

    if (lower.includes('flex') || lower.includes('center') || lower.includes('style')) {
      const snippet = `export default function App() {\n  return (\n    <div className=\"flex h-screen items-center justify-center bg-gray-900 text-gray-100\">\n      <div className=\"p-6 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl text-center\">\n        <h2 className=\"text-xl font-semibold text-indigo-400\">Centered Layout</h2>\n        <p className=\"text-sm text-gray-400 mt-2\">Engineered live inside DevFlow.</p>\n      </div>\n    </div>\n  );\n}`;
      return {
        text: `I've crafted a clean, centered layout snippet for you. Hit apply to push it straight into your editor:`,
        codeSnippet: snippet
      };
    }

    // Fallback conversational dialogue
    return {
      text: `I hear you! I'm keeping an eye on **${file.name}**. If you want me to write code, refactor something, or just want to chat about our next milestone, let me know.` };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const query = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateHumanResponse(query, activeFile);
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: response.text,
        codeSnippet: response.codeSnippet
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col h-full shadow-2xl">
      {/* Header */}
      <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
          <Sparkles size={16} />
          <span>AI Partner (Conversational)</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[90%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`p-1.5 rounded-lg ${msg.sender === 'ai' ? 'bg-indigo-600/30 text-indigo-400' : 'bg-gray-800 text-gray-300'}`}>
                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`p-3 rounded-xl leading-relaxed ${msg.sender === 'ai' ? 'bg-gray-800/80 text-gray-200 border border-gray-700/50' : 'bg-indigo-600 text-white'}`}>
                {msg.text}
              </div>
            </div>

            {/* Code Snippet Action Card */}
            {msg.codeSnippet && (
              <div className="mt-2 ml-7 w-[85%] bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gray-900 px-3 py-1.5 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1.5"><Code2 size={13} /> {activeFile.name}</span>
                  <button
                    onClick={() => onApplyCode(msg.codeSnippet!)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-sans font-medium text-xs shadow-sm"
                  >
                    <Check size={12} /> Apply to Editor
                  </button>
                </div>
                <pre className="p-3 text-xs font-mono text-indigo-300 overflow-x-auto whitespace-pre">
                  {msg.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500 text-xs italic">
            <Bot size={14} className="text-indigo-400 animate-spin" />
            <span>AI is typing...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 focus-within:border-indigo-500 transition-colors">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Chat or ask for code..."
            className="flex-1 bg-transparent text-sm text-gray-200 focus:outline-none placeholder-gray-600"
          />
          <button type="submit" className="ml-2 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}