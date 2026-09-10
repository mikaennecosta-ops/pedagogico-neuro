import React, { useState } from 'react';
import {
  Sparkles,
  User,
  BookOpen,
  Plus,
  ArrowRight,
  Eye,
  Brain,
  Layers,
  CheckCircle2,
  FileText,
  HelpCircle,
  AlertCircle,
  Clock,
  Heart,
} from 'lucide-react';
import { StudentProfile, ActivityInput, AdaptedProposalData, AccessibilityOptions } from '../types';
import { ProposalViewer } from './ProposalViewer';

interface AdaptationWorkbenchProps {
  students: StudentProfile[];
  activities: ActivityInput[];
  selectedStudent: StudentProfile | null;
  onSelectStudent: (student: StudentProfile | null) => void;
  onOpenNewStudentModal: () => void;
  accessibility: AccessibilityOptions;
  onSaveProposal: (proposal: AdaptedProposalData, student: StudentProfile, activity: ActivityInput) => void;
}

const COMMON_FOCUS_PRESETS = [
  'Redução de Carga Cognitiva & Fragmentação em Passos Curtos',
  'Múltiplos Meios de Representação Visual (DUA)',
  'Acomodação para Evitar Fadiga Motora Fina na Escrita',
  'Alívio de Sobrecarga Sensorial e Menos Poluição Gráfica',
  'Apoio Fonológico e Leitura Confortável para Dislexia',
  'Gamificação com Micro-Metas para TDAH',
];

