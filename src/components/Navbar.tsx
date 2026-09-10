import React from 'react';
import {
  Sparkles,
  Users,
  FolderHeart,
  BookOpen,
  ShieldCheck,
  Type,
  Maximize2,
  Minimize2,
  HardDriveDownload,
  Sun,
  Moon,
} from 'lucide-react';
import { AccessibilityOptions } from '../types';

interface NavbarProps {
  currentTab: 'workbench' | 'students' | 'history' | 'guide';
  onSelectTab: (tab: 'workbench' | 'students' | 'history' | 'guide') => void;
  accessibility: AccessibilityOptions;
  onUpdateAccessibility: (updates: Partial<AccessibilityOptions>) => void;
  onOpenDataModal: () => void;
  onOpenWelcomeScreen: () => void;
  savedProposalsCount: number;
  studentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  accessibility,
  onUpdateAccessibility,
  onOpenDataModal,
  onOpenWelcomeScreen,
  savedProposalsCount,
  studentsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Identity */}
          <button
            onClick={onOpenWelcomeScreen}
            className="flex items-center gap-3 text-left group focus:outline-none"
            title="Clique para abrir a Tela de Abertura Animada"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 group-hover:bg-teal-700 text-white flex items-center justify-center shadow-sm transition-colors">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                  Inclui<span className="text-teal-600">Edu</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  Psicopedagogia & Inclusão
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Adaptação Sensorial e Cognitiva para Neurodivergentes
              </p>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              id="nav-tab-workbench"
              onClick={() => onSelectTab('workbench')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'workbench'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Adaptar Atividade</span>
            </button>

            <button
              id="nav-tab-students"
              onClick={() => onSelectTab('students')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'students'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Users className="w-4 h-4 text-teal-600" />
              <span>Perfis de Alunos</span>
              <span className="text-xs px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                {studentsCount}
              </span>
            </button>

            <button
              id="nav-tab-history"
              onClick={() => onSelectTab('history')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'history'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FolderHeart className="w-4 h-4 text-teal-600" />
              <span>Atividades Salvas</span>
              {savedProposalsCount > 0 && (
                <span className="text-xs px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-800">
                  {savedProposalsCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-guide"
              onClick={() => onSelectTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'guide'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Guia DUA & Práticas</span>
            </button>
          </nav>

          {/* Right Actions: Local Privacy Badge & Accessibility */}
          <div className="flex items-center gap-2">
            {/* Animated Welcome Screen Trigger */}
            <button
              id="btn-nav-welcome-screen"
              onClick={onOpenWelcomeScreen}
              title="Ver Tela de Abertura Animada e Colorida"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-50 to-teal-50 text-teal-900 border border-teal-200 hover:border-teal-300 hover:shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="hidden sm:inline">Abertura</span>
            </button>

            {/* Local Data Privacy Badge & Trigger */}
            <button
              id="btn-open-local-data"
              onClick={onOpenDataModal}
              title="Dados 100% Locais e Privados - Clique para gerenciar backup"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Dados Locais Privados</span>
              <HardDriveDownload className="w-3.5 h-3.5 text-emerald-700 opacity-80" />
            </button>

            {/* Dyslexia font toggle */}
            <button
              id="btn-toggle-dyslexia"
              onClick={() => onUpdateAccessibility({ dyslexiaFont: !accessibility.dyslexiaFont })}
              title="Alternar Fonte Acessível para Dislexia"
              className={`p-2 rounded-lg text-xs font-semibold border transition-colors ${
                accessibility.dyslexiaFont
                  ? 'bg-teal-600 text-white border-teal-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <span className="text-xs tracking-wider">Aa Dislexia</span>
            </button>

            {/* Font size toggle */}
            <button
              id="btn-toggle-font-size"
              onClick={() => {
                const next =
                  accessibility.fontSize === 'normal'
                    ? 'large'
                    : accessibility.fontSize === 'large'
                    ? 'xlarge'
                    : 'normal';
                onUpdateAccessibility({ fontSize: next });
              }}
              title="Ajustar Tamanho do Texto"
              className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors flex items-center gap-1 text-xs"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="uppercase text-[10px] font-bold">
                {accessibility.fontSize === 'normal' ? '1x' : accessibility.fontSize === 'large' ? '1.2x' : '1.4x'}
              </span>
            </button>

            {/* High Contrast */}
            <button
              id="btn-toggle-contrast"
              onClick={() => onUpdateAccessibility({ highContrast: !accessibility.highContrast })}
              title="Alto Contraste Visual"
              className={`p-2 rounded-lg border transition-colors ${
                accessibility.highContrast
                  ? 'bg-slate-900 text-yellow-300 border-slate-800'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {accessibility.highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-100 gap-1.5 scrollbar-none">
          <button
            onClick={() => onSelectTab('workbench')}
            className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 flex items-center gap-1.5 ${
              currentTab === 'workbench' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            Adaptar
          </button>
          <button
            onClick={() => onSelectTab('students')}
            className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 flex items-center gap-1.5 ${
              currentTab === 'students' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Users className="w-3 h-3" />
            Alunos ({studentsCount})
          </button>
          <button
            onClick={() => onSelectTab('history')}
            className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 flex items-center gap-1.5 ${
              currentTab === 'history' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <FolderHeart className="w-3 h-3" />
            Salvas ({savedProposalsCount})
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`px-3 py-1 rounded-md text-xs font-medium shrink-0 flex items-center gap-1.5 ${
              currentTab === 'guide' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            Guia DUA
          </button>
        </div>
      </div>
    </header>
  );
};
