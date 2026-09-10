import { StudentProfile, ActivityInput, SavedProposal } from '../types';

const STORAGE_KEYS = {
  STUDENTS: 'incluiedu_students_v1',
  ACTIVITIES: 'incluiedu_activities_v1',
  PROPOSALS: 'incluiedu_proposals_v1',
  ACCESSIBILITY: 'incluiedu_accessibility_v1',
};

// Initial realistic default student profiles created with psychological & pedagogical rigor
const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'student-1',
    name: 'Lucas M.',
    age: 9,
    grade: '4º Ano do Ensino Fundamental',
    neurotypes: ['TEA Nível 1 de Suporte (Autismo)', 'Transtorno do Processamento Sensorial (TPS)'],
    sensoryVisual: 'Hipersensibilidade a poluição visual e excesso de cores na página. Necessita de espaçamento generoso e delimitação clara em caixas.',
    sensoryAuditory: 'Sensível a barulhos agudos ou conversas paralelas. Melhor desempenho com instruções dadas de forma calma e sem ambiguidades.',
    sensoryMotor: 'Dificuldade com caligrafia prolongada (fadiga motora fina). Prefere marcar X, circular, ligar pontos ou usar recorte.',
    sensoryRegulation: 'Precisa de pausas curtas de 2 minutos a cada 15 minutos com estímulo proprioceptivo (apertar bola anti-stress).',
    attentionSpan: 'Foco sustentado de 10 a 15 minutos em tarefas bem estruturadas.',
    workingMemory: 'Capacidade de processar 1 a 2 comandos por vez. Necessita de checklist visual dos passos.',
    interests: 'Astronomia, Planetas, Foguetes, Dinossauros e Robótica',
    emotionalSupport: 'Ansiedade diante do erro ou imprevisibilidade. Reage muito bem a rotina antecipada e frases de encorajamento descritivo.',
    notes: 'Acompanhado pelo AEE às terças e quintas-feiras.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'student-2',
    name: 'Beatriz S.',
    age: 11,
    grade: '6º Ano do Ensino Fundamental',
    neurotypes: ['TDAH Tipo Combinado (Desatento e Hiperativo)'],
    sensoryVisual: 'Beneficia-se de cores de alto contraste para destacar palavras-chave e enunciados curtos em negrito.',
    sensoryAuditory: 'Distrai-se facilmente com estímulos sonoros externos; fones abafadores ou ruído branco ajudam.',
    sensoryMotor: 'Inquietação motora comum (precisa movimentar pés ou ter um elástico preso nos pés da cadeira).',
    sensoryRegulation: 'Micro-intervalos com movimento corporal ativo (levantar para beber água ou esticar).',
    attentionSpan: 'Atenção oscilante (blocos de 8 a 10 minutos de alta produtividade seguidos de dispersão).',
    workingMemory: 'Dificuldade em reter enunciados longos com múltiplas perguntas embutidas; precisa de fragmentação.',
    interests: 'Desenho estilo Mangá, Jogos de Aventura, Animais Silvestres',
    emotionalSupport: 'Baixa tolerância à frustração com tarefas repetitivas. Gamificação com pontuação ou carimbos funciona com excelência.',
    notes: 'Usa prancheta de foco e cronômetro Pomodoro adaptado (15/3 min).',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'student-3',
    name: 'Enzo R.',
    age: 8,
    grade: '3º Ano do Ensino Fundamental',
    neurotypes: ['Dislexia do Desenvolvimento', 'Disgrafia Leve'],
    sensoryVisual: 'Texto muito denso causa cansaço visual e espelhamento de letras (p/q, b/d). Exige fonte sans-serif com espaçamento largo (OpenDyslexic ou Lexend) e fundo não ofuscante.',
    sensoryAuditory: 'Ótima compreensão oral e auditiva (aprende muito ouvindo explicações e histórias).',
    sensoryMotor: 'Pressão excessiva do lápis no papel e dores nos dedos; prefere respostas orais gravadas ou marcações simples.',
    sensoryRegulation: 'Relaxamento muscular nas mãos e ombros antes da escrita.',
    attentionSpan: 'Atenção boa, mas cansa rapidamente se obrigado a ler textos longos sem apoio imagético.',
    workingMemory: 'Processamento fonológico mais lento; necessita de pistas visuais e figuras correspondentes às palavras.',
    interests: 'Super-heróis, Construção com Blocos/Lego, Esportes e Corrida',
    emotionalSupport: 'Vergonha de ler em voz alta perto dos colegas. Valorizar o raciocínio oral preserva sua autoestima.',
    notes: 'Liberado o uso de leitor de tela e atividades orais com auxílio do mediador.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initial realistic standard school activities from common curriculum
