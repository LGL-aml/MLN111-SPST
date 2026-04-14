'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, CheckCircle, Sparkles } from 'lucide-react';
import { MotionDiv, StaggerContainer, StaggerItem, SectionHeading, GlassCard, ProgressBar } from '@/components/ui/SharedComponents';
import { CLASSIFY_ITEMS, CLASSIFY_CATEGORIES, generateMemoryCards, TIMELINE_ITEMS, GAME_DESCRIPTIONS } from '@/data/games-data';
import { MemoryCard as MemoryCardType, TimelineItem } from '@/types';

// ==========================================
// GAME SELECTOR
// ==========================================
export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (!activeGame) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <section className="section-padding">
          <div className="section-container relative">
            <SectionHeading
              badge="Trò chơi"
              title="Học mà chơi, chơi mà học"
              subtitle="Củng cố kiến thức qua các mini game tương tác"
              gradient="from-amber-400 to-orange-400"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {GAME_DESCRIPTIONS.map((game, i) => (
                <MotionDiv key={game.id} delay={i * 0.1}>
                  <button onClick={() => setActiveGame(game.id)} className="w-full text-left">
                    <GlassCard hover className="p-6 h-full">
                      <span className="text-4xl block mb-4">{game.icon}</span>
                      <h3 className="text-lg font-semibold text-white mb-2">{game.title}</h3>
                      <p className="text-sm text-white/50 mb-3">{game.description}</p>
                      <span className="text-xs text-white/30">
                        Độ khó: {game.difficulty}
                      </span>
                    </GlassCard>
                  </button>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <section className="section-padding">
        <div className="section-container relative">
          <button onClick={() => setActiveGame(null)} className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách
          </button>

          {activeGame === 'classify' && <ClassifyGame />}
          {activeGame === 'memory' && <MemoryGame />}
          {activeGame === 'timeline' && <TimelineGame />}
        </div>
      </section>
    </div>
  );
}

// ==========================================
// GAME 1: PHÂN LOẠI
// ==========================================
function ClassifyGame() {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const unplacedItems = useMemo(
    () => CLASSIFY_ITEMS.filter((item) => !placements[item.id]).sort(() => Math.random() - 0.5),
    [placements]
  );

  const handlePlaceItem = useCallback((categoryId: string) => {
    if (!selectedItem) return;
    setPlacements((prev) => ({ ...prev, [selectedItem]: categoryId }));
    setSelectedItem(null);
  }, [selectedItem]);

  const checkResult = useCallback(() => {
    setIsComplete(true);
  }, []);

  const correctCount = useMemo(() => {
    return Object.entries(placements).filter(([itemId, catId]) => {
      const item = CLASSIFY_ITEMS.find((i) => i.id === itemId);
      return item && item.category === catId;
    }).length;
  }, [placements]);

  const resetGame = useCallback(() => {
    setPlacements({});
    setSelectedItem(null);
    setIsComplete(false);
  }, []);

  return (
    <div>
      <SectionHeading title="Phân loại khái niệm" subtitle="Chọn mỗi khái niệm rồi click vào nhóm phù hợp" gradient="from-blue-400 to-purple-400" />

      {isComplete ? (
        <MotionDiv className="max-w-md mx-auto">
          <GlassCard className="p-8 text-center">
            <div className="text-5xl mb-4">{correctCount === CLASSIFY_ITEMS.length ? '🏆' : '🎯'}</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {correctCount}/{CLASSIFY_ITEMS.length} đúng!
            </h3>
            <ProgressBar value={correctCount} max={CLASSIFY_ITEMS.length} color={correctCount === CLASSIFY_ITEMS.length ? '#10b981' : '#f59e0b'} />
            <button onClick={resetGame} className="btn-primary mt-6">
              <RotateCcw className="w-4 h-4" /> Chơi lại
            </button>
          </GlassCard>
        </MotionDiv>
      ) : (
        <div className="space-y-8">
          {/* Unplaced Items */}
          {unplacedItems.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {unplacedItems.map((item) => (
                <motion.button
                  key={item.id}
                  layout
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                    selectedItem === item.id
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                  }`}
                >
                  {item.text}
                </motion.button>
              ))}
            </div>
          )}

          {selectedItem && (
            <p className="text-center text-sm text-purple-400 animate-pulse">
              👆 Bây giờ click vào nhóm phù hợp bên dưới
            </p>
          )}

          {/* Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLASSIFY_CATEGORIES.map((cat) => {
              const placedItems = CLASSIFY_ITEMS.filter((item) => placements[item.id] === cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => handlePlaceItem(cat.id)}
                  disabled={!selectedItem}
                  className="text-left"
                >
                  <GlassCard className={`p-4 min-h-[140px] transition-all ${selectedItem ? 'hover:border-white/20 cursor-pointer' : 'cursor-default'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span>{cat.icon}</span>
                      <h4 className="font-semibold text-sm" style={{ color: cat.color }}>{cat.label}</h4>
                    </div>
                    <div className="space-y-1">
                      {placedItems.map((item) => (
                        <div key={item.id} className="text-xs px-2 py-1 rounded bg-white/5 text-white/60">
                          {item.text}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </button>
              );
            })}
          </div>

          {unplacedItems.length === 0 && (
            <div className="text-center">
              <button onClick={checkResult} className="btn-primary">
                <CheckCircle className="w-4 h-4" /> Kiểm tra kết quả
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// GAME 2: LẬT THẺ GHI NHỚ
// ==========================================
function MemoryGame() {
  const [cards, setCards] = useState<MemoryCardType[]>(() => generateMemoryCards());
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const matchedCount = cards.filter((c) => c.isMatched).length;
  const isComplete = matchedCount === cards.length;

  const handleFlip = useCallback((cardId: string) => {
    if (isChecking) return;
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    if (flippedIds.length >= 2) return;

    const newFlipped = [...flippedIds, cardId];
    setFlippedIds(newFlipped);
    setCards((prev) => prev.map((c) => c.id === cardId ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      const card1 = cards.find((c) => c.id === first)!;
      const card2 = cards.find((c) => c.id === second)!;

      if (card1.matchId === second || card2.matchId === first) {
        // Match!
        setTimeout(() => {
          setCards((prev) => prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          ));
          setFlippedIds([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) => prev.map((c) =>
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedIds([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [cards, flippedIds, isChecking]);

  const resetGame = useCallback(() => {
    setCards(generateMemoryCards());
    setFlippedIds([]);
    setMoves(0);
    setIsChecking(false);
  }, []);

  return (
    <div>
      <SectionHeading title="Lật thẻ ghi nhớ" subtitle="Ghép cặp khái niệm với định nghĩa tương ứng" gradient="from-amber-400 to-orange-400" />

      <div className="flex items-center justify-center gap-6 mb-8">
        <span className="text-sm text-white/50">Lượt: <strong className="text-white">{moves}</strong></span>
        <span className="text-sm text-white/50">Đã ghép: <strong className="text-white">{matchedCount / 2}/{cards.length / 2}</strong></span>
      </div>

      {isComplete ? (
        <MotionDiv className="max-w-md mx-auto">
          <GlassCard className="p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">Hoàn thành!</h3>
            <p className="text-white/50 mb-4">Bạn hoàn thành trong {moves} lượt</p>
            <button onClick={resetGame} className="btn-primary">
              <RotateCcw className="w-4 h-4" /> Chơi lại
            </button>
          </GlassCard>
        </MotionDiv>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layout
              className={`memory-card aspect-square ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
              onClick={() => handleFlip(card.id)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="memory-card-inner">
                <div className="memory-card-front">
                  <span className="text-2xl">❓</span>
                </div>
                <div className="memory-card-back">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full mb-1 inline-block ${
                      card.type === 'concept' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {card.type === 'concept' ? 'Khái niệm' : 'Định nghĩa'}
                    </span>
                    <p className="text-xs text-white/80 mt-1 font-medium">{card.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// GAME 3: SẮP XẾP TIẾN TRÌNH
// ==========================================
function TimelineGame() {
  const [items, setItems] = useState<TimelineItem[]>(() =>
    [...TIMELINE_ITEMS].sort(() => Math.random() - 0.5)
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSwap = useCallback((index: number) => {
    if (isChecked) return;
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      const newItems = [...items];
      [newItems[selectedIndex], newItems[index]] = [newItems[index], newItems[selectedIndex]];
      setItems(newItems);
      setSelectedIndex(null);
    }
  }, [selectedIndex, items, isChecked]);

  const checkOrder = useCallback(() => {
    const isCorrect = items.every((item, i) => item.order === i + 1);
    setIsChecked(true);
    if (isCorrect) setIsComplete(true);
  }, [items]);

  const resetGame = useCallback(() => {
    setItems([...TIMELINE_ITEMS].sort(() => Math.random() - 0.5));
    setSelectedIndex(null);
    setIsComplete(false);
    setIsChecked(false);
  }, []);

  const correctCount = items.filter((item, i) => item.order === i + 1).length;

  return (
    <div>
      <SectionHeading title="Sắp xếp tiến trình" subtitle="Sắp xếp các bước theo đúng trình tự lịch sử" gradient="from-emerald-400 to-teal-400" />

      <p className="text-center text-sm text-white/40 mb-6">Click vào 2 ô để hoán đổi vị trí</p>

      {isComplete ? (
        <MotionDiv className="max-w-md mx-auto">
          <GlassCard className="p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">Chính xác!</h3>
            <p className="text-white/50 mb-4">Bạn đã sắp xếp đúng toàn bộ tiến trình</p>
            <button onClick={resetGame} className="btn-primary">
              <RotateCcw className="w-4 h-4" /> Chơi lại
            </button>
          </GlassCard>
        </MotionDiv>
      ) : (
        <div className="max-w-lg mx-auto space-y-3">
          {items.map((item, index) => {
            const isCorrectPosition = isChecked && item.order === index + 1;
            const isWrongPosition = isChecked && item.order !== index + 1;

            return (
              <motion.button
                key={item.id}
                layout
                onClick={() => handleSwap(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  selectedIndex === index
                    ? 'bg-purple-500/20 border-purple-500/40'
                    : isCorrectPosition
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : isWrongPosition
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                  isCorrectPosition ? 'bg-emerald-500/20 text-emerald-400' :
                  isWrongPosition ? 'bg-red-500/20 text-red-400' :
                  'bg-white/5 text-white/50'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm text-white/80 flex-1">{item.text}</span>
                {isCorrectPosition && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
              </motion.button>
            );
          })}

          <div className="flex gap-3 justify-center pt-4">
            {isChecked && !isComplete && (
              <div className="text-center">
                <p className="text-sm text-amber-400 mb-3">{correctCount}/{items.length} đúng vị trí. Thử lại!</p>
                <button onClick={() => setIsChecked(false)} className="btn-secondary">Tiếp tục sắp xếp</button>
              </div>
            )}
            {!isChecked && (
              <button onClick={checkOrder} className="btn-primary">
                <CheckCircle className="w-4 h-4" /> Kiểm tra
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
