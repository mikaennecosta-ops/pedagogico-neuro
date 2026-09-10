import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  X,
  FileJson,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { LocalStorageService } from '../services/localStorageService';

interface LocalDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
  stats: {
    students: number;
    activities: number;
    proposals: number;
  };
}

export const LocalDataModal: React.FC<LocalDataModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
  stats,
}) => {
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );
  const [importText, setImportText] = useState('');
  const [showImportTextarea, setShowImportTextarea] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    const jsonStr = LocalStorageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incluiedu_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setFeedback({
      type: 'success',
      message: 'Arquivo de backup JSON baixado com sucesso no seu dispositivo!',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = LocalStorageService.importData(content);
        if (result.success) {
          setFeedback({
            type: 'success',
            message: `${result.message} (${result.counts?.students} alunos, ${result.counts?.proposals} propostas)`,
          });
          onDataChanged();
        } else {
          setFeedback({ type: 'error', message: result.message });
        }
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = '';
  };

  const handleImportFromText = () => {
    if (!importText.trim()) return;
    const result = LocalStorageService.importData(importText);
    if (result.success) {
      setFeedback({
        type: 'success',
        message: `${result.message} (${result.counts?.students} alunos, ${result.counts?.proposals} propostas)`,
      });
      setImportText('');
      setShowImportTextarea(false);
      onDataChanged();
    } else {
      setFeedback({ type: 'error', message: result.message });
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Deseja recarregar os alunos e atividades de exemplo recomendados? Seus dados salvos serão restaurados ao modelo inicial.'
      )
    ) {
      LocalStorageService.resetToDefaults();
      setFeedback({
        type: 'success',
        message: 'Banco de dados restaurado com os perfis psicopedagógicos de referência!',
      });
      onDataChanged();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/15">
              <ShieldCheck className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Privacidade e Armazenamento Local</h3>
              <p className="text-xs text-emerald-100">
                Seus dados permanecem 100% seguros no seu navegador
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Privacy Guarantee Box */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 flex gap-3 text-emerald-950 text-sm">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-900">
                Garantia de Confidencialidade e LGPD Escolar
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Prontuários, diagnósticos de neurodivergência e observações sensoriais são informações
                estritamente sensíveis. O IncluiEdu salva tudo diretamente na memória local
                (LocalStorage/IndexedDB) do seu dispositivo, sem gravar cadastros de crianças em
                servidores externos.
              </p>
            </div>
          </div>

          {/* Current Counts */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="block text-2xl font-bold text-slate-800">{stats.students}</span>
              <span className="text-xs text-slate-500">Alunos Cadastrados</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="block text-2xl font-bold text-slate-800">{stats.activities}</span>
              <span className="text-xs text-slate-500">Atividades Base</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <span className="block text-2xl font-bold text-teal-700">{stats.proposals}</span>
              <span className="text-xs text-slate-500">Adaptações Salvas</span>
            </div>
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-xl text-sm flex items-start gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              )}
              <span className="text-xs font-medium">{feedback.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Backup e Portabilidade dos Dados
            </h4>

            {/* Export */}
            <button
              id="btn-export-backup"
              onClick={handleExport}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-slate-800 transition-all text-sm font-medium group"
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="block font-semibold">Baixar Backup Completo (.JSON)</span>
                  <span className="text-xs text-slate-500">
                    Salve todos os alunos e atividades adaptadas no seu computador
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                Exportar
              </span>
            </button>

            {/* Import file */}
            <label className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-slate-800 transition-all text-sm font-medium cursor-pointer group">
              <div className="flex items-center gap-3">
                <Upload className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="block font-semibold">Restaurar de Arquivo JSON</span>
                  <span className="text-xs text-slate-500">
                    Carregue um arquivo de backup gerado anteriormente
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-teal-100 text-teal-800">
                Selecionar
              </span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Paste JSON manually toggle */}
            <div>
              <button
                onClick={() => setShowImportTextarea(!showImportTextarea)}
                className="text-xs text-teal-700 hover:underline flex items-center gap-1 font-medium py-1"
              >
                <FileJson className="w-3.5 h-3.5" />
                {showImportTextarea ? 'Ocultar colagem de texto' : 'Colar código JSON de backup manualmente'}
              </button>

              {showImportTextarea && (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    placeholder="Cole aqui o conteúdo JSON do seu backup..."
                    className="w-full h-24 text-xs font-mono p-2.5 rounded-lg border border-slate-300 focus:outline-teal-600"
                  />
                  <button
                    onClick={handleImportFromText}
                    className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                  >
                    Confirmar Restauração
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reset button */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleResetDefaults}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 font-medium py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              Restaurar Perfis e Atividades Exemplares
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
