import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Brain,
  Eye,
  Heart,
  Smile,
  CheckCircle,
  HelpCircle,
  Volume2,
  FileCheck,
} from 'lucide-react';

export const InclusiveKnowledgeBase: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'dua' | 'sensory' | 'executive' | 'neurotypes'>(
    'dua'
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Fundamentos de Psicopedagogia & Educação Inclusiva
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
          Orientações práticas de especialistas para subsidiar sua prática pedagógica em sala de aula,
          no Atendimento Educacional Especializado (AEE) e na clínica psicopedagógica.
        </p>
      </div>

      {/* Topics Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setSelectedTopic('dua')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedTopic === 'dua'
              ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className={`w-5 h-5 mb-2 ${selectedTopic === 'dua' ? 'text-teal-200' : 'text-teal-600'}`} />
          <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5">DUA</h4>
          <p className={`text-xs ${selectedTopic === 'dua' ? 'text-teal-100' : 'text-slate-500'}`}>
            Desenho Universal para a Aprendizagem
          </p>
        </button>

        <button
          onClick={() => setSelectedTopic('sensory')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedTopic === 'sensory'
              ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Eye className={`w-5 h-5 mb-2 ${selectedTopic === 'sensory' ? 'text-teal-200' : 'text-teal-600'}`} />
          <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5">Sensorial</h4>
          <p className={`text-xs ${selectedTopic === 'sensory' ? 'text-teal-100' : 'text-slate-500'}`}>
            Processamento e Regulação Sensorial
          </p>
        </button>

        <button
          onClick={() => setSelectedTopic('executive')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedTopic === 'executive'
              ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Brain className={`w-5 h-5 mb-2 ${selectedTopic === 'executive' ? 'text-teal-200' : 'text-teal-600'}`} />
          <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5">Executivas</h4>
          <p className={`text-xs ${selectedTopic === 'executive' ? 'text-teal-100' : 'text-slate-500'}`}>
            Memória de Trabalho e Atenção
          </p>
        </button>

        <button
          onClick={() => setSelectedTopic('neurotypes')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedTopic === 'neurotypes'
              ? 'bg-teal-700 text-white border-teal-800 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Heart className={`w-5 h-5 mb-2 ${selectedTopic === 'neurotypes' ? 'text-teal-200' : 'text-teal-600'}`} />
          <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5">Neurotipos</h4>
          <p className={`text-xs ${selectedTopic === 'neurotypes' ? 'text-teal-100' : 'text-slate-500'}`}>
            TEA, TDAH, Dislexia, TPS e mais
          </p>
        </button>
      </div>

      {/* Topic Content */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
        {selectedTopic === 'dua' && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Diretrizes do CAST
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Os 3 Princípios Fundamentais do Desenho Universal para a Aprendizagem (DUA)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                O DUA preconiza que não é o aluno que tem uma "dificuldade de aprendizagem", mas sim o
                currículo tradicional que possui barreiras de acessibilidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase text-teal-900 block">1. Engajamento</span>
                <h4 className="font-bold text-slate-900 text-sm">O "Porquê" da Aprendizagem</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Conectar o conteúdo aos interesses autênticos da criança (hiperfocos). Oferecer escolhas
                  autônomas e minimizar sensações de ameaça ou ansiedade.
                </p>
              </div>

              <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase text-teal-900 block">2. Representação</span>
                <h4 className="font-bold text-slate-900 text-sm">O "O Quê" da Aprendizagem</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Apresentar a mesma informação em múltiplos formatos: texto espaçado, apoio imagético,
                  símbolos, leitura oral (áudio) e objetos manipulativos concretos.
                </p>
              </div>

              <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase text-teal-900 block">3. Ação & Expressão</span>
                <h4 className="font-bold text-slate-900 text-sm">O "Como" da Aprendizagem</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Permitir que o aluno demonstre o que aprendeu por caminhos variados: apontando, ligando,
                  desenhando, colando adesivos ou ditando oralmente, sem exigir exclusivamente escrita à mão.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'sensory' && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Integração Sensorial
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Acomodações Sensoriais na Sala de Aula e nas Folhas de Atividade
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4 text-teal-600" /> Hipersensibilidade Visual
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Evite folhas com poluição gráfica, bordas decorativas excessivas ou muitas cores misturadas.</li>
                  <li>Use contraste nítido (texto escuro em fundo claro/marfim suave, sem ofuscar).</li>
                  <li>Delimite caixas com linhas grossas e claras para cada etapa.</li>
                  <li>Fontes sem serifa com kerning ampliado (Lexend, OpenDyslexic, Trebuchet).</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-teal-600" /> Hipersensibilidade Auditiva
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Permita o uso de abafadores de ruído durante atividades individuais de foco.</li>
                  <li>Transmita comandos pedagógicos em voz baixa e próxima ao aluno, olhando no mesmo nível.</li>
                  <li>Evite enunciados com múltiplos oradores simultâneos.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'executive' && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Neuropsicologia da Aprendizagem
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Andaimes Cognitivos e Memória de Trabalho
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-1">
                <h4 className="font-bold">A Regra do Chunking (Fragmentação):</h4>
                <p className="leading-relaxed">
                  Uma instrução como "Leia o texto, retire três adjetivos e faça uma frase para cada um"
                  possui 4 demandas executivas simultâneas. Para uma criança com TDAH ou TEA, isso gera
                  paralisia por sobrecarga. Divida em: Passo 1 (Ler com apoio), Passo 2 (Marcar 1 palavra),
                  Passo 3 (Pausa), Passo 4 (Registrar).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Checklists Visuais</span>
                  <p className="text-slate-600">
                    Permitem que o aluno marque `[✓]` a cada etapa cumprida, gerando dopamina e sensação
                    visível de progresso.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Previsibilidade Temporal</span>
                  <p className="text-slate-600">
                    Cronômetros visuais (Time Timer) reduzem a ansiedade do "quando isso vai acabar?".
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Elogio Descritivo</span>
                  <p className="text-slate-600">
                    Elogie a ação concreta: "Você organizou bem o passo 1" em vez de "Você é inteligente".
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTopic === 'neurotypes' && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Diversidade de Perfis
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Práticas Inclusivas por Neurotipo
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-2xl space-y-1.5">
                <h4 className="font-bold text-teal-950">TEA (Transtorno do Espectro Autista)</h4>
                <p className="text-teal-900 leading-relaxed">
                  Linguagem literal e direta (evite metáforas ou perguntas dúbias). Apoio imagético
                  concreto. Uso de hiperfoco como porta de entrada. Rotina visual clara.
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-1.5">
                <h4 className="font-bold text-amber-950">TDAH (Desatenção e Hiperatividade)</h4>
                <p className="text-amber-900 leading-relaxed">
                  Micro-tarefas de 8 a 12 minutos. Acomodações de movimento (esticar o corpo, segurar
                  fidget). Feedback positivo frequente.
                </p>
              </div>

              <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-1.5">
                <h4 className="font-bold text-indigo-950">Dislexia & Disgrafia</h4>
                <p className="text-indigo-900 leading-relaxed">
                  Espaçamento duplo entre linhas, fontes específicas, não exigir cópia longa da lousa.
                  Priorizar respostas orais ou marcação direta.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-1.5">
                <h4 className="font-bold text-emerald-950">Transtorno do Processamento Sensorial (TPS)</h4>
                <p className="text-emerald-900 leading-relaxed">
                  Respeitar o limiar sensorial: não forçar toques em texturas aversivas. Permitir pausas
                  proprioceptivas para regulação do tônus muscular.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
