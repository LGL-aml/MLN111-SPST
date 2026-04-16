import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: { A: string; B: string; C: string; D: string };
  correct: 'A' | 'B' | 'C' | 'D';
}

const EXAM_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Từ thế kỷ VIII trước công nguyên với nhà nước đầu tiên trong lịch sử, giai cấp tư hữu đã dùng pháp luật và bộ máy thống trị của mình để chiếm đoạt quyền lực của đông đảo quần chúng nhân dân lao động là những .....',
    options: { A: 'nông dân.', B: 'người tự do.', C: 'người nô lệ.', D: 'nông nô.' },
    correct: 'C',
  },
  {
    id: 2,
    text: 'C. Mác khẳng định: "Bản chất con người là tổng hòa những ..." gì?',
    options: {
      A: 'quan hệ xã hội.',
      B: 'quan hệ kinh tế.',
      C: 'quan hệ giai cấp.',
      D: 'quan hệ sản xuất.',
    },
    correct: 'A',
  },
  {
    id: 3,
    text: 'Trong triết học Mác-Lênin, yếu tố nào giữ vai trò quyết định trong sự thống nhất bản chất con người?',
    options: {
      A: 'Yếu tố sinh học.',
      B: 'Yếu tố xã hội.',
      C: 'Yếu tố văn hóa.',
      D: 'Yếu tố di truyền.',
    },
    correct: 'B',
  },
  {
    id: 4,
    text: 'Theo triết học Mác-Lênin, con người vừa là sản phẩm của lịch sử, vừa là:',
    options: {
      A: 'nạn nhân của các điều kiện xã hội.',
      B: 'người quan sát trung lập của lịch sử.',
      C: 'công cụ của các quy luật tự nhiên.',
      D: 'chủ thể sáng tạo ra lịch sử thông qua hoạt động thực tiễn.',
    },
    correct: 'D',
  },
  {
    id: 5,
    text: '"Tha hóa" (Entfremdung) theo Mác là hiện tượng gì?',
    options: {
      A: 'Con người đạt được sự giải phóng hoàn toàn về tinh thần.',
      B: 'Con người mất dần ý thức và quyền làm chủ bản thân trong lao động và đời sống xã hội.',
      C: 'Con người hòa nhập hoàn toàn với cộng đồng xã hội.',
      D: 'Con người phát triển toàn diện về thể chất và trí tuệ.',
    },
    correct: 'B',
  },
  {
    id: 6,
    text: 'Đặc điểm nào sau đây KHÔNG phải là đặc điểm của tha hóa theo Mác?',
    options: {
      A: 'Tính tự do.',
      B: 'Tính khách quan.',
      C: 'Tính lịch sử.',
      D: 'Tính đối lập.',
    },
    correct: 'A',
  },
  {
    id: 7,
    text: 'Nguyên nhân sâu xa của hiện tượng tha hóa theo triết học Mác là:',
    options: {
      A: 'Sự phát triển của công nghệ hiện đại.',
      B: 'Thiếu giáo dục và văn hóa trong xã hội.',
      C: 'Chế độ tư hữu về tư liệu sản xuất.',
      D: 'Sự lười biếng và thiếu ý chí của người lao động.',
    },
    correct: 'C',
  },
  {
    id: 8,
    text: 'Trong biểu hiện tha hóa về hoạt động lao động, lao động mang tính chất gì?',
    options: {
      A: 'Tự nguyện, sáng tạo và mang lại niềm vui.',
      B: 'Cưỡng bức, thụ động để bảo đảm sinh tồn.',
      C: 'Tự do và không bị ràng buộc.',
      D: 'Mang tính cộng đồng và chia sẻ.',
    },
    correct: 'B',
  },
  {
    id: 9,
    text: 'Theo Mác, trong xã hội tư bản, sản phẩm do người lao động tạo ra trở thành:',
    options: {
      A: 'lực lượng đối lập, thống trị người tạo ra nó.',
      B: 'tài sản chung của toàn xã hội.',
      C: 'phần thưởng xứng đáng cho người lao động.',
      D: 'biểu hiện của tự do sáng tạo.',
    },
    correct: 'A',
  },
  {
    id: 10,
    text: 'Mâu thuẫn nào là nguồn gốc chính của tha hóa theo triết học Mác?',
    options: {
      A: 'Mâu thuẫn giữa giai cấp nông dân và địa chủ.',
      B: 'Mâu thuẫn giữa tôn giáo và khoa học.',
      C: 'Mâu thuẫn giữa thành thị và nông thôn.',
      D: 'Mâu thuẫn giữa tính chất xã hội của sản xuất và sự chiếm hữu tư nhân.',
    },
    correct: 'D',
  },
  {
    id: 11,
    text: 'Trong biểu hiện tha hóa về bản chất con người, quan hệ giữa người với người bị "hoán đổi" thành quan hệ nào?',
    options: {
      A: 'Quan hệ hợp tác bình đẳng và tương trợ.',
      B: 'Quan hệ giữa người và vật (tiền lương, hàng hóa).',
      C: 'Quan hệ văn hóa và tinh thần.',
      D: 'Quan hệ cộng đồng và đoàn kết.',
    },
    correct: 'B',
  },
  {
    id: 12,
    text: 'Theo Mác, giải phóng con người là quá trình chuyển từ đâu sang đâu?',
    options: {
      A: 'Từ "vương quốc tự do" sang "vương quốc tất yếu".',
      B: 'Từ "xã hội nguyên thủy" sang "xã hội hiện đại".',
      C: 'Từ "vương quốc tất yếu" sang "vương quốc tự do".',
      D: 'Từ "xã hội nông nghiệp" sang "xã hội công nghiệp".',
    },
    correct: 'C',
  },
  {
    id: 13,
    text: 'Nền tảng kinh tế của giải phóng con người theo triết học Mác là:',
    options: {
      A: 'Phát triển mạnh mẽ khoa học và công nghệ.',
      B: 'Cải thiện điều kiện lao động cho công nhân.',
      C: 'Tăng cường sản xuất hàng hóa và thương mại.',
      D: 'Xóa bỏ chế độ tư hữu tư bản chủ nghĩa, thiết lập chế độ công hữu.',
    },
    correct: 'D',
  },
  {
    id: 14,
    text: 'Giải phóng chính trị theo Mác-Lênin là:',
    options: {
      A: 'Thiết lập nền dân chủ xã hội chủ nghĩa, quyền lực thuộc về nhân dân.',
      B: 'Tăng cường quyền lực của nhà nước để bảo vệ trật tự xã hội.',
      C: 'Xóa bỏ hoàn toàn mọi hình thức nhà nước.',
      D: 'Thành lập chính phủ đa đảng theo mô hình phương Tây.',
    },
    correct: 'A',
  },
  {
    id: 15,
    text: 'Giai cấp nào được Mác-Lênin xem là lực lượng kiên quyết và triệt để nhất có sứ mệnh giải phóng nhân loại?',
    options: {
      A: 'Giai cấp nông dân.',
      B: 'Tầng lớp trí thức.',
      C: 'Giai cấp tư sản tiến bộ.',
      D: 'Giai cấp công nhân.',
    },
    correct: 'D',
  },
  {
    id: 16,
    text: 'Đảng Cộng sản trong triết học Mác-Lênin được xác định là:',
    options: {
      A: 'Tổ chức đại diện cho lợi ích của giai cấp tư sản.',
      B: 'Đội tham mưu trang bị lý luận khoa học cho giai cấp công nhân.',
      C: 'Cơ quan trung gian hòa giải các xung đột giai cấp.',
      D: 'Tổ chức quản lý kinh tế nhà nước.',
    },
    correct: 'B',
  },
  {
    id: 17,
    text: 'Theo Mác, mối quan hệ giữa "lao động tha hóa" và "tư hữu" là:',
    options: {
      A: 'Quan hệ một chiều: tư hữu sinh ra lao động tha hóa.',
      B: 'Không có mối quan hệ với nhau.',
      C: 'Quan hệ biện chứng: lao động tha hóa tạo ra tư hữu và tư hữu lại làm sâu sắc thêm tha hóa.',
      D: 'Quan hệ một chiều: lao động tha hóa sinh ra tư hữu, tư hữu không tác động ngược lại.',
    },
    correct: 'C',
  },
  {
    id: 18,
    text: 'Trong xã hội hiện đại, hiện tượng nào sau đây được xem là biểu hiện của tha hóa theo triết học Mác?',
    options: {
      A: 'Sự gia tăng thu nhập và mức sống của người lao động.',
      B: 'Sự phát triển mạnh mẽ của các mô hình hợp tác xã.',
      C: 'Hiện tượng "burnout" ở nhân viên văn phòng và tăng ca quá mức ở công nhân.',
      D: 'Sự mở rộng quyền của người lao động trong doanh nghiệp.',
    },
    correct: 'C',
  },
  {
    id: 19,
    text: 'Mục tiêu toàn diện của giải phóng con người theo Mác là:',
    options: {
      A: '"Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người."',
      B: 'Đảm bảo mức sống vật chất tối thiểu cho tất cả mọi người.',
      C: 'Xây dựng xã hội không có bất kỳ hình thức phân công lao động nào.',
      D: 'Phát triển kinh tế thị trường tự do và cạnh tranh lành mạnh.',
    },
    correct: 'A',
  },
  {
    id: 20,
    text: 'Giải phóng xã hội theo Mác-Lênin là:',
    options: {
      A: 'Tăng cường sản xuất và tiêu dùng hàng hóa.',
      B: 'Phát triển hệ thống phúc lợi xã hội của nhà nước tư bản.',
      C: 'Xóa bỏ mọi phân biệt đối xử, xây dựng quan hệ bình đẳng, tương trợ giữa người với người.',
      D: 'Thiết lập trật tự xã hội nghiêm ngặt theo quy luật tự nhiên.',
    },
    correct: 'C',
  },
];

