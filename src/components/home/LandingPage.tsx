import React from 'react';
import { Code2, Sparkles, Monitor, ArrowRight, FolderTree, Zap, Globe } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

export function LandingPage({ onLaunch }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none animate-pulse"></div>

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Code2 size={20} />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            DevFlow
          </span>
        </div>
        <button
          onClick={onLaunch}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md"
        >
          <span>Open Workspace</span>
          <ArrowRight size={16} />
        </button>
      </header>

      {/* Main Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold mb-6">
          <Sparkles size={14} className="animate-spin" />
          <span>Next-Gen Browser IDE & AI Partner</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Code, preview, and create <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            right in your browser.
          </span>
        </h1>

        {/* Moving Ticker */}
        <div className="w-full max-w-xl overflow-hidden py-2 my-4 bg-slate-900/50 border-y border-slate-800 flex items-center">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] text-xs font-mono text-indigo-300 gap-8">
            <span>⚡ Lightning-Fast Live Sandbox</span>
            <span>•</span>
            <span>🤖 AI-Powered Code Assistant</span>
            <span>•</span>
            <span>📁 Multi-File Workspace Explorer</span>
            <span>•</span>
            <span>🚀 Instant Deployment Ready</span>
          </div>
        </div>

        <p className="text-base md:text-lg text-slate-400 max-w-xl my-4">
          DevFlow combines a fast code editor, real-time live preview, and an intelligent AI assistant into one workspace.
        </p>

        <div className="mt-4">
          <button
            onClick={onLaunch}
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold transition shadow-xl shadow-indigo-600/20 hover:scale-105"
          >
            <span>Launch DevFlow Editor</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition">
            <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl w-fit mb-4">
              <FolderTree size={20} />
            </div>
            <h3 className="font-semibold text-white mb-1">Workspace Explorer</h3>
            <p className="text-sm text-slate-400">Manage project files cleanly with an intuitive sidebar explorer.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition">
            <div className="p-3 bg-purple-950 text-purple-400 rounded-xl w-fit mb-4">
              <Monitor size={20} />
            </div>
            <h3 className="font-semibold text-white mb-1">Live Preview Sandbox</h3>
            <p className="text-sm text-slate-400">See your HTML, CSS, and JS changes render instantly in real-time.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition">
            <div className="p-3 bg-pink-950 text-pink-400 rounded-xl w-fit mb-4">
              <Zap size={20} />
            </div>
            <h3 className="font-semibold text-white mb-1">AI Code Partner</h3>
            <p className="text-sm text-slate-400">Collaborate with an integrated assistant ready to help debug and code.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-indigo-400" />
          <span>DevFlow Workspace • Ready for Deployment</span>
        </div>
        <p className="mt-2 sm:mt-0 text-slate-400">Built for developers, by developers.</p>
      </footer>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}