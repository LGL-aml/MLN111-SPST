import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, MonitorPlay, Users, LogIn, ScrollText, X, Trophy, Lightbulb, PlusCircle } from 'lucide-react';

export default function Game() {
  const [showRules, setShowRules] = useState(false);

  // Animation variants for staggering items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring', bounce: 0.3 } }
  };

  const itemFadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, type: 'spring', bounce: 0.2 } }
  };

  const itemFadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, type: 'spring', bounce: 0.2 } }
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-start pt-24 pb-12 relative font-sans overflow-hidden">
      
      {/* Top controls (Law button) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-5xl mx-auto px-4 flex justify-end mb-8 relative z-10"
      >
        <button 
            onClick={() => setShowRules(true)} 
            className="flex items-center gap-2 bg-surface border border-outline-variant text-on-surface-variant px-5 py-2.5 rounded-full hover:border-primary hover:text-primary transition-all font-bold shadow-sm hover:shadow-md active:scale-95"
        >
            <BookOpen className="w-5 h-5" />
            Luật Chơi
        </button>
      </motion.div>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full px-4 flex-grow flex flex-col justify-center pb-12"
      >
        <motion.div variants={itemFadeUp} className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-5 tracking-tight">
              Hành Trình <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
                  className="text-primary italic inline-block"
              >
                Giải Phóng
              </motion.span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Mô phỏng xã hội hiện đại. Trải nghiệm sự tha hóa và tìm kiếm con đường tự do của chính bạn.
            </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
            
            <motion.div 
                variants={itemFadeLeft}
                className="group bg-surface rounded-3xl p-8 lg:p-10 shadow-sm border border-outline-variant w-full md:w-1/2 flex flex-col items-center text-center hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-lg"
            >
                <div className="bg-primary/10 p-5 rounded-full mb-6 text-primary group-hover:scale-110 transition-transform">
                    <MonitorPlay className="w-10 h-10" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-on-surface">Bạn là Quản Trò?</h2>
                <p className="text-on-surface-variant mb-8 text-base leading-relaxed">Tạo phòng chơi mới, hiển thị câu hỏi và điều khiển nhịp độ trò chơi trên màn hình lớn.</p>
                <div className="mt-auto w-full">
                  <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-3 shadow-lg shadow-primary/20 active:scale-95">
                      <PlusCircle className="w-6 h-6" />
                      Tạo Phòng Mới
                  </button>
                </div>
            </motion.div>

            <motion.div 
                variants={itemFadeRight}
                className="group bg-surface rounded-3xl p-8 lg:p-10 shadow-sm border border-outline-variant w-full md:w-1/2 flex flex-col items-center text-center hover:border-amber-500/50 transition-all hover:-translate-y-2 hover:shadow-lg"
            >
                <div className="bg-amber-500/10 p-5 rounded-full mb-6 text-amber-500 group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-on-surface">Bạn là Người Chơi?</h2>
                <p className="text-on-surface-variant mb-8 text-base leading-relaxed">Nhập mã phòng từ màn hình của quản trò để tham gia vào hành trình giải phóng.</p>
                
                <div className="w-full flex flex-col gap-4 mt-auto">
                    <input 
                      type="text" 
                      placeholder="Nhập mã phòng" 
                      className="w-full bg-surface-variant/30 border border-outline-variant text-on-surface py-4 px-6 rounded-xl font-bold text-center text-xl tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-base placeholder:tracking-normal placeholder:font-normal placeholder:normal-case placeholder:text-outline" 
                    />
                    <input 
                      type="text" 
                      placeholder="Nhập tên của bạn" 
                      className="w-full bg-surface-variant/30 border border-outline-variant text-on-surface py-4 px-6 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-center text-lg placeholder:text-outline" 
                    />
                    <button className="w-full bg-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors flex justify-center items-center gap-3 shadow-lg shadow-amber-500/20 active:scale-95">
                        <LogIn className="w-6 h-6" />
                        Tham Gia Ngay
                    </button>
                </div>
            </motion.div>

        </div>
      </motion.main>

      {/* Rules Modal Popup */}
      <AnimatePresence>
        {showRules && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              className="bg-surface rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-outline-variant"
            >
              
              <div className="bg-surface border-b border-outline-variant p-5 md:p-6 text-on-surface flex justify-between items-center relative shrink-0">
                  <h2 className="text-xl md:text-2xl font-headline font-bold flex items-center gap-3 uppercase tracking-tight text-primary">
                      <ScrollText className="w-6 h-6 md:w-7 md:h-7" /> Luật Chơi: Hành Trình Giải Phóng
                  </h2>
                  <button onClick={() => setShowRules(false)} className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-2 rounded-full transition-colors">
                      <X className="w-6 h-6" />
                  </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-on-surface-variant custom-scrollbar">
                  
                  <div className="bg-primary/5 border-l-4 border-primary p-5 rounded-r-xl">
                      <p className="text-on-surface leading-relaxed italic text-lg font-medium">
                          "Chào mừng bạn đến với mô phỏng xã hội hiện đại. Ở đây, bạn không chỉ phải đấu tranh để sinh tồn mà còn phải giữ lấy bản chất con người của mình trước guồng quay khắc nghiệt của nền sản xuất."
                      </p>
                  </div>

                  <section>
                      <h3 className="font-bold text-xl md:text-2xl text-on-surface flex items-center gap-3 mb-6">
                          <span className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0">1</span>
                          Ba Chỉ Số Quyết Định Số Phận
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-surface p-6 rounded-2xl border border-amber-500/30 shadow-sm relative overflow-hidden group hover:border-amber-500 transition-colors flex flex-col">
                              <div className="absolute top-0 right-0 p-3 bg-amber-500/10 text-xl rounded-bl-2xl">💰</div>
                              <h4 className="font-bold text-on-surface text-lg mb-3">Tiền (Sinh tồn)</h4>
                              <p className="text-base text-on-surface-variant mb-4 leading-relaxed">Đại diện cho vật chất để duy trì sự sống cơ bản.</p>
                              <div className="p-2 bg-red-500/10 text-red-500 dark:text-red-400 text-sm font-bold rounded-lg border border-red-500/20 uppercase text-center mt-auto">
                                  Cảnh báo: Tiền = 0 → Game Over
                              </div>
                          </div>

                          <div className="bg-surface p-6 rounded-2xl border border-red-500/30 shadow-sm relative overflow-hidden group hover:border-red-500 transition-colors flex flex-col">
                              <div className="absolute top-0 right-0 p-3 bg-red-500/10 text-xl rounded-bl-2xl">⚙️</div>
                              <h4 className="font-bold text-on-surface text-lg mb-3">Tha hóa</h4>
                              <p className="text-base text-on-surface-variant mb-4 leading-relaxed">Mức độ bị biến thành "công cụ" lao động, lệ thuộc vật chất.</p>
                              <div className="p-2 bg-red-500/10 text-red-500 dark:text-red-400 text-sm font-bold rounded-lg border border-red-500/20 uppercase text-center mt-auto">
                                  Cảnh báo: Tha hóa = 100 → Game Over
                              </div>
                          </div>

                          <div className="bg-surface p-6 rounded-2xl border border-blue-500/30 shadow-sm relative overflow-hidden group hover:border-blue-500 transition-colors flex flex-col">
                              <div className="absolute top-0 right-0 p-3 bg-blue-500/10 text-xl rounded-bl-2xl">🕊️</div>
                              <h4 className="font-bold text-on-surface text-lg mb-3">Tự do</h4>
                              <p className="text-base text-on-surface-variant leading-relaxed">Khả năng làm chủ bản thân, làm chủ sức lao động và khôi phục sự kết nối xã hội.</p>
                          </div>
                      </div>
                  </section>

                  <section>
                      <h3 className="font-bold text-xl md:text-2xl text-on-surface flex items-center gap-3 mb-4">
                          <span className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0">2</span>
                          Điều Kiện Sống Sót
                      </h3>
                      <p className="mb-5 text-on-surface-variant text-lg leading-relaxed">Trò chơi sẽ đưa ra <strong className="text-on-surface">5 tình huống</strong> mang tính bước ngoặt. Bạn chỉ thực sự vượt qua trò chơi khi tham gia đến cuối và đạt trạng thái tối thiểu:</p>
                      <div className="flex flex-wrap gap-4">
                          <span className="bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-5 py-2.5 rounded-full font-bold shadow-sm">🕊️ Tự do {'>'} 70</span>
                          <span className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-5 py-2.5 rounded-full font-bold shadow-sm">⚙️ Tha hóa {'<'} 30</span>
                          <span className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-5 py-2.5 rounded-full font-bold shadow-sm">💰 Tiền {'>'} 20</span>
                      </div>
                  </section>

                  <section className="bg-surface-variant/30 p-6 md:p-8 rounded-3xl border border-outline-variant">
                      <h3 className="font-bold text-xl md:text-2xl text-primary flex items-center gap-3 mb-5">
                          <Trophy className="w-7 h-7" /> Bảng Xếp Hạng & Điểm Giải Phóng
                      </h3>
                      <p className="text-base mb-6 text-on-surface-variant leading-relaxed">Điểm tổng kết để tranh hạng <strong className="text-on-surface">Top 3</strong> được tính theo công thức học thuật:</p>
                      <div className="bg-surface text-center py-6 rounded-2xl border-2 border-primary/20 font-mono text-2xl md:text-3xl font-bold text-on-surface mb-8 shadow-sm tracking-tight text-glow">
                          Điểm = (Tự do × 10) - (Tha hóa × 5) + Tiền
                      </div>
                      
                      <div className="space-y-5">
                          <div className="flex items-start gap-4">
                              <div className="bg-blue-500 text-white py-1 px-3 rounded-lg font-bold text-xs w-14 text-center mt-1 shrink-0">x10</div>
                              <p className="text-base text-on-surface-variant"><span className="font-bold text-on-surface">Tự do:</span> Đích đến cuối cùng – "vương quốc của tự do".</p>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="bg-red-500 text-white py-1 px-3 rounded-lg font-bold text-xs w-14 text-center mt-1 shrink-0">-5</div>
                              <p className="text-base text-on-surface-variant"><span className="font-bold text-on-surface">Tha hóa:</span> Trừ điểm nặng nếu bất chấp tất cả để trở thành công cụ.</p>
                          </div>
                          <div className="flex items-start gap-4">
                              <div className="bg-amber-500 text-white py-1 px-3 rounded-lg font-bold text-xs w-14 text-center mt-1 shrink-0">x1</div>
                              <p className="text-base text-on-surface-variant"><span className="font-bold text-on-surface">Tiền:</span> Điều kiện cần để sinh tồn nhưng không phải mục tiêu tối thượng.</p>
                          </div>
                      </div>
                      <p className="text-sm text-outline mt-6 italic border-t border-outline-variant pt-4">* Nếu bằng điểm nhau, người có chỉ số Tự do cao hơn sẽ được ưu tiên xếp trên.</p>
                  </section>

                  <section>
                      <h3 className="font-bold text-xl md:text-2xl text-on-surface flex items-center gap-3 mb-6">
                          <Lightbulb className="w-7 h-7 text-amber-500" /> Mẹo Tư Duy Biện Chứng
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="p-5 rounded-2xl border-l-[5px] border-primary bg-surface shadow-sm hover:translate-x-1 transition-transform border border-outline-variant">
                              <h4 className="font-bold text-lg mb-2 text-on-surface">Đừng mù quáng</h4>
                              <p className="text-base text-on-surface-variant leading-relaxed">Không phải lúc nào chọn "Tự do" ngay từ đầu cũng tốt. Bạn cần Tiền để làm vốn sinh tồn.</p>
                          </div>
                          <div className="p-5 rounded-2xl border-l-[5px] border-primary bg-surface shadow-sm hover:translate-x-1 transition-transform border border-outline-variant">
                              <h4 className="font-bold text-lg mb-2 text-on-surface">Chấp nhận đánh đổi</h4>
                              <p className="text-base text-on-surface-variant leading-relaxed">Đôi khi, phải chịu "tha hóa" để tích lũy tư bản, rồi dùng chính nó giành lại quyền tự quyết.</p>
                          </div>
                      </div>
                  </section>

              </div>

              <div className="p-6 border-t border-outline-variant bg-surface-variant/30 flex justify-end shrink-0">
                  <button onClick={() => setShowRules(false)} className="bg-primary text-on-primary px-10 py-3 md:py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
                      Đã Hiểu, Sẵn Sàng!
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
