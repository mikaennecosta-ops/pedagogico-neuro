import React, { useState, useEffect } from 'react';
import {
  StudentProfile,
  ActivityInput,
  AdaptedProposalData,
  SavedProposal,
  AccessibilityOptions,
} from './types';
import { LocalStorageService } from './services/localStorageService';
import { Navbar } from './components/Navbar';
import { AdaptationWorkbench } from './components/AdaptationWorkbench';
import { StudentsView } from './components/StudentsView';
import { ProposalsHistoryView } from './components/ProposalsHistoryView';
import { InclusiveKnowledgeBase } from './components/InclusiveKnowledgeBase';
import { StudentProfileModal } from './components/StudentProfileModal';
import { LocalDataModal } from './components/LocalDataModal';
import { CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  // State from local storage
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [activities, setActivities] = useState<ActivityInput[]>([]);
  const [proposals, setProposals] = useState<SavedProposal[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Navigation
  const [currentTab, setCurrentTab] = useState<'workbench' | 'students' | 'history' | 'guide'>(
    'workbench'
  );

  // Modals
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Accessibility settings
  const [accessibility, setAccessibility] = useState<AccessibilityOptions>({
    dyslexiaFont: false,
    fontSize: 'normal',
    highContrast: false,
    reducedMotion: false,
  });

  // Load initial data on mount
  useEffect(() => {
    reloadFromStorage();
  }, []);

  const reloadFromStorage = () => {
    const loadedStudents = LocalStorageService.getStudents();
    const loadedActivities = LocalStorageService.getActivities();
    const loadedProposals = LocalStorageService.getProposals();

    setStudents(loadedStudents);
    setActivities(loadedActivities);
    setProposals(loadedProposals);

    if (loadedStudents.length > 0 && !selectedStudent) {
      setSelectedStudent(loadedStudents[0]);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Student handlers
  const handleSaveStudent = (
    studentData: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string
  ) => {
    if (id) {
      const updated = LocalStorageService.updateStudent(id, studentData);
      if (updated) {
        showToast(`Perfil de ${updated.name} atualizado com sucesso!`);
        if (selectedStudent?.id === id) {
          setSelectedStudent(updated);
        }
      }
    } else {
      const created = LocalStorageService.addStudent(studentData);
      showToast(`Aluno ${created.name} cadastrado com sucesso no banco local!`);
      setSelectedStudent(created);
    }
    reloadFromStorage();
  };

  const handleDeleteStudent = (id: string) => {
    LocalStorageService.deleteStudent(id);
    showToast('Perfil do aluno removido do banco local.');
    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }
    reloadFromStorage();
  };

  const handleSelectStudentForAdaptation = (student: StudentProfile) => {
    setSelectedStudent(student);
    setCurrentTab('workbench');
    showToast(`Pronto! Aluno ${student.name} selecionado na bancada de adaptação.`);
  };

  // Proposal handlers
  const handleSaveProposal = (
    proposal: AdaptedProposalData,
    student: StudentProfile,
    activity: ActivityInput
  ) => {
    LocalStorageService.addProposal({
      activityTitle: activity.title,
      activitySubject: activity.subject,
      originalContent: activity.content,
      studentId: student.id,
      studentName: student.name,
      studentNeurotypes: student.neurotypes,
      pedagogicalFocus: activity.pedagogicalFocus || 'Inclusão e redução de sobrecarga',
      adaptation: proposal,
      source: 'gemini_psychopedagogy_engine',
    });
    showToast('Proposta pedagógica adaptada salva com sucesso no histórico local!');
    reloadFromStorage();
  };

  const handleDeleteProposal = (id: string) => {
    LocalStorageService.deleteProposal(id);
    showToast('Atividade adaptada removida do histórico local.');
    reloadFromStorage();
  };

  // Contrast and Font classes
  const contrastClass = accessibility.highContrast ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900';
  const dyslexiaClass = accessibility.dyslexiaFont ? 'font-dyslexic' : '';

  return (
    <div className={`min-h-screen ${contrastClass} ${dyslexiaClass} flex flex-col selection:bg-teal-200 selection:text-teal-900 transition-colors`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        accessibility={accessibility}
        onUpdateAccessibility={(updates) =>
          setAccessibility((prev) => ({ ...prev, ...updates }))
        }
        onOpenDataModal={() => setIsDataModalOpen(true)}
        savedProposalsCount={proposals.length}
        studentsCount={students.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'workbench' && (
          <AdaptationWorkbench
            students={students}
            activities={activities}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
            onOpenNewStudentModal={() => {
              setEditingStudent(null);
              setIsStudentModalOpen(true);
            }}
            accessibility={accessibility}
            onSaveProposal={handleSaveProposal}
          />
        )}

        {currentTab === 'students' && (
          <StudentsView
            students={students}
            onAddStudent={() => {
              setEditingStudent(null);
              setIsStudentModalOpen(true);
            }}
            onEditStudent={(st) => {
              setEditingStudent(st);
              setIsStudentModalOpen(true);
            }}
            onDeleteStudent={handleDeleteStudent}
            onSelectStudentForAdaptation={handleSelectStudentForAdaptation}
          />
        )}

        {currentTab === 'history' && (
          <ProposalsHistoryView
            proposals={proposals}
            onDeleteProposal={handleDeleteProposal}
            accessibility={accessibility}
            onOpenWorkbench={() => setCurrentTab('workbench')}
          />
        )}

        {currentTab === 'guide' && <InclusiveKnowledgeBase />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">IncluiEdu</span>
            <span>•</span>
            <span>Psicopedagogia e Inclusão Social para Neurodivergentes</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Armazenamento Local e Privado
            </span>
            <span>•</span>
            <span>DUA & Vygotsky ZDP</span>
          </div>
        </div>
      </footer>

      {/* Student Profile Modal (Add/Edit) */}
      <StudentProfileModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
        initialStudent={editingStudent}
      />

      {/* Local Data Privacy & Backup Modal */}
      <LocalDataModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        onDataChanged={reloadFromStorage}
        stats={{
          students: students.length,
          activities: activities.length,
          proposals: proposals.length,
        }}
      />
    </div>
  );
}
