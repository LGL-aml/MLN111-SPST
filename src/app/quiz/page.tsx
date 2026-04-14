'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Trophy, CheckCircle, XCircle, ArrowRight, RotateCcw, Brain, ChevronRight } from 'lucide-react';
import { MotionDiv, SectionHeading, GlassCard, ProgressBar } from '@/components/ui/SharedComponents';
import { QUIZ_QUESTIONS, QUIZ_MODES, QUIZ_TOPICS } from '@/data/quiz-data';
import { QuizMode, QuizQuestion } from '@/types';

const modeIcons: Record<string, React.ElementType> = { Zap, Target, Trophy };

export default function QuizPage() {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = useMemo(() => {
    if (!mode) return [];
    let qs = [...QUIZ_QUESTIONS];
    if (mode === 'quick') {
      qs = qs.sort(() => Math.random() - 0.5).slice(0, 10);
    } else if (mode === 'topic' && selectedTopic) {
      qs = qs.filter((q) => q.topic === selectedTopic);
    }
    return qs;
  }, [mode, selectedTopic]);

  const currentQuestion = questions[currentIndex];
  const totalCorrect = useMemo(() => {
    return Object.entries(answers).filter(([id, ans]) => {
      const q = QUIZ_QUESTIONS.find((q) => q.id === Number(id));
      return q && q.correctAnswer === ans;
    }).length;
  }, [answers]);

  const score = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;

  const handleAnswer = useCallback((optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    setShowExplanation(true);
  }, [selectedAnswer, currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  }, [currentIndex, questions.length]);

  const reset = useCallback(() => {
    setMode(null);
    setSelectedTopic(null);
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setShowExplanation(false);
    setSelectedAnswer(null);
  }, []);

  const startQuiz = useCallback((m: QuizMode) => {
    setMode(m);
    if (m !== 'topic') {
      setCurrentIndex(0);
      setAnswers({});
      setShowResult(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, []);

  const startTopicQuiz = useCallback((topic: string) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, []);

  // ==========================================
  // MODE SELECTION
  // ==========================================
  if (!mode) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <section className="section-padding">
          <div className="section-container relative">
            <SectionHeading
              badge="Quiz"
              title="Kiểm tra kiến thức"
              subtitle="Chọn chế độ quiz phù hợp và bắt đầu ôn tập ngay!"
              gradient="from-purple-400 to-pink-400"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {QUIZ_MODES.map((m, i) => {
                const Icon = modeIcons[m.icon] || Zap;
                return (
                  <MotionDiv key={m.id} delay={i * 0.1}>
                    <button onClick={() => startQuiz(m.id)} className="w-full text-left">
                      <GlassCard hover className="p-6 h-full">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-4`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{m.title}</h3>
                        <p className="text-sm text-white/50">{m.description}</p>
                        {m.questionCount > 0 && (
                          <p className="text-xs text-white/30 mt-3">{m.questionCount} câu hỏi</p>
                        )}
                      </GlassCard>
                    </button>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ==========================================
  // TOPIC SELECTION
  // ==========================================
  if (mode === 'topic' && !selectedTopic) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <section className="section-padding">
          <div className="section-container relative">
            <SectionHeading
              badge="Chọn chủ đề"
              title="Quiz theo chủ đề"
              subtitle="Chọn phần bạn muốn ôn tập"
              gradient="from-purple-400 to-indigo-400"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {QUIZ_TOPICS.map((topic, i) => (
                <MotionDiv key={topic.id} delay={i * 0.1}>
                  <button onClick={() => startTopicQuiz(topic.id)} className="w-full text-left">
                    <GlassCard hover className="p-6">
                      <div className="w-3 h-3 rounded-full mb-3" style={{ background: topic.color }} />
                      <h3 className="font-semibold text-white">{topic.label}</h3>
                      <p className="text-xs text-white/40 mt-1">
                        {QUIZ_QUESTIONS.filter((q) => q.topic === topic.id).length} câu hỏi
                      </p>
                    </GlassCard>
                  </button>
                </MotionDiv>
              ))}
            </div>
            <div className="text-center mt-6">
              <button onClick={reset} className="text-sm text-white/40 hover:text-white/60 transition">
                ← Quay lại chọn chế độ
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ==========================================
  // RESULTS
  // ==========================================
  if (showResult) {
    const feedback = score >= 80 ? 'Xuất sắc! 🏆' : score >= 60 ? 'Khá tốt! 👍' : score >= 40 ? 'Cần ôn thêm 📖' : 'Hãy ôn lại nhé! 💪';
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <section className="section-padding">
          <div className="section-container relative">
            <MotionDiv className="max-w-lg mx-auto">
              <GlassCard className="p-8 text-center">
                <div className="text-6xl mb-4">{score >= 80 ? '🏆' : score >= 60 ? '🎉' : score >= 40 ? '📖' : '💪'}</div>
                <h2 className="text-3xl font-bold text-white mb-2">Kết quả</h2>
                <p className="text-xl text-white/60 mb-6">{feedback}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/[0.03]">
                    <div className="text-2xl font-bold text-white">{score}%</div>
                    <div className="text-xs text-white/40">Điểm</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03]">
                    <div className="text-2xl font-bold text-emerald-400">{totalCorrect}</div>
                    <div className="text-xs text-white/40">Đúng</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03]">
                    <div className="text-2xl font-bold text-red-400">{questions.length - totalCorrect}</div>
                    <div className="text-xs text-white/40">Sai</div>
                  </div>
                </div>

                <ProgressBar value={totalCorrect} max={questions.length} color={score >= 60 ? '#10b981' : '#ef4444'} />

                {score < 80 && (
                  <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-left">
                    <p className="text-sm text-amber-400 font-semibold mb-2">💡 Gợi ý ôn lại</p>
                    <p className="text-sm text-white/50">
                      {score < 40 && 'Hãy đọc lại toàn bộ lý thuyết trước khi làm quiz lần nữa.'}
                      {score >= 40 && score < 60 && 'Tập trung ôn lại các phần bạn còn yếu, đặc biệt là phần tha hóa và giải phóng.'}
                      {score >= 60 && score < 80 && 'Bạn đã nắm tốt! Hãy ôn thêm chi tiết để đạt điểm tuyệt đối.'}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-8 justify-center">
                  <button onClick={reset} className="btn-secondary">
                    <RotateCcw className="w-4 h-4" />
                    Làm lại
                  </button>
                  <button onClick={() => { reset(); startQuiz('comprehensive'); }} className="btn-primary">
                    <Brain className="w-4 h-4" />
                    Quiz tổng hợp
                  </button>
                </div>
              </GlassCard>
            </MotionDiv>
          </div>
        </section>
      </div>
    );
  }

  // ==========================================
  // QUESTION VIEW
  // ==========================================
  if (!currentQuestion) return null;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <section className="section-padding">
        <div className="section-container relative">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <MotionDiv className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <button onClick={reset} className="text-sm text-white/40 hover:text-white/60 transition">
                  ← Thoát
                </button>
                <span className="text-sm text-white/50">
                  Câu {currentIndex + 1} / {questions.length}
                </span>
              </div>
              <ProgressBar value={currentIndex + 1} max={questions.length} color="#8b5cf6" showLabel={false} />
            </MotionDiv>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-8 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      currentQuestion.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-400' :
                      currentQuestion.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {currentQuestion.difficulty === 'easy' ? 'Dễ' : currentQuestion.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                    </span>
                    <span className="text-xs text-white/30">
                      {currentQuestion.type === 'true-false' ? 'Đúng / Sai' : 'Trắc nghiệm'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                </GlassCard>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = currentQuestion.correctAnswer === i;
                    const showFeedback = showExplanation;

                    let className = 'quiz-option glass-card p-4 flex items-center gap-4 rounded-xl';
                    if (showFeedback && isCorrect) className += ' correct';
                    else if (showFeedback && isSelected && !isCorrect) className += ' incorrect';
                    else if (isSelected) className += ' selected';

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation}
                        className={`${className} w-full text-left`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${
                          showFeedback && isCorrect ? 'bg-emerald-500/20 text-emerald-400' :
                          showFeedback && isSelected && !isCorrect ? 'bg-red-500/20 text-red-400' :
                          'bg-white/5 text-white/50'
                        }`}>
                          {showFeedback && isCorrect ? <CheckCircle className="w-4 h-4" /> :
                           showFeedback && isSelected && !isCorrect ? <XCircle className="w-4 h-4" /> :
                           String.fromCharCode(65 + i)}
                        </div>
                        <span className="text-sm text-white/80">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <GlassCard className={`p-6 mb-6 border ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'border-emerald-500/20 bg-emerald-500/[0.03]'
                          : 'border-red-500/20 bg-red-500/[0.03]'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {selectedAnswer === currentQuestion.correctAnswer ? (
                            <><CheckCircle className="w-4 h-4 text-emerald-400" /><span className="text-sm font-semibold text-emerald-400">Chính xác!</span></>
                          ) : (
                            <><XCircle className="w-4 h-4 text-red-400" /><span className="text-sm font-semibold text-red-400">Chưa đúng</span></>
                          )}
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">{currentQuestion.explanation}</p>
                      </GlassCard>

                      <button onClick={handleNext} className="btn-primary w-full justify-center">
                        {currentIndex < questions.length - 1 ? (
                          <>Câu tiếp theo <ArrowRight className="w-4 h-4" /></>
                        ) : (
                          <>Xem kết quả <Trophy className="w-4 h-4" /></>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
