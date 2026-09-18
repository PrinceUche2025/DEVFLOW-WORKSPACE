import React, { useState } from 'react';
import { FileItem } from '../../types';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, FilePlus, FolderPlus } from 'lucide-react';

interface FileExplorerProps {
  files: FileItem[];
  activeFileId: string;
  onSelectFile: (file: FileItem) => void;
  onCreateItem: (parentId: string, name: string, type: 'file' | 'folder') => void;
}

export function FileExplorer({ files, activeFileId, onSelectFile, onCreateItem }: FileExplorerProps) {
  const [creatingInId, setCreatingInId] = useState<string | null>(null);
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [newItemName, setNewItemName] = useState('');

  const startCreating = (parentId: string, type: 'file' | 'folder') => {
    setCreatingInId(parentId);
    setNewItemType(type);
    setNewItemName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, parentId: string) => {
    if (e.key === 'Enter' && newItemName.trim()) {
      onCreateItem(parentId, newItemName.trim(), newItemType);
      setCreatingInId(null);
      setNewItemName('');
    } else if (e.key === 'Escape') {
      setCreatingInId(null);
      setNewItemName('');
    }
  };

  return (
    <div className="py-2 text-sm select-none">
      <div className="px-3 pb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400">
        <span>Explorer</span>
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => startCreating('1', 'file')} // Default to root 'src' folder (id: '1')
            title="New File in src"
            className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <FilePlus size={14} />
          </button>
          <button 
            onClick={() => startCreating('1', 'folder')} 
            title="New Folder in src"
            className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-indigo-400 transition-colors"
          >
            <FolderPlus size={14} />
          </button>
        </div>
      </div>

      {files.map((file) => (
        <FileTreeNode 
          key={file.id} 
          item={file} 
          activeFileId={activeFileId} 
          onSelectFile={onSelectFile}
          creatingInId={creatingInId}
          newItemType={newItemType}
          newItemName={newItemName}
          setNewItemName={setNewItemName}
          onStartCreating={startCreating}
          onCreateSubmit={onCreateItem}
          onCancelCreate={() => setCreatingInId(null)}
          onKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
}

interface FileTreeNodeProps {
  item: FileItem;
  activeFileId: string;
  onSelectFile: (file: FileItem) => void;
  creatingInId: string | null;
  newItemType: 'file' | 'folder';
  newItemName: string;
  setNewItemName: (name: string) => void;
  onStartCreating: (parentId: string, type: 'file' | 'folder') => void;
  onCreateSubmit: (parentId: string, name: string, type: 'file' | 'folder') => void;
  onCancelCreate: () => void;
  onKeyDown: (e: React.KeyboardEvent, parentId: string) => void;
}

function FileTreeNode({ 
  item, 
  activeFileId, 
  onSelectFile, 
  creatingInId, 
  newItemType, 
  newItemName, 
  setNewItemName, 
  onStartCreating, 
  onCreateSubmit,
  onCancelCreate,
  onKeyDown 
}: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isActive = item.id === activeFileId;

  if (item.type === 'folder') {
    return (
      <div>
        <div className="w-full flex items-center px-3 py-1.5 text-gray-300 hover:bg-gray-800/60 transition-colors group">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center flex-1 text-left truncate"
          >
            <span className="mr-1 text-gray-400">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
            <span className="mr-2 text-indigo-400">
              {isOpen ? <FolderOpen size={16} /> : <Folder size={16} />}
            </span>
            <span className="truncate">{item.name}</span>
          </button>
          
          {/* Quick Action buttons on hover */}
          <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(true); onStartCreating(item.id, 'file'); }}
              title="New File"
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-indigo-300"
            >
              <FilePlus size={13} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(true); onStartCreating(item.id, 'folder'); }}
              title="New Folder"
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-indigo-300"
            >
              <FolderPlus size={13} />
            </button>
          </div>
        </div>

        {isOpen && item.children && (
          <div className="pl-4">
            {creatingInId === item.id && (
              <div className="flex items-center px-3 py-1 bg-gray-800/80 rounded my-1">
                <span className="mr-2 text-indigo-400">
                  {newItemType === 'file' ? <FileText size={14} /> : <Folder size={14} />}
                </span>
                <input
                  type="text"
                  autoFocus
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => onKeyDown(e, item.id)}
                  onBlur={onCancelCreate}
                  placeholder={`name.${newItemType === 'file' ? 'tsx' : ''}`}
                  className="bg-transparent text-xs text-white focus:outline-none w-full"
                />
              </div>
            )}
            {item.children.map((child) => (
              <FileTreeNode
                key={child.id}
                item={child}
                activeFileId={activeFileId}
                onSelectFile={onSelectFile}
                creatingInId={creatingInId}
                newItemType={newItemType}
                newItemName={newItemName}
                setNewItemName={setNewItemName}
                onStartCreating={onStartCreating}
                onCreateSubmit={onCreateSubmit}
                onCancelCreate={onCancelCreate}
                onKeyDown={onKeyDown}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelectFile(item)}
      className={`w-full flex items-center px-3 py-1.5 transition-colors text-left ${
        isActive ? 'bg-indigo-600/20 text-indigo-300 border-r-2 border-indigo-500' : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200'
      }`}
    >
      <span className="ml-5 mr-2 text-indigo-400">
        <FileText size={16} />
      </span>
      <span className="truncate">{item.name}</span>
    </button>
  );
}