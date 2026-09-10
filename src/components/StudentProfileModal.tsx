import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Heart,
  Eye,
  Volume2,
  Hand,
  Sparkles,
  Smile,
  Brain,
  Check,
  Plus,
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'>, id?: string) => void;
  initialStudent?: StudentProfile | null;
}

const COMMON_NEUROTYPES = [
  'TEA Nível 1 de Suporte (Autismo Leve)',
  'TEA Nível 2 de Suporte (Moderado)',
  'TEA Nível 3 de Suporte',
  'TDAH Tipo Desatento',
  'TDAH Tipo Hiperativo/Impulsivo',
  'TDAH Tipo Combinado',
  'Dislexia do Desenvolvimento',
  'Discalculia',
  'Disgrafia / Disortografia',
  'Transtorno do Processamento Sensorial (TPS)',
  'Síndrome de Down / Trissomia 21',
  'Deficiência Intelectual Leve',
  'Altas Habilidades / Superdotação',
  'Atraso no Desenvolvimento da Linguagem',
];

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialStudent,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(8);
  const [grade, setGrade] = useState('3º Ano do Ensino Fundamental');
  const [selectedNeurotypes, setSelectedNeurotypes] = useState<string[]>([]);
  const [customNeurotype, setCustomNeurotype] = useState('');

  // Sensory
  const [sensoryVisual, setSensoryVisual] = useState('');
  const [sensoryAuditory, setSensoryAuditory] = useState('');
  const [sensoryMotor, setSensoryMotor] = useState('');
  const [sensoryRegulation, setSensoryRegulation] = useState('');

  // Cognitive & Emotional
  const [attentionSpan, setAttentionSpan] = useState('');
  const [workingMemory, setWorkingMemory] = useState('');
  const [interests, setInterests] = useState('');
  const [emotionalSupport, setEmotionalSupport] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialStudent) {
      setName(initialStudent.name);
      setAge(initialStudent.age);
      setGrade(initialStudent.grade);
      setSelectedNeurotypes(initialStudent.neurotypes || []);
      setSensoryVisual(initialStudent.sensoryVisual || '');
      setSensoryAuditory(initialStudent.sensoryAuditory || '');
      setSensoryMotor(initialStudent.sensoryMotor || '');
      setSensoryRegulation(initialStudent.sensoryRegulation || '');
      setAttentionSpan(initialStudent.attentionSpan || '');
      setWorkingMemory(initialStudent.workingMemory || '');
      setInterests(initialStudent.interests || '');
      setEmotionalSupport(initialStudent.emotionalSupport || '');
      setNotes(initialStudent.notes || '');
    } else {
      // Default reset
      setName('');
      setAge(9);
      setGrade('4º Ano do Ensino Fundamental');
      setSelectedNeurotypes(['TEA Nível 1 de Suporte (Autismo Leve)']);
      setSensoryVisual('Espaçamento generoso, caixas com bordas claras e redução de poluição visual.');
      setSensoryAuditory('Instruções dadas em tom calmo, sem excesso de ruídos concorrentes.');
      setSensoryMotor('Prefere marcar X, ligar pontos ou responder oralmente para evitar cansaço na escrita.');
      setSensoryRegulation('Micro-pausas de 2 minutos para beber água ou usar objeto anti-stress.');
      setAttentionSpan('10 a 15 minutos de foco sustentado com metas fragmentadas.');
      setWorkingMemory('Comandos divididos em 1 ou 2 passos por vez com checklist visual.');
      setInterests('Dinossauros, Espaço sideral, Desenho, Animais');
      setEmotionalSupport('Ansiedade com tarefas desconhecidas; necessita de previsibilidade e encorajamento descritivo.');
      setNotes('');
    }
  }, [initialStudent, isOpen]);

  if (!isOpen) return null;

  const toggleNeurotype = (item: string) => {
    if (selectedNeurotypes.includes(item)) {
      setSelectedNeurotypes(selectedNeurotypes.filter((t) => t !== item));
    } else {
      setSelectedNeurotypes([...selectedNeurotypes, item]);
    }
  };

  const handleAddCustomNeurotype = () => {
    if (customNeurotype.trim() && !selectedNeurotypes.includes(customNeurotype.trim())) {
      setSelectedNeurotypes([...selectedNeurotypes, customNeurotype.trim()]);
      setCustomNeurotype('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, informe ao menos o nome ou pseudônimo do aluno.');
      return;
    }

    onSave(
      {
        name: name.trim(),
        age: Number(age) || 8,
        grade: grade.trim(),
        neurotypes: selectedNeurotypes.length > 0 ? selectedNeurotypes : ['Neurodivergência a acompanhar'],
        sensoryVisual,
        sensoryAuditory,
        sensoryMotor,
        sensoryRegulation,
        attentionSpan,
        workingMemory,
        interests,
        emotionalSupport,
        notes,
      },
      initialStudent?.id
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-800 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/15">
              <User className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {initialStudent ? 'Editar Perfil Psicopedagógico' : 'Novo Perfil do Aluno (Inclusão)'}
              </h3>
              <p className="text-xs text-teal-100">
                Mapeamento individualizado de necessidades sensoriais, cognitivas e de engajamento
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Identificação Básica */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Nome ou Pseudônimo *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Lucas M. ou Sofia"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-teal-600 font-medium"
              />
              <span className="text-[11px] text-slate-500">Pode ser pseudônimo para sigilo</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Idade
              </label>
              <input
                type="number"
                min="3"
                max="25"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Ano / Turma Escolar
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="Ex: 4º Ano EF"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-teal-600"
              />
            </div>
          </div>

          {/* Neurotipos & Diagnósticos */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Neurodivergências / Características Clínico-Pedagógicas
            </label>
            <div className="flex flex-wrap gap-2 mb-2.5">
              {COMMON_NEUROTYPES.map((neuro) => {
                const isSelected = selectedNeurotypes.includes(neuro);
                return (
                  <button
                    type="button"
                    key={neuro}
                    onClick={() => toggleNeurotype(neuro)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-teal-700 text-white border-teal-800 font-medium shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{neuro}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customNeurotype}
                onChange={(e) => setCustomNeurotype(e.target.value)}
                placeholder="Adicionar outra característica ou laudo..."
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 flex-1 focus:outline-teal-600"
              />
              <button
                type="button"
                onClick={handleAddCustomNeurotype}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar
              </button>
            </div>
          </div>

          {/* Perfil Sensorial */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>1. Perfil e Necessidades Sensoriais</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-teal-600" />
                  Sensorial Visual (Contraste, espaçamento, poluicão)
                </label>
                <textarea
                  rows={2}
                  value={sensoryVisual}
                  onChange={(e) => setSensoryVisual(e.target.value)}
                  placeholder="Ex: Necessita de fontes grandes, poucos elementos por página, caixas delimitadoras."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                  Sensorial Auditivo (Sensibilidade a ruído, tom de voz)
                </label>
                <textarea
                  rows={2}
                  value={sensoryAuditory}
                  onChange={(e) => setSensoryAuditory(e.target.value)}
                  placeholder="Ex: Não tolera gritos ou ruídos agudos; instruções devem ser pausadas e individuais."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Hand className="w-3.5 h-3.5 text-teal-600" />
                  Tátil & Motor Fino (Escrita à mão, manuseio)
                </label>
                <textarea
                  rows={2}
                  value={sensoryMotor}
                  onChange={(e) => setSensoryMotor(e.target.value)}
                  placeholder="Ex: Dores nas mãos ao escrever textos longos; prefere colar adesivos, ligar ou ditar."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-teal-600" />
                  Autorregulação & Acomodações de Pausa
                </label>
                <textarea
                  rows={2}
                  value={sensoryRegulation}
                  onChange={(e) => setSensoryRegulation(e.target.value)}
                  placeholder="Ex: Precisa de 2 minutos para esticar o corpo ou segurar objeto anti-stress após 15 min."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Perfil Cognitivo, Funções Executivas e Hiperfoco */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
              <Brain className="w-4 h-4 text-teal-600" />
              <span>2. Funções Cognitivas, Executivas & Interesses Especiais</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tempo Médio de Atenção Sustentada
                </label>
                <input
                  type="text"
                  value={attentionSpan}
                  onChange={(e) => setAttentionSpan(e.target.value)}
                  placeholder="Ex: 8 a 12 minutos com 1 objetivo por vez"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Memória de Trabalho & Instruções
                </label>
                <input
                  type="text"
                  value={workingMemory}
                  onChange={(e) => setWorkingMemory(e.target.value)}
                  placeholder="Ex: Processa 1 comando por vez; perde-se em enunciados compostos"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  Hiperfoco e Interesses Especiais (Chave de Engajamento e Vínculo)
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Ex: Dinossauros, Astronomia/Foguetes, Personagens de Anime, Animais, Meios de Transporte"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white font-medium text-teal-900"
                />
                <span className="text-[11px] text-slate-500">
                  O adaptador usa esses interesses para contextualizar a atividade e reduzir a aversão à tarefa
                </span>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Suporte Emocional, Gatilhos de Ansiedade & Mediação
                </label>
                <textarea
                  rows={2}
                  value={emotionalSupport}
                  onChange={(e) => setEmotionalSupport(e.target.value)}
                  placeholder="Ex: Frustração imediata ao errar; responde com excelência a elogios no processo e roteiro visual prévio."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Observações Gerais */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Observações Adicionais do Professor / AEE / Família
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Faz terapia ocupacional com foco em integração sensorial; usa mordedor sensorial..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-teal-600"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-all"
            >
              {initialStudent ? 'Atualizar Perfil' : 'Salvar Aluno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
