import React, { useState } from 'react';
import {
  FileText,
  Brain,
  Sparkles,
  Layers,
  UserCheck,
  CreditCard,
  Award,
  Printer,
  Volume2,
  VolumeX,
  Copy,
  Check,
  BookmarkCheck,
  ArrowLeft,
  Eye,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { AdaptedProposalData, StudentProfile, ActivityInput, AccessibilityOptions } from '../types';

interface ProposalViewerProps {
  proposal: AdaptedProposalData;
  student: StudentProfile;
  originalActivity: ActivityInput;
  accessibility: AccessibilityOptions;
  isSaved?: boolean;
  onSaveToDatabase?: () => void;
  onBackToEdit?: () => void;
}

export const ProposalViewer: React.FC<ProposalViewerProps> = ({
  proposal,
  student,
  originalActivity,
  accessibility,
  isSaved = false,
  onSaveToDatabase,
  onBackToEdit,
}) => {
  const [activeTab, setActiveTab] = useState<
    'worksheet' | 'analysis' | 'sensory' | 'scaffolding' | 'educator' | 'cards' | 'rubric'
  >('worksheet');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const toggleStep = (stepNumber: number) => {
    setCheckedSteps((prev) => ({ ...prev, [stepNumber]: !prev[stepNumber] }));
  };

  const toggleTask = (taskId: string) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyWorksheet = () => {
    navigator.clipboard.writeText(proposal.studentWorksheet.printableSheetMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Text-to-speech for inclusive reading
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta leitura em voz alta.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${proposal.adaptedTitle}. ${proposal.studentWorksheet.simplifiedInstructions}. ${proposal.studentWorksheet.interactiveTasks
      .map((t, idx) => `Etapa ${idx + 1}: ${t.prompt}`)
      .join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9; // Slightly slower and clearer for neurodivergent auditory processing
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const fontClass = accessibility.dyslexiaFont ? 'font-dyslexic' : '';
  const textScaleClass =
    accessibility.fontSize === 'xlarge'
      ? 'text-lg'
      : accessibility.fontSize === 'large'
      ? 'text-base'
      : 'text-sm';

  return (
    <div className="space-y-6">
      {/* Top Controls Bar (Hidden during print) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {onBackToEdit && (
              <button
                onClick={onBackToEdit}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors mr-1"
                title="Voltar para Ajustes"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
              Proposta Psicopedagógica Concluída
            </span>
            <span className="text-xs text-slate-500">
              Aluno: <strong className="text-slate-800">{student.name}</strong> ({student.age} anos)
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{proposal.adaptedTitle}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Read Aloud */}
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              isSpeaking
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Leitura em voz alta adaptada"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-teal-600" />}
            <span>{isSpeaking ? 'Parar Leitura' : 'Ouvir Atividade'}</span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopyWorksheet}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          {/* Print Sheet */}
          <button
            id="btn-print-proposal"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-teal-300" />
            <span>Imprimir Folha</span>
          </button>

          {/* Save to local DB */}
          {onSaveToDatabase && (
            <button
              onClick={onSaveToDatabase}
              disabled={isSaved}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSaved
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{isSaved ? 'Salvo no Banco Local ✓' : 'Salvar no Histórico'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs (Hidden during print) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-xs overflow-x-auto scrollbar-none flex gap-1 no-print">
        <button
          onClick={() => setActiveTab('worksheet')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'worksheet'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Folha do Aluno (Atividade)</span>
        </button>

        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'analysis'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Análise Psicopedagógica</span>
        </button>

        <button
          onClick={() => setActiveTab('sensory')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'sensory'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Acomodações Sensoriais</span>
        </button>

        <button
          onClick={() => setActiveTab('scaffolding')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'scaffolding'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Passos Cognitivos (Chunking)</span>
        </button>

        <button
          onClick={() => setActiveTab('educator')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'educator'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Guia do Mediador</span>
        </button>

        <button
          onClick={() => setActiveTab('cards')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'cards'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Cartões Visuais / PECS</span>
        </button>

        <button
          onClick={() => setActiveTab('rubric')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'rubric'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Rubrica Formativa</span>
        </button>
      </div>

      {/* Main Tab Content View */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs print:border-none print:shadow-none print:p-0">
        {/* TAB 1: FOLHA DO ALUNO (WORKSHEET) - Designed for direct print or student interaction */}
        {(activeTab === 'worksheet' || true) && (
          <div className={`${activeTab === 'worksheet' ? 'block' : 'hidden print:block'} space-y-6`}>
            {/* Student Header for printing */}
            <div className="border-2 border-slate-800 rounded-2xl p-5 bg-slate-50/50 print:bg-white space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-300 pb-3 gap-2">
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    {proposal.adaptedTitle}
                  </h1>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    Componente: {originalActivity.subject} • Nível: {originalActivity.gradeLevel}
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono">
                  IncluiEdu • Atividade Inclusiva
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-slate-800 pt-1">
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span>Nome do Aluno: </span>
                  <span className="font-normal underline decoration-slate-400">
                    {student.name}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200">
                  <span>Data: </span>
                  <span className="font-normal">___/___/______</span>
                </div>
              </div>

              {/* Visual Routine Strip for Student Self-Monitoring */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-teal-900 flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5 text-teal-600" /> Meu Progresso na Missão:
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {proposal.cognitiveScaffoldingSteps.map((step) => {
                    const isDone = checkedSteps[step.stepNumber];
                    return (
                      <label
                        key={step.stepNumber}
                        onClick={() => toggleStep(step.stepNumber)}
                        className={`cursor-pointer select-none text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                          isDone
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-white text-slate-700 border-teal-200 hover:bg-teal-100/50'
                        }`}
                      >
                        <span>[ {isDone ? '✓' : ' '} ]</span>
                        <span>Passo {step.stepNumber}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Student Instructions */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-950">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-amber-900">Como vamos fazer:</h3>
                <p className={`text-xs mt-0.5 leading-relaxed ${fontClass}`}>
                  {proposal.studentWorksheet.simplifiedInstructions}
                </p>
              </div>
            </div>

            {/* Interactive Tasks Sections */}
            <div className="space-y-5">
              {proposal.studentWorksheet.interactiveTasks.map((task, idx) => {
                const isTaskDone = checkedTasks[task.taskId];
                return (
                  <div
                    key={task.taskId || idx}
                    className={`rounded-2xl border-2 transition-all p-5 ${
                      isTaskDone
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-slate-200 bg-white hover:border-teal-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {task.supportType}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleTask(task.taskId)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg border transition-colors flex items-center gap-1.5 no-print ${
                          isTaskDone
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <span>{isTaskDone ? 'Concluído ✓' : 'Marcar Concluído'}</span>
                      </button>
                    </div>

                    <p className={`font-semibold text-slate-900 mb-3 leading-relaxed ${fontClass} ${textScaleClass}`}>
                      {task.prompt}
                    </p>

                    {/* Options or drawing zone */}
                    {task.optionsOrChoices && task.optionsOrChoices.length > 0 ? (
                      <div className="space-y-2 pt-1">
                        {task.optionsOrChoices.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-teal-50/50 transition-colors"
                          >
                            <span className="w-6 h-6 rounded-md border-2 border-slate-400 bg-white flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className={`text-xs font-medium text-slate-800 ${fontClass}`}>
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/40">
                        <p className="text-xs text-slate-500 font-medium">
                          Espaço para Desenho, Escrita de Palavras-Chave ou Colagem
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          (Use canetinhas, lápis de cor ou adesivos com liberdade)
                        </p>
                      </div>
                    )}

                    {task.sensoryTip && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 text-[11px] text-teal-800">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Dica sensorial: {task.sensoryTip}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Self-Regulation / Emotional Check-in at end of sheet */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700">
                Como me senti realizando esta atividade hoje?
              </span>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-700">
                <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-1">
                  ⭐ Super bem!
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-1">
                  😊 Bem
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-1">
                  🤝 Precisei de apoio
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANÁLISE PSICOPEDAGÓGICA & DUA */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Fundamentação Psicopedagógica & Inclusiva
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Análise Diagnóstica e Eliminação de Barreiras
              </h3>
            </div>

            <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-5 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Objetivo Pedagógico & Habilidade BNCC
              </h4>
              <p className="text-sm font-semibold text-teal-950">{proposal.bnccCompetency}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Brain className="w-4 h-4 text-teal-600" /> Parecer Psicopedagógico (DUA e Teoria Cognitiva)
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {proposal.psychopedagogicalAnalysis}
              </p>
            </div>

            {/* Comparison with Original Activity */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Atividade Original Recebida (Ponto de Partida)
              </h4>
              <div className="bg-slate-100/70 p-3.5 rounded-xl text-xs text-slate-600 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                {originalActivity.content}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACOMODAÇÕES SENSORIAIS & AMBIENTAIS */}
        {activeTab === 'sensory' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Conforto e Regulação Sensorial
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Acomodações de Ambiente e Materiais
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ajustes específicos para mitigar sobrecarga sensorial de {student.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {proposal.sensoryAccommodations.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-xs leading-relaxed"
                >
                  <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5">{item}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
              <p className="font-bold">Lembrete do Especialista:</p>
              <p>
                A regulação sensorial não é privilégio ou premiação: é condição prévia biológica para que o córtex
                pré-frontal da criança neurodivergente consiga processar informações pedagógicas.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: PASSOS COGNITIVOS (CHUNKING) */}
        {activeTab === 'scaffolding' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Andaime Pedagógico (Scaffolding)
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Fragmentação em Micro-Objetivos (Chunking)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Redução da demanda na memória de trabalho através de etapas sequenciais claras.
              </p>
            </div>

            <div className="space-y-3">
              {proposal.cognitiveScaffoldingSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center text-xs">
                        {step.stepNumber}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">Passo {step.stepNumber}</h4>
                    </div>
                    {step.sensoryCheckpoint && (
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {step.sensoryCheckpoint}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {step.instruction}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2 text-[11px] text-slate-600">
                    <Eye className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>Pista visual recomendada: {step.visualSupportCue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GUIA DO MEDIADOR / PROFESSOR */}
        {activeTab === 'educator' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Mediação e Apoio Socioemocional
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Guia Prático para o Professor e Profissional do AEE
              </h3>
            </div>

            {/* Scripts */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-teal-600" /> O Que Falar (Mediação Verbal Objetiva)
              </h4>
              <div className="space-y-2">
                {proposal.educatorGuide.verbalMediationScript.map((script, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-xs text-teal-950 font-medium italic"
                  >
                    {script}
                  </div>
                ))}
              </div>
            </div>

            {/* Frustration and Decompression */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  ⚠️ Prevenção da Sobrecarga / Frustração
                </h4>
                <p className="text-xs text-rose-950 leading-relaxed">
                  {proposal.educatorGuide.frustrationPrevention}
                </p>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  🌿 Proposta de Pausa Sensorial e Motora
                </h4>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {proposal.educatorGuide.calmingAndSensoryBreak}
                </p>
              </div>
            </div>

            {proposal.educatorGuide.reinforcementStrategy && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1">
                <h4 className="font-bold text-slate-800">Estratégia de Reforço Positivo:</h4>
                <p className="text-slate-700">{proposal.educatorGuide.reinforcementStrategy}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: CARTÕES DE COMUNICAÇÃO / PECS */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Comunicação Alternativa e Rotina
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Cartões Visuais de Sequenciamento
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Recorte ou posicione na mesa do aluno para dar previsibilidade e autonomia.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {proposal.visualCommunicationCards.map((card) => (
                <div
                  key={card.order}
                  className="bg-white border-2 border-slate-800 rounded-2xl p-4 text-center flex flex-col items-center justify-between shadow-xs hover:border-teal-600 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center mb-2">
                    {card.order}
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <h5 className="font-bold text-slate-900 text-xs mb-1">{card.label}</h5>
                  <p className="text-[11px] text-slate-500 leading-tight">{card.actionDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: RUBRICA FORMATIVA */}
        {activeTab === 'rubric' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Avaliação Inclusiva
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Matriz de Avaliação Formativa e Processual
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Critérios qualitativos de evolução individual, sem comparações excludentes.
              </p>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
              {proposal.formativeEvaluationRubric.map((item, idx) => (
                <div key={idx} className="p-4 bg-white hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="sm:w-1/3">
                    <span className="font-bold text-slate-900 block">{item.dimension}</span>
                  </div>
                  <div className="sm:w-2/3 text-slate-700">
                    <p>{item.progressIndicators}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
