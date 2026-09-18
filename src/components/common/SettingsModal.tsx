import React from 'react';
import { X, Sliders, Moon, Bot, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  aiPersona: string;
  onToggleAIPersona: () => void;
}

export function SettingsModal({ 
  isOpen, 
  onClose, 
  theme, 
  onToggleTheme, 
  aiPersona, 
  onToggleAIPersona 
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900/80">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold">
            <Sliders size={18} />
            <span>DevFlow Settings</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-6 text-sm text-gray-300">
          {/* Theme Option (Interactive) */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <Moon size={18} className="text-indigo-400" />
              <div>
                <div className="font-medium text-gray-200">Workspace Theme</div>
                <div className="text-xs text-gray-500">Current: {theme === 'dark' ? 'Deep Midnight Dark' : 'Light Mode'}</div>
              </div>
            </div>
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                theme === 'dark' 
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600/30' 
                  : 'bg-amber-600/20 text-amber-300 border-amber-500/30 hover:bg-amber-600/30'
              }`}
            >
              {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>

          {/* AI Persona Option (Interactive) */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <Bot size={18} className="text-indigo-400" />
              <div>
                <div className="font-medium text-gray-200">AI Partner Persona</div>
                <div className="text-xs text-gray-500">{aiPersona}</div>
              </div>
            </div>
            <button
              onClick={onToggleAIPersona}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border bg-emerald-600/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-600/30"
            >
              Cycle Persona
            </button>
          </div>

          {/* Version Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheck size={18} className="text-indigo-400" />
              <div>
                <div className="font-medium text-gray-200">DevFlow Engine Build</div>
                <div className="text-xs text-gray-500">React + TypeScript + Tailwind Core</div>
              </div>
            </div>
            <span className="text-xs font-mono text-gray-500">v1.0.0</span>
          </div>
        </div>

        {/* Footer */}
        <div className="h-14 border-t border-gray-800 bg-gray-950 px-6 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors shadow-lg shadow-indigo-600/20"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}