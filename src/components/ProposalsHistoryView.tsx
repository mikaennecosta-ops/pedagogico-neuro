import React, { useState } from 'react';
import {
  FolderHeart,
  Search,
  Printer,
  Eye,
  Trash2,
  Calendar,
  User,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { SavedProposal, AccessibilityOptions } from '../types';
import { ProposalViewer } from './ProposalViewer';

interface ProposalsHistoryViewProps {
  proposals: SavedProposal[];
  onDeleteProposal: (id: string) => void;
  accessibility: AccessibilityOptions;
  onOpenWorkbench: () => void;
}

export const ProposalsHistoryView: React.FC<ProposalsHistoryViewProps> = ({
  proposals,
  onDeleteProposal,
  accessibility,
  onOpenWorkbench,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<SavedProposal | null>(null);

  const filtered = proposals.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.activityTitle.toLowerCase().includes(term) ||
      p.studentName.toLowerCase().includes(term) ||
      p.activitySubject.toLowerCase().includes(term) ||
      p.studentNeurotypes.some((n) => n.toLowerCase().includes(term))
    );
  });

  if (selectedProposal) {
    return (
      <div className="space-y-4">
        <ProposalViewer
          proposal={selectedProposal.adaptation}
          student={{
            id: selectedProposal.studentId,
            name: selectedProposal.studentName,
            age: 9,
            grade: 'Ano escolar registrado',
            neurotypes: selectedProposal.studentNeurotypes,
            sensoryVisual: 'Espaçamento amplo e delimitação visual',
            sensoryAuditory: 'Instruções calmas e sem ambiguidade',
            sensoryMotor: 'Alternativas à escrita manual prolongada',
            sensoryRegulation: 'Micro-pausas programadas',
            attentionSpan: 'Passos curtos e definidos',
            workingMemory: '1 a 2 comandos por vez',
            interests: 'Interesses do estudante',
            emotionalSupport: 'Encorajamento focado no esforço',
            createdAt: selectedProposal.createdAt,
            updatedAt: selectedProposal.createdAt,
          }}
          originalActivity={{
            title: selectedProposal.activityTitle,
            subject: selectedProposal.activitySubject,
            gradeLevel: 'Registrado no plano',
            content: selectedProposal.originalContent,
          }}
          accessibility={accessibility}
          isSaved={true}
          onBackToEdit={() => setSelectedProposal(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Atividades Adaptadas Salvas</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              {proposals.length} {proposals.length === 1 ? 'salva' : 'salvas'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Histórico local das propostas pedagógicas prontas para impressão e acompanhamento.
          </p>
        </div>

        <button
          onClick={onOpenWorkbench}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Adaptar Nova Atividade</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por título da atividade, nome do aluno ou neurotipo..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-teal-600 shadow-xs"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <FolderHeart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-700">Nenhuma atividade adaptada salva ainda</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm
              ? 'Nenhuma proposta corresponde ao filtro de busca.'
              : 'Gere sua primeira proposta pedagógica na bancada e clique em "Salvar no Histórico".'}
          </p>
          <button
            onClick={onOpenWorkbench}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" /> Ir para a Bancada de Adaptação
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const dateStr = new Date(item.createdAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {item.activitySubject}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dateStr}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">
                    {item.adaptation.adaptedTitle || item.activityTitle}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-teal-800 font-medium mb-3">
                    <User className="w-3.5 h-3.5 text-teal-600" />
                    <span>Aluno: {item.studentName}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.studentNeurotypes.slice(0, 2).map((nt, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200"
                      >
                        {nt}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                    "{item.adaptation.psychopedagogicalAnalysis}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (confirm(`Deseja excluir esta adaptação salva de ${item.activityTitle}?`)) {
                        onDeleteProposal(item.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Excluir do histórico"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedProposal(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Abrir Proposta Completa</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
