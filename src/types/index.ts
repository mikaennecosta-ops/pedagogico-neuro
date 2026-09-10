export type Neurotype =
  | 'TEA_NIVEL_1'
  | 'TEA_NIVEL_2'
  | 'TEA_NIVEL_3'
  | 'TDAH_DESATENTO'
  | 'TDAH_HIPERATIVO'
  | 'TDAH_COMBINADO'
  | 'DISLEXIA'
  | 'DISCALCULIA'
  | 'DISGRAFIA'
  | 'TPS_PROCESSAMENTO_SENSORIAL'
  | 'SINDROME_DE_DOWN'
  | 'DEFICIENCIA_INTELECTUAL'
  | 'ALTAS_HABILIDADES'
  | 'OUTRO';

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  neurotypes: string[];
  sensoryVisual: string;
  sensoryAuditory: string;
  sensoryMotor: string;
  sensoryRegulation: string;
  attentionSpan: string;
  workingMemory: string;
  interests: string;
  emotionalSupport: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityInput {
  id?: string;
  title: string;
  subject: string;
  gradeLevel: string;
  content: string;
  pedagogicalFocus?: string;
}

export interface CognitiveStep {
  stepNumber: number;
  instruction: string;
  visualSupportCue: string;
  sensoryCheckpoint?: string;
}

export interface InteractiveTask {
  taskId: string;
  prompt: string;
  supportType: string;
  optionsOrChoices?: string[];
  sensoryTip?: string;
}

export interface StudentWorksheet {
  studentNameField: string;
  simplifiedInstructions: string;
  visualLayoutGuidelines: string;
  interactiveTasks: InteractiveTask[];
  printableSheetMarkdown: string;
}

export interface EducatorGuide {
  verbalMediationScript: string[];
  frustrationPrevention: string;
  calmingAndSensoryBreak: string;
  reinforcementStrategy?: string;
}

export interface EvaluationRubricItem {
  dimension: string;
  progressIndicators: string;
}

export interface VisualCommunicationCard {
  order: number;
  iconName: string;
  label: string;
  actionDescription: string;
}

export interface AdaptedProposalData {
  adaptedTitle: string;
  bnccCompetency: string;
  psychopedagogicalAnalysis: string;
  sensoryAccommodations: string[];
  cognitiveScaffoldingSteps: CognitiveStep[];
  studentWorksheet: StudentWorksheet;
  educatorGuide: EducatorGuide;
  formativeEvaluationRubric: EvaluationRubricItem[];
  visualCommunicationCards: VisualCommunicationCard[];
}

export interface SavedProposal {
  id: string;
  createdAt: string;
  activityTitle: string;
  activitySubject: string;
  originalContent: string;
  studentId: string;
  studentName: string;
  studentNeurotypes: string[];
  pedagogicalFocus: string;
  adaptation: AdaptedProposalData;
  source: string;
}

export interface AccessibilityOptions {
  dyslexiaFont: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
}
