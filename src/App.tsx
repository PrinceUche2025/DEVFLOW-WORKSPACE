import React, { useState } from 'react';
import { LandingPage } from './components/home/LandingPage';
import { FileExplorer } from './components/sidebar/FileExplorer';
import { CodeEditor } from './components/editor/CodeEditor';
import { AIPartnerPanel } from './components/ai/AIPartnerPanel';
import { SettingsModal } from './components/common/SettingsModal';
import { LivePreview } from './components/preview/LivePreview';
import { FileItem } from './types';
import { Code2, Sparkles, FolderTree, Settings, Monitor, ArrowLeft } from 'lucide-react';

const initialFiles: FileItem[] = [
  { 
    id: '1', 
    name: 'index.html', 
    type: 'file', 
    content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>DevFlow Portfolio</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <div class="card">\n    <h1>🚀 Welcome to DevFlow</h1>\n    <p>Build and preview static web pages instantly.</p>\n    <button id="actionBtn">Click Me</button>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>' 
  },
  { 
    id: '2', 
    name: 'style.css', 
    type: 'file', 
    content: 'body {\n  background: #0f172a;\n  color: #f8fafc;\n  font-family: system-ui, sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}\n.card {\n  background: #1e293b;\n  padding: 2.5rem;\n  border-radius: 1rem;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);\n  text-align: center;\n  border: 1px solid #334155;\n  max-width: 400px;\n}\nh1 { color: #818cf8; margin-bottom: 0.75rem; font-size: 1.5rem; }\np { color: #94a3b8; font-size: 0.95rem; margin-bottom: 1.5rem; }\nbutton {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  font-weight: 600;\n  transition: background 0.2s, transform 0.1s;\n}\nbutton:hover { background: #4f46e5; }\nbutton:active { transform: scale(0.98); }' 
  },
  { 
    id: '3', 
    name: 'script.js', 
    type: 'file', 
    content: 'const btn = document.getElementById("actionBtn");\nlet count = 0;\n\nbtn.addEventListener("click", () => {\n  count++;\n  if (count === 1) {\n    btn.textContent = "Awesome! Clicked 1 time 🎉";\n  } else {\n    btn.textContent = `Awesome! Clicked ${count} times 🎉`;\n  }\n});' 
  }
];

export default function App() {
  const [view, setView] = useState<'landing' | 'editor'>('landing');
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [activeFileId, setActiveFileId] = useState<string>('1');
  const [isAIOpen, setIsAIOpen] = useState<boolean>(true);
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [aiPersona, setAIPersona] = useState<string>('Conversational & Collaborative');

  const findFile = (items: FileItem[], id: string): FileItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findFile(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeFile = findFile(files, activeFileId) || initialFiles[0];

  const updateFileContent = (items: FileItem[], id: string, newContent: string): FileItem[] => {
    return items.map(item => {
      if (item.id === id) {
        return { ...item, content: newContent };
      }
      if (item.children) {
        return { ...item, children: updateFileContent(item.children, id, newContent) };
      }
      return item;
    });
  };

  const handleContentChange = (newContent: string) => {
    setFiles(prev => updateFileContent(prev, activeFile.id, newContent));
  };

  const handleCreateItem = (parentId: string, name: string, type: 'file' | 'folder') => {
    const newItem: FileItem = {
      id: Date.now().toString(),
      name: name,
      type: type,
      ...(type === 'file' ? { content: `/* New file: ${name} */` } : { children: [] })
    };

    const addRecursive = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === parentId && item.type === 'folder') {
          return { ...item, children: [...(item.children || []), newItem] };
        }
        if (item.children) {
          return { ...item, children: addRecursive(item.children) };
        }
        return item;
      });
    };

    setFiles(prev => addRecursive(prev));
    if (type === 'file') setActiveFileId(newItem.id);
  };

  if (view === 'landing') {
    return <LandingPage onLaunch={() => setView('editor')} />;
  }

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Activity Bar */}
      <div className={`w-14 border-r flex flex-col items-center py-4 justify-between ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col space-y-4">
          <button onClick={() => setView('landing')} title="Back to Home" className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all">
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => setIsExplorerOpen(!isExplorerOpen)} title="Toggle Explorer" className={`p-2.5 rounded-xl transition-colors ${isExplorerOpen ? 'bg-gray-800 text-indigo-400' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'}`}>
            <FolderTree size={20} />
          </button>
          <button onClick={() => setIsPreviewOpen(!isPreviewOpen)} title="Toggle Preview" className={`p-2.5 rounded-xl transition-colors ${isPreviewOpen ? 'bg-gray-800 text-indigo-400' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'}`}>
            <Monitor size={20} />
          </button>
          <button onClick={() => setIsAIOpen(!isAIOpen)} title="Toggle AI Partner" className={`p-2.5 rounded-xl transition-colors ${isAIOpen ? 'bg-gray-800 text-indigo-400' : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'}`}>
            <Sparkles size={20} />
          </button>
        </div>
        <button onClick={() => setIsSettingsOpen(true)} title="Settings" className="p-2.5 rounded-xl text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors">
          <Settings size={20} />
        </button>
      </div>

      {/* Sidebar Explorer */}
      {isExplorerOpen && (
        <div className={`w-64 border-r flex flex-col ${theme === 'dark' ? 'bg-gray-900/60 border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
          <div className="h-12 border-b border-gray-800 flex items-center px-4 font-semibold text-sm tracking-wide">
            DEVFLOW WORKSPACE
          </div>
          <div className="flex-1 overflow-y-auto">
            <FileExplorer files={files} activeFileId={activeFile.id} onSelectFile={(file) => setActiveFileId(file.id)} onCreateItem={handleCreateItem} />
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className={`h-12 border-b flex items-center px-4 space-x-2 ${theme === 'dark' ? 'bg-gray-900/40 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-t-lg text-xs font-medium text-indigo-400 border-b-2 border-b-indigo-500">
            <span>{activeFile.name}</span>
          </div>
        </div>
        <CodeEditor file={activeFile} onContentChange={handleContentChange} />
      </div>

      {/* Live Preview Pane */}
      {isPreviewOpen && (
        <div className="w-96 flex flex-col">
          <LivePreview activeFile={activeFile} allFiles={files} />
        </div>
      )}

      {/* AI Partner Panel */}
      {isAIOpen && (
        <AIPartnerPanel activeFile={activeFile} onClose={() => setIsAIOpen(false)} onApplyCode={(newCode) => handleContentChange(newCode)} />
      )}

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        aiPersona={aiPersona}
        onToggleAIPersona={() => setAIPersona(prev => prev === 'Conversational & Collaborative' ? 'Strict Code Architect' : 'Conversational & Collaborative')}
      />
    </div>
  );
}