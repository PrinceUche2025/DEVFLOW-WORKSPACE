import React, { useState, useEffect, useRef } from 'react';
import { FileItem } from '../../types';
import { RefreshCw, Monitor, CheckCircle2, FileCode } from 'lucide-react';

interface LivePreviewProps {
  activeFile: FileItem;
  allFiles: FileItem[];
}

export function LivePreview({ activeFile, allFiles }: LivePreviewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Helper to find file content recursively from the workspace tree
  const findFileContent = (items: FileItem[], name: string): string => {
    for (const item of items) {
      if (item.name === name) return item.content || '';
      if (item.children) {
        const found = findFileContent(item.children, name);
        if (found) return found;
      }
    }
    return '';
  };

  const renderCodeToSandbox = () => {
    setIsRefreshing(true);

    try {
      const htmlContent = findFileContent(allFiles, 'index.html') || activeFile.content || '';
      const cssContent = findFileContent(allFiles, 'style.css');
      const jsContent = findFileContent(allFiles, 'script.js');

      // Inject style and script directly so the webpage works seamlessly
      let combinedHTML = htmlContent;
      
      if (!combinedHTML.includes('<style>') && cssContent) {
        combinedHTML = combinedHTML.replace('</head>', `<style>\n${cssContent}\n</style>\n</head>`);
      }
      
      if (!combinedHTML.includes('<script>') && jsContent) {
        combinedHTML = combinedHTML.replace('</body>', `<script>\n${jsContent}\n</script>\n</body>`);
      }

      const blob = new Blob([combinedHTML], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);

      if (iframeRef.current) {
        iframeRef.current.src = blobUrl;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      renderCodeToSandbox();
    }, 300);
    return () => clearTimeout(timer);
  }, [activeFile, allFiles]);

  return (
    <div className="h-full flex flex-col bg-gray-900 border-l border-gray-800">
      {/* Preview Header */}
      <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900/80">
        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
          <Monitor size={16} />
          <span>Live Preview Sandbox</span>
        </div>
        <button
          onClick={renderCodeToSandbox}
          title="Refresh Preview"
          className={`p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`}
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-950 px-4 py-1.5 border-b border-gray-800/80 text-xs font-mono text-gray-400 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Target: {activeFile.name}</span>
        </div>
        <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={12} /> Live Preview</span>
      </div>

      {/* Execution Sandbox */}
      <div className="flex-1 bg-gray-950 relative overflow-hidden flex flex-col">
        <iframe
          ref={iframeRef}
          title="DevFlow Live Sandbox"
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}