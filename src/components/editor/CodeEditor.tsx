import React from 'react';
import { FileItem } from '../../types';

interface CodeEditorProps {
  file: FileItem;
  onContentChange: (newContent: string) => void;
}

export function CodeEditor({ file, onContentChange }: CodeEditorProps) {
  const content = file.content || '';
  const lines = content.split('\n');

  return (
    <div className="flex-1 flex bg-gray-950 overflow-hidden font-mono text-sm">
      {/* Line Numbers Column */}
      <div className="w-12 py-4 bg-gray-900/40 border-r border-gray-800/60 select-none text-right pr-3 text-gray-600 space-y-1">
        {lines.map((_, i) => (
          <div key={i} className="leading-6">{i + 1}</div>
        ))}
      </div>

      {/* Editable Text Area */}
      <div className="flex-1 relative overflow-auto p-4">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full bg-transparent text-gray-200 resize-none focus:outline-none font-mono leading-6 whitespace-pre"
          placeholder="Type your code here..."
        />
      </div>
    </div>
  );
}