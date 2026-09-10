import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  Sparkles,
  Heart,
  Volume2,
  Hand,
  Brain,
  Smile,
  ShieldCheck,
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentsViewProps {
  students: StudentProfile[];
  onAddStudent: () => void;
  onEditStudent: (student: StudentProfile) => void;
  onDeleteStudent: (id: string) => void;
  onSelectStudentForAdaptation: (student: StudentProfile) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onSelectStudentForAdaptation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<StudentProfile | null>(null);

  const filtered = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.grade.toLowerCase().includes(term) ||
      s.neurotypes.some((n) => n.toLowerCase().includes(term)) ||
      (s.interests && s.interests.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Perfis de Alunos & Necessidades</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">
              {students.length} {students.length === 1 ? 'aluno' : 'alunos'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cadastre os perfis sensoriais e cognitivos para criar adaptações precisas sob demanda.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="btn-add-student"
            onClick={onAddStudent}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Aluno</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome, neurotipo, hiperfoco (ex: dinossauros, autismo, dislexia)..."
          className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-teal-600 shadow-xs"
        />
      </div>

      {/* Student Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-700">Nenhum aluno encontrado</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm
              ? 'Nenhum resultado com os termos informados. Tente outra busca.'
              : 'Cadastre seu primeiro aluno neurodivergente para iniciar as propostas pedagógicas personalizadas.'}
          </p>
          <button
            onClick={onAddStudent}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" /> Cadastrar Aluno
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{student.name}</h3>
                    <p className="text-xs text-slate-500">
                      {student.age} anos • {student.grade}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditStudent(student)}
                      title="Editar Perfil"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Deseja realmente remover o perfil de ${student.name}?`)) {
                          onDeleteStudent(student.id);
                        }
                      }}
                      title="Excluir"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Neurotypes Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {student.neurotypes.map((nt, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80"
                    >
                      {nt}
                    </span>
                  ))}
                </div>

                {/* Sensory Highlights */}
                <div className="space-y-2 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  {student.interests && (
                    <div className="flex items-start gap-2">
                      <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <p className="line-clamp-1">
                        <strong className="text-slate-700">Hiperfoco:</strong> {student.interests}
                      </p>
                    </div>
                  )}

                  <div className="flex items-start gap-2">
                    <Eye className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="line-clamp-2">
                      <strong className="text-slate-700">Sensorial Visual:</strong>{' '}
                      {student.sensoryVisual}
                    </p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Brain className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="line-clamp-1">
                      <strong className="text-slate-700">Atenção/Passos:</strong>{' '}
                      {student.attentionSpan || student.workingMemory}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedStudentDetail(student)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                </button>

                <button
                  onClick={() => onSelectStudentForAdaptation(student)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Adaptar Atividade</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedStudentDetail.name}</h3>
                <p className="text-xs text-slate-500">
                  {selectedStudentDetail.age} anos • {selectedStudentDetail.grade}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-slate-800 mb-1.5">Neurodivergências Identificadas:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudentDetail.neurotypes.map((n, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-medium"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 border border-slate-200">
                <h4 className="font-bold text-teal-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" /> Acomodações Sensoriais
                </h4>
                <p>
                  <strong>Visual:</strong> {selectedStudentDetail.sensoryVisual}
                </p>
                <p>
                  <strong>Auditivo:</strong> {selectedStudentDetail.sensoryAuditory}
                </p>
                <p>
                  <strong>Tátil / Motor Fino:</strong> {selectedStudentDetail.sensoryMotor}
                </p>
                <p>
                  <strong>Pausas & Regulação:</strong> {selectedStudentDetail.sensoryRegulation}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl space-y-2 border border-slate-200">
                <h4 className="font-bold text-teal-900 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-teal-600" /> Aspectos Cognitivos & Executivos
                </h4>
                <p>
                  <strong>Atenção Sustentada:</strong> {selectedStudentDetail.attentionSpan}
                </p>
                <p>
                  <strong>Memória de Trabalho:</strong> {selectedStudentDetail.workingMemory}
                </p>
                <p>
                  <strong>Hiperfoco & Interesses:</strong> {selectedStudentDetail.interests}
                </p>
                <p>
                  <strong>Suporte Emocional:</strong> {selectedStudentDetail.emotionalSupport}
                </p>
              </div>

              {selectedStudentDetail.notes && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                  <h4 className="font-bold mb-1">Notas do AEE / Família:</h4>
                  <p>{selectedStudentDetail.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  const s = selectedStudentDetail;
                  setSelectedStudentDetail(null);
                  onSelectStudentForAdaptation(s);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Adaptar Atividade para {selectedStudentDetail.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