const INITIAL_ACTIVITIES: ActivityInput[] = [
  {
    id: 'act-1',
    title: 'Ciências: O Ciclo da Água na Natureza',
    subject: 'Ciências Naturais',
    gradeLevel: '4º e 5º Ano',
    content: `Leia o texto e responda às questões:
A água na Terra está em constante movimento, num ciclo contínuo chamado ciclo hidrológico. O calor do Sol aquece a água dos rios, lagos e oceanos, fazendo com que ela evapore e se transforme em vapor de água. Esse vapor sobe para a atmosfera, onde encontra temperaturas mais frias e se condensa, formando as nuvens. Quando as nuvens ficam carregadas, ocorre a precipitação em forma de chuva, neve ou granizo. A água que cai penetra no solo formando os lençóis freáticos ou retorna aos rios e oceanos, reiniciando o ciclo.
Questão 1: Explique detalhadamente com suas próprias palavras o que é evaporação e dê um exemplo do seu dia a dia.
Questão 2: Qual a diferença entre condensação e precipitação?
Questão 3: Em uma redação de 10 linhas, descreva a importância de preservar as nascentes de água para o ciclo hidrológico.`,
    pedagogicalFocus: 'Reduzir a densidade do texto em passos visuais com ilustrações dos estados físicos e permitir respostas alternativas (associação e desenho) sem perder o rigor científico.',
  },
  {
    id: 'act-2',
    title: 'Matemática: Situações-Problema na Feira',
    subject: 'Matemática',
    gradeLevel: '3º e 4º Ano',
    content: `Resolva as seguintes situações-problema no seu caderno mostrando todas as contas:
1) Dona Maria foi à feira e comprou 3 dúzias de laranjas por R$ 6,00 a dúzia, 2 quilos de maçã por R$ 8,50 o quilo e 4 pés de alface a R$ 2,50 cada. Ela pagou com uma nota de R$ 50,00. Quanto Dona Maria gastou no total e qual foi o seu troco?
2) Se cada dúzia tem 12 laranjas, quantas laranjas ela comprou no total? Se ela dividir igualmente essas laranjas entre seus 4 netos, quantas laranjas cada um receberá?`,
    pedagogicalFocus: 'Desmembrar o enunciado multifacetado em micro-etapas com suporte de moedas/desenhos visuais e calculo estruturado por etapas.',
  },
  {
    id: 'act-3',
    title: 'Língua Portuguesa: Fábula "A Cigarra e a Formiga"',
    subject: 'Língua Portuguesa',
    gradeLevel: '3º Ano',
    content: `Durante todo o verão, a cigarra não fez outra coisa senão cantar, enquanto a formiga trabalhava juntando grãos para o inverno. Quando o inverno chegou e o frio apertou, a cigarra, faminta e com frio, foi bater na porta do formigueiro pedindo um pouco de comida. A formiga então perguntou: "O que você fez durante o verão todo?". A cigarra respondeu: "Eu cantava para alegrar a todos!". A formiga respondeu: "Pois agora, dance!".
Atividades:
1. Copie todo o diálogo entre a cigarra e a formiga observando a pontuação correta.
2. Escreva qual é a moral da história e o que você pensa sobre a atitude da formiga.
3. Encontre no texto 3 substantivos próprios e 3 adjetivos.`,
    pedagogicalFocus: 'Substituir a cópia exaustiva por tirinha sequencial com balões de fala e reflexão socioemocional sobre empatia e colaboração mútua.',
  },
];