const EXAM_DURATION = 15 * 60; // 15 minutes in seconds
const TOTAL = EXAM_QUESTIONS.length;

export default function Exam() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [wantToFinish, setWantToFinish] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const currentQ = EXAM_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPct = (answeredCount / TOTAL) * 100;

  const handleSelect = (opt: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleSubmit = () => {
    if (!wantToFinish) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitted(true);
  };

  /* ─── Results screen ─── */
  if (submitted) {
    const correctCount = EXAM_QUESTIONS.filter(q => answers[q.id] === q.correct).length;
    const score = parseFloat(((correctCount / TOTAL) * 10).toFixed(1));
    const passed = score >= 5;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#f0f0f0',
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
              { value: `${correctCount}/${TOTAL}`, label: 'Câu đúng', color: '#28a745' },
              { value: `${TOTAL - correctCount}/${TOTAL}`, label: 'Câu sai', color: '#dc3545' },
              { value: `${TOTAL - answeredCount}`, label: 'Bỏ qua', color: '#999' },
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
                {EXAM_QUESTIONS.map((q, i) => {
                  const userAns = answers[q.id];
                  const isCorrect = userAns === q.correct;
                  const rowBg = !userAns ? '#fffbe6' : isCorrect ? '#f0fff0' : '#fff0f0';
                  return (
                    <tr key={q.id} style={{ backgroundColor: rowBg }}>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px', textAlign: 'center' }}>{i + 1}</td>
                      <td style={{ border: '1px solid #ddd', padding: '7px 10px', lineHeight: '1.45' }}>
                        {q.text.length > 90 ? q.text.slice(0, 90) + '…' : q.text}
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
                        {q.correct}
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
              {(['A', 'B', 'C', 'D'] as const).map(opt => (
                <label
                  key={opt}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}
                >
                  <input
                    type="checkbox"
                    checked={answers[currentQ.id] === opt}
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
                onClick={() => setCurrentIndex(i => Math.min(TOTAL - 1, i + 1))}
                disabled={currentIndex === TOTAL - 1}
                style={{
                  padding: '3px 8px',
                  border: '1px solid #999',
                  backgroundColor: '#fff',
                  cursor: currentIndex === TOTAL - 1 ? 'default' : 'pointer',
                  fontSize: '12px',
                  opacity: currentIndex === TOTAL - 1 ? 0.45 : 1,
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
              Câu {currentIndex + 1} / {TOTAL}
            </div>
            <div style={{ fontSize: '12px', color: '#777' }}>
              Đã trả lời: {answeredCount} / {TOTAL}
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
            <p style={{ marginBottom: '16px', fontWeight: 500 }}>{currentQ.text}</p>
            {(['A', 'B', 'C', 'D'] as const).map(opt => (
              <p key={opt} style={{ marginBottom: '8px' }}>
                {opt}. {currentQ.options[opt]}
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
