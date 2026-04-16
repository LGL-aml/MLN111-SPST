import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

type AnswerLetter = 'A' | 'B' | 'C' | 'D';
const LETTERS = ['A', 'B', 'C', 'D'] as const;

const EXAM_COUNT = 60;
const EXAM_DURATION = 60 * 60; // 60 minutes in seconds

interface ExamQuestion {
  _id: string;
  questionId: number;
  question: string;
  options: string[];
  answer: AnswerLetter;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Exam() {
  const navigate = useNavigate();
  const rawQuestions = useQuery(api.questions.list);
  const seedMutation = useMutation(api.questions.seed);

  const seeded = useRef(false);
  const picked = useRef(false);

  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerLetter>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [wantToFinish, setWantToFinish] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rawQuestions === undefined) return;
    if (seeded.current) return;
    seeded.current = true;

    if (rawQuestions.length === 0) {
      seedMutation({}).catch(err => {
        console.error('Failed to seed quizQuestions:', err);
      });
    }
  }, [rawQuestions, seedMutation]);

  useEffect(() => {
    if (!rawQuestions || rawQuestions.length === 0) return;
    if (picked.current) return;
    picked.current = true;

    const normalized: ExamQuestion[] = rawQuestions.map(q => ({
      _id: q._id,
      questionId: q.questionId,
      question: q.question,
      options: q.options,
      answer: q.answer as AnswerLetter,
    }));

    const pool = shuffle(normalized);
    const selected = pool.slice(0, Math.min(EXAM_COUNT, pool.length));

    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setWantToFinish(false);
    setSubmitted(false);
    setTimeLeft(EXAM_DURATION);
  }, [rawQuestions]);

  useEffect(() => {
    if (questions.length === 0) return;
    if (submitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questions.length, submitted]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPct = total > 0 ? (answeredCount / total) * 100 : 0;

  const currentQ = questions[currentIndex];

  const handleSelect = (opt: AnswerLetter) => {
    if (!currentQ) return;
    setAnswers(prev => ({ ...prev, [currentQ._id]: opt }));
  };

  const handleSubmit = () => {
    if (!wantToFinish) return;
    if (questions.length === 0) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
  };

  if (rawQuestions === undefined || questions.length === 0 || !currentQ) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#f0f0f0',
          color: '#111',
          colorScheme: 'light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '520px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Đang tải đề thi…</div>
          <div style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
            Hệ thống đang lấy {EXAM_COUNT} câu hỏi ngẫu nhiên từ ngân hàng câu hỏi.
          </div>
          <button
            onClick={() => navigate('/quiz')}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              padding: '6px 18px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  /* ─── Results screen ─── */
  if (submitted) {
    const correctCount = questions.filter(q => answers[q._id] === q.answer).length;
    const score = parseFloat(((correctCount / Math.max(1, total)) * 10).toFixed(1));
    const passed = score >= 5;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#f0f0f0',
          color: '#111',
          colorScheme: 'light',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontFamily: 'Arial, sans-serif',
          overflowY: 'auto',
          padding: '20px 0',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            width: '92vw',
            maxWidth: '960px',
            border: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          }}
        >
          {/* Result banner */}
          <div
            style={{
              backgroundColor: passed ? '#28a745' : '#dc3545',
              color: '#fff',
              padding: '24px 32px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '6px' }}>
              {passed ? 'ĐẠT' : 'CHƯA ĐẠT'}
            </div>
            <div style={{ fontSize: '15px', opacity: 0.9 }}>
              Kết quả bài thi Triết học Mác-Lênin (MLN111)
            </div>
          </div>

          {/* Score summary */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              padding: '28px 24px',
              borderBottom: '1px solid #eee',
              flexWrap: 'wrap',
              backgroundColor: '#fafafa',
            }}
          >
            {[
              { value: score.toFixed(1), label: 'Điểm số / 10', color: passed ? '#28a745' : '#dc3545' },
              { value: `${correctCount}/${total}`, label: 'Câu đúng', color: '#28a745' },
              { value: `${total - correctCount}/${total}`, label: 'Câu sai', color: '#dc3545' },
              { value: `${total - answeredCount}`, label: 'Bỏ qua', color: '#999' },
            ].map(({ value, label, color }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '44px', fontWeight: 'bold', color }}>{value}</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Review table */}
          <div style={{ padding: '20px 24px', overflowX: 'auto' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '12px', color: '#333' }}>
              Chi tiết từng câu:
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#e8e8e8' }}>
                  <th style={{ border: '1px solid #ccc', padding: '7px 10px', textAlign: 'center', width: '46px' }}>
                    Câu
                  </th>
                  <th style={{ border: '1px solid #ccc', padding: '7px 10px', textAlign: 'left' }}>Nội dung câu hỏi</th>
                  <th style={{ border: '1px solid #ccc', padding: '7px 10px', textAlign: 'center', width: '80px' }}>
                    Bạn chọn
                  </th>
                  <th style={{ border: '1px solid #ccc', padding: '7px 10px', textAlign: 'center', width: '80px' }}>
                    Đáp án đúng
                  </th>
                  <th style={{ border: '1px solid #ccc', padding: '7px 10px', textAlign: 'center', width: '64px' }}>
                    Kết quả
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, i) => {
                  const userAns = answers[q._id];
                  const isCorrect = userAns === q.answer;
                  const rowBg = !userAns ? '#fffbe6' : isCorrect ? '#f0fff0' : '#fff0f0';
                  return (
                    <tr key={q._id} style={{ backgroundColor: rowBg }}>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{i + 1}</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px', lineHeight: '1.45' }}>
                        {q.question.length > 90 ? q.question.slice(0, 90) + '…' : q.question}
                      </td>
                      <td
                        style={{
                          border: '1px solid #ddd',
                          padding: '7px 10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: !userAns ? '#aaa' : isCorrect ? '#28a745' : '#dc3545',
                        }}
                      >
                        {userAns ?? '—'}
                      </td>
                      <td
                        style={{
                          border: '1px solid #ddd',
                          padding: '7px 10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#28a745',
                        }}
                      >
                        {q.answer}
                      </td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center', fontSize: '16px' }}>
                        {!userAns ? '○' : isCorrect ? '✓' : '✗'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div
            style={{
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              borderTop: '1px solid #eee',
              backgroundColor: '#fafafa',
            }}
          >
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: '8px 32px',
                backgroundColor: '#ffeb3b',
                border: '1px solid #ccc',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Quay về trang Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Exam screen ─── */
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#f0f0f0',
        color: '#111',
        colorScheme: 'light',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#f5f5f5',
          width: '98vw',
          height: '96vh',
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            height: '25px',
            backgroundColor: '#e0e0e0',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            padding: '0 10px',
            gap: '5px',
            flexShrink: 0,
          }}
        >
          {/* Spacer aligned with left panel */}
          <div style={{ width: '120px' }} />
          {/* Timer aligned with middle panel */}
          <div style={{ width: '250px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#d9534f', fontSize: '13px' }}>
              {formatTime(timeLeft)}
            </span>
          </div>
          {/* Progress bar aligned with right panel */}
          <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                backgroundColor: '#28a745',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            padding: '10px',
            gap: '5px',
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {/* Left panel */}
          <div
            style={{
              width: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderRight: '1px solid #ddd',
              flexShrink: 0,
              paddingTop: '5px',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '15px', paddingLeft: '5px' }}>
              Answer
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: '10px' }}>
              {LETTERS.map(opt => (
                <label
                  key={opt}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={answers[currentQ._id] === opt}
                    onChange={() => handleSelect(opt)}
                    style={{ cursor: 'pointer' }}
                  />
                  {opt}
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '5px', marginTop: '12px', paddingLeft: '5px' }}>
              <button
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                style={{
                  padding: '3px 8px',
                  border: '1px solid #999',
                  backgroundColor: '#fff',
                  cursor: currentIndex === 0 ? 'default' : 'pointer',
                  fontSize: '12px',
                  opacity: currentIndex === 0 ? 0.45 : 1,
                }}
              >
                Back
              </button>
              <button
                onClick={() => setCurrentIndex(i => Math.min(total - 1, i + 1))}
                disabled={currentIndex === total - 1}
                style={{
                  padding: '3px 8px',
                  border: '1px solid #999',
                  backgroundColor: '#fff',
                  cursor: currentIndex === total - 1 ? 'default' : 'pointer',
                  fontSize: '12px',
                  opacity: currentIndex === total - 1 ? 0.45 : 1,
                }}
              >
                Next
              </button>
            </div>
          </div>

          {/* Middle panel */}
          <div
            style={{
              width: '250px',
              padding: '5px 10px',
              fontSize: '14px',
              flexShrink: 0,
            }}
          >
            <div style={{ marginBottom: '10px', color: '#555' }}>(Chọn 1 đáp án)</div>
            <div style={{ fontSize: '13px', color: '#333', marginBottom: '4px' }}>
              Câu {currentIndex + 1} / {total}
            </div>
            <div style={{ fontSize: '12px', color: '#777' }}>
              Đã trả lời: {answeredCount} / {total}
            </div>
          </div>

          {/* Right panel – question content */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderLeft: '4px solid #dc3545',
              padding: '15px',
              fontSize: '14px',
              lineHeight: '1.6',
              overflowY: 'auto',
            }}
          >
            <p style={{ marginBottom: '16px', fontWeight: 500 }}>{currentQ.question}</p>
            {LETTERS.map((opt, idx) => (
              <p key={opt} style={{ marginBottom: '8px' }}>
                {currentQ.options[idx] ?? `${opt}.`}
              </p>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            height: '70px',
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            flexShrink: 0,
          }}
        >
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'blue',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                marginBottom: '5px',
              }}
            >
              <input
                type="checkbox"
                checked={wantToFinish}
                onChange={e => setWantToFinish(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              I want to finish the exam.
            </label>
            <button
              onClick={handleSubmit}
              disabled={!wantToFinish}
              title={!wantToFinish ? 'Hãy tick vào ô xác nhận trước khi nộp bài' : ''}
              style={{
                backgroundColor: wantToFinish ? '#ffeb3b' : '#e0e0e0',
                border: '1px solid #ccc',
                padding: '5px 25px',
                fontWeight: 'bold',
                cursor: wantToFinish ? 'pointer' : 'not-allowed',
                fontSize: '14px',
                color: wantToFinish ? '#333' : '#999',
              }}
            >
              Submit
            </button>
          </div>
          <button
            onClick={() => navigate('/quiz')}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              padding: '5px 20px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