export const LocalStorageService = {
  // Students
  getStudents(): StudentProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (!data) {
        this.saveStudents(INITIAL_STUDENTS);
        return INITIAL_STUDENTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading students from localStorage:', e);
      return INITIAL_STUDENTS;
    }
  },

  saveStudents(students: StudentProfile[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.error('Error saving students to localStorage:', e);
    }
  },

  addStudent(student: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'>): StudentProfile {
    const students = this.getStudents();
    const newStudent: StudentProfile = {
      ...student,
      id: 'student_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    students.unshift(newStudent);
    this.saveStudents(students);
    return newStudent;
  },

  updateStudent(id: string, updates: Partial<StudentProfile>): StudentProfile | null {
    const students = this.getStudents();
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const updated = {
      ...students[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    students[index] = updated;
    this.saveStudents(students);
    return updated;
  },

  deleteStudent(id: string): boolean {
    const students = this.getStudents();
    const filtered = students.filter((s) => s.id !== id);
    if (filtered.length === students.length) return false;
    this.saveStudents(filtered);
    return true;
  },

  // Activities
  getActivities(): ActivityInput[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      if (!data) {
        this.saveActivities(INITIAL_ACTIVITIES);
        return INITIAL_ACTIVITIES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading activities from localStorage:', e);
      return INITIAL_ACTIVITIES;
    }
  },

  saveActivities(activities: ActivityInput[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
    } catch (e) {
      console.error('Error saving activities to localStorage:', e);
    }
  },

  addActivity(activity: ActivityInput): ActivityInput {
    const activities = this.getActivities();
    const newActivity: ActivityInput = {
      ...activity,
      id: activity.id || 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    activities.unshift(newActivity);
    this.saveActivities(activities);
    return newActivity;
  },

  deleteActivity(id: string): void {
    const activities = this.getActivities();
    const filtered = activities.filter((a) => a.id !== id);
    this.saveActivities(filtered);
  },

  // Proposals
  getProposals(): SavedProposal[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
      if (!data) return [];
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading proposals from localStorage:', e);
      return [];
    }
  },

  saveProposals(proposals: SavedProposal[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(proposals));
    } catch (e) {
      console.error('Error saving proposals to localStorage:', e);
    }
  },

  addProposal(proposal: Omit<SavedProposal, 'id' | 'createdAt'>): SavedProposal {
    const proposals = this.getProposals();
    const newProposal: SavedProposal = {
      ...proposal,
      id: 'prop_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
    };
    proposals.unshift(newProposal);
    this.saveProposals(proposals);
    return newProposal;
  },

  deleteProposal(id: string): void {
    const proposals = this.getProposals();
    const filtered = proposals.filter((p) => p.id !== id);
    this.saveProposals(filtered);
  },

  // Export / Import (Local privacy backup)
  exportAllData(): string {
    const dump = {
      exportedAt: new Date().toISOString(),
      app: 'IncluiEdu - Psicopedagogia Inclusiva',
      version: '1.0',
      students: this.getStudents(),
      activities: this.getActivities(),
      proposals: this.getProposals(),
    };
    return JSON.stringify(dump, null, 2);
  },

  importData(jsonString: string): { success: boolean; message: string; counts?: { students: number; activities: number; proposals: number } } {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Arquivo inválido ou corrompido.' };
      }

      if (Array.isArray(parsed.students)) {
        this.saveStudents(parsed.students);
      }
      if (Array.isArray(parsed.activities)) {
        this.saveActivities(parsed.activities);
      }
      if (Array.isArray(parsed.proposals)) {
        this.saveProposals(parsed.proposals);
      }

      return {
        success: true,
        message: 'Dados locais restaurados com sucesso!',
        counts: {
          students: Array.isArray(parsed.students) ? parsed.students.length : 0,
          activities: Array.isArray(parsed.activities) ? parsed.activities.length : 0,
          proposals: Array.isArray(parsed.proposals) ? parsed.proposals.length : 0,
        },
      };
    } catch (err: any) {
      return { success: false, message: `Erro ao importar: ${err?.message || 'Formato JSON inválido'}` };
    }
  },

  resetToDefaults(): void {
    this.saveStudents(INITIAL_STUDENTS);
    this.saveActivities(INITIAL_ACTIVITIES);
    this.saveProposals([]);
  },
};