export const AdaptationWorkbench: React.FC<AdaptationWorkbenchProps> = ({
  students,
  activities,
  selectedStudent,
  onSelectStudent,
  onOpenNewStudentModal,
  accessibility,
  onSaveProposal,
}) => {
  // Activity form state
  const [activityTitle, setActivityTitle] = useState('');
  const [activitySubject, setActivitySubject] = useState('Geral / Interdisciplinar');
  const [activityGrade, setActivityGrade] = useState('Ensino Fundamental');
  const [activityContent, setActivityContent] = useState('');
  const [pedagogicalFocus, setPedagogicalFocus] = useState(
    'Garantir apropriação do conceito central com redução de barreiras sensoriais e ampliação de autonomia.'
  );

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generatedProposal, setGeneratedProposal] = useState<AdaptedProposalData | null>(null);
  const [isProposalSaved, setIsProposalSaved] = useState(false);

  const handleSelectSampleActivity = (act: ActivityInput) => {
    setActivityTitle(act.title);
    setActivitySubject(act.subject);
    setActivityGrade(act.gradeLevel);
    setActivityContent(act.content);
    if (act.pedagogicalFocus) {
      setPedagogicalFocus(act.pedagogicalFocus);
    }
  };

  const handleAddPresetFocus = (preset: string) => {
    if (!pedagogicalFocus.includes(preset)) {
      setPedagogicalFocus((prev) => (prev ? `${prev}. ${preset}` : preset));
    }
  };

  const handleGenerate = async () => {
    if (!selectedStudent) {
      alert('Por favor, selecione um aluno para quem esta atividade será personalizada.');
      return;
    }
    if (!activityContent.trim()) {
      alert('Por favor, insira o enunciado ou conteúdo da atividade a ser adaptada.');
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedProposal(null);
    setIsProposalSaved(false);

    // Simulate psychological steps for feedback
    const milestones = [
      'Mapeando barreiras sensoriais e cognitivas do perfil...',
      'Estruturando andaimes didáticos (DUA e Vygotsky)...',
      'Desmembrando tarefas em micro-objetivos autônomos...',
      'Formatando folha de atividade inclusiva e roteiro de mediação...',
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < milestones.length) {
        setLoadingStep(stepIdx);
      }
    }, 1200);

    try {
      const payload = {
        activity: {
          title: activityTitle.trim() || 'Atividade Curricular',
          subject: activitySubject,
          gradeLevel: activityGrade,
          content: activityContent,
        },
        studentProfile: selectedStudent,
        pedagogicalFocus,
      };

      const res = await fetch('/api/adapt-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Servidor retornou status ${res.status}`);
      }

      const data = await res.json();
      clearInterval(interval);

      if (data.data) {
        setGeneratedProposal(data.data);
      } else {
        throw new Error('Resposta sem dados de adaptação.');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error('Error generating adaptation:', err);
      setGenerationError(err?.message || 'Falha ao processar adaptação.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCurrentProposal = () => {
    if (generatedProposal && selectedStudent) {
      onSaveProposal(
        generatedProposal,
        selectedStudent,
        {
          title: activityTitle || 'Atividade Curricular',
          subject: activitySubject,
          gradeLevel: activityGrade,
          content: activityContent,
        }
      );
      setIsProposalSaved(true);
    }
  };

  // If a proposal is already generated, render the viewer directly
  if (generatedProposal && selectedStudent) {
    return (
      <ProposalViewer
        proposal={generatedProposal}
        student={selectedStudent}
        originalActivity={{
          title: activityTitle || 'Atividade Curricular',
          subject: activitySubject,
          gradeLevel: activityGrade,
          content: activityContent,
        }}
        accessibility={accessibility}
        isSaved={isProposalSaved}
        onSaveToDatabase={handleSaveCurrentProposal}
        onBackToEdit={() => setGeneratedProposal(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/10 text-teal-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black tracking-tight">
              Bancada de Adaptação Psicopedagógica Inclusiva
            </h1>
          </div>
          <p className="text-xs text-teal-100 max-w-2xl leading-relaxed">
            Envie qualquer tarefa escolar e receba propostas fundamentadas no Desenho Universal para a
            Aprendizagem (DUA), respeitando os limiares sensoriais e o ritmo cognitivo de cada estudante.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-white/10 text-teal-200 border border-white/15 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            100% Privado no Seu Navegador
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Student Selection & Sensory Profile Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Step 1 Box: Choose Student */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-sm text-slate-900">Selecionar Aluno</h3>
              </div>
              <button
                type="button"
                onClick={onOpenNewStudentModal}
                className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Novo Perfil
              </button>
            </div>

            {/* Selector dropdown */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Para quem esta atividade será personalizada?
              </label>
              <select
                value={selectedStudent?.id || ''}
                onChange={(e) => {
                  const found = students.find((s) => s.id === e.target.value);
                  onSelectStudent(found || null);
                }}
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-teal-600 text-slate-900"
              >
                <option value="">-- Escolha um aluno cadastrado --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.age} anos) — {s.neurotypes.slice(0, 2).join(', ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Student Snapshot Card */}
            {selectedStudent ? (
              <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-teal-950 text-sm">{selectedStudent.name}</h4>
                    <p className="text-xs text-teal-800">
                      {selectedStudent.age} anos • {selectedStudent.grade}
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-teal-300 text-teal-800 font-medium">
                    Ativo
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {selectedStudent.neurotypes.map((n, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-100/80 text-teal-900"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-teal-900 pt-1 border-t border-teal-200/60">
                  {selectedStudent.interests && (
                    <p className="flex items-center gap-1.5 text-rose-800 font-medium">
                      <Heart className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Hiperfoco: {selectedStudent.interests}</span>
                    </p>
                  )}
                  <p className="line-clamp-2">
                    <strong className="text-teal-950">Visual:</strong> {selectedStudent.sensoryVisual}
                  </p>
                  <p className="line-clamp-2">
                    <strong className="text-teal-950">Atenção/Passos:</strong>{' '}
                    {selectedStudent.attentionSpan}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-500">
                Selecione um aluno acima ou use os perfis de exemplo já configurados.
              </div>
            )}
          </div>

          {/* Quick Curriculum Activity Presets */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                Exemplos de Conteúdo Escolar Típico
              </h4>
            </div>
            <p className="text-[11px] text-slate-500">
              Clique para carregar uma atividade curricular real e testar a transposição didática:
            </p>

            <div className="space-y-2">
              {activities.map((act) => (
                <button
                  type="button"
                  key={act.id || act.title}
                  onClick={() => handleSelectSampleActivity(act)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-teal-900">
                      {act.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {act.subject}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-mono">
                    {act.content}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Activity Input & Pedagogical Focus (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-sm text-slate-900">Atividade a Ser Adaptada</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Título / Tema da Aula
                </label>
                <input
                  type="text"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  placeholder="Ex: Ciclo da Água, Situações-Problema, Fábula..."
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-teal-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Disciplina / Área
                </label>
                <input
                  type="text"
                  value={activitySubject}
                  onChange={(e) => setActivitySubject(e.target.value)}
                  placeholder="Ex: Matemática, Ciências"
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-teal-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">
                  Enunciado Original / Conteúdo Completo da Atividade *
                </label>
                <span className="text-[11px] text-slate-400">Copie do livro ou digite aqui</span>
              </div>
              <textarea
                rows={7}
                required
                value={activityContent}
                onChange={(e) => setActivityContent(e.target.value)}
                placeholder="Cole aqui a atividade original: textos, perguntas, problemas matemáticos ou exercícios..."
                className="w-full text-xs p-3.5 rounded-xl border border-slate-300 focus:outline-teal-600 leading-relaxed font-sans bg-slate-50/40 focus:bg-white"
              />
            </div>

            {/* Step 3: Pedagogical Focus */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h4 className="font-bold text-sm text-slate-900">
                  Foco Psicopedagógico ou Acomodação Específica
                </h4>
              </div>

              {/* Fast presets */}
              <div className="flex flex-wrap gap-1.5">
                {COMMON_FOCUS_PRESETS.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleAddPresetFocus(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-300 text-slate-700 transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={pedagogicalFocus}
                onChange={(e) => setPedagogicalFocus(e.target.value)}
                placeholder="Ex: Reduzir escrita motora, usar apoio imagético, fragmentar em 3 passos..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600"
              />
            </div>

            {/* Error banner */}
            {generationError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{generationError}</span>
              </div>
            )}

            {/* Action Trigger Button */}
            <div className="pt-3">
              <button
                id="btn-generate-adaptation"
                type="button"
                disabled={isGenerating || !selectedStudent || !activityContent.trim()}
                onClick={handleGenerate}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                  isGenerating || !selectedStudent || !activityContent.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-md'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Elaborando Proposta Psicopedagógica...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>
                      Gerar Atividade Adaptada para {selectedStudent ? selectedStudent.name : 'o Aluno'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Progress Milestones during generation */}
              {isGenerating && (
                <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-xl text-center space-y-1">
                  <p className="text-xs font-semibold text-teal-900 animate-pulse">
                    {loadingStep === 0 && 'Mapeando barreiras sensoriais e cognitivas do aluno...'}
                    {loadingStep === 1 && 'Estruturando andaimes didáticos (DUA e Vygotsky)...'}
                    {loadingStep === 2 && 'Desmembrando tarefas em micro-objetivos e apoios visuais...'}
                    {loadingStep >= 3 && 'Formatando folha de atividade inclusiva e roteiro de mediação...'}
                  </p>
                  <p className="text-[11px] text-teal-700">
                    O especialista está garantindo o rigor conceitual e o respeito ao ritmo do aluno.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
