// ==========================================
// NAVIGATION TYPES
// ==========================================
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// ==========================================
// THEORY CONTENT TYPES
// ==========================================
export interface TheorySection {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  href: string;
}

export interface TheoryCard {
  id: string;
  title: string;
  content: string;
  icon?: string;
  type: 'concept' | 'example' | 'remember' | 'keyword' | 'conclusion';
}

export interface TheoryModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  sections: TheorySubSection[];
  keywords: string[];
  quickRemember: string[];
}

export interface TheorySubSection {
  id: string;
  title: string;
  content: string;
  cards?: TheoryCard[];
  examples?: string[];
  subSections?: TheorySubSection[];
}

// ==========================================
// QUIZ TYPES
// ==========================================
export type QuizMode = 'quick' | 'topic' | 'comprehensive';

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: 'khai-quat' | 'tha-hoa' | 'giai-phong' | 'y-nghia';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  topicScores: Record<string, { correct: number; total: number }>;
  feedback: string;
  suggestions: string[];
}

export interface QuizState {
  mode: QuizMode | null;
  currentQuestion: number;
  answers: Record<number, number>;
  isFinished: boolean;
  startTime: number | null;
}

// ==========================================
// GAME TYPES
// ==========================================
export interface GameItem {
  id: string;
  text: string;
  category: string;
}

export interface MemoryCard {
  id: string;
  content: string;
  matchId: string;
  type: 'concept' | 'definition';
  isFlipped: boolean;
  isMatched: boolean;
}

export interface TimelineItem {
  id: string;
  text: string;
  order: number;
}

export interface GameState {
  score: number;
  isCompleted: boolean;
  moves: number;
  startTime: number | null;
}

// ==========================================
// PRACTICAL TYPES
// ==========================================
export interface PracticalTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  examples?: string[];
}

export interface ModernAlienation {
  id: string;
  title: string;
  icon: string;
  description: string;
  examples: string[];
}

// ==========================================
// MINDMAP TYPES
// ==========================================
export interface MindmapNode {
  id: string;
  label: string;
  description?: string;
  children?: MindmapNode[];
  color?: string;
  icon?: string;
}

// ==========================================
// FEATURE CARD TYPES
// ==========================================
export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  href: string;
  gradient: string;
}

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ==========================================
// REFERENCE TYPES
// ==========================================
export interface Reference {
  id: string;
  title: string;
  author: string;
  year: string;
  publisher?: string;
  type: 'book' | 'article' | 'document' | 'online';
}
