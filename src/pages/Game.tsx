export default function Game() {
  return (
    <div className="flex-grow flex flex-col pt-20">
      {/* Game Status Bar */}
      <div className="px-8 py-6 w-full max-w-4xl mx-auto grid grid-cols-3 gap-6">
        {/* Humanity Meter */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-headline uppercase tracking-widest text-secondary">Nhân tính</span>
            <span className="text-secondary text-lg font-bold">78%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Money Meter */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-headline uppercase tracking-widest text-tertiary">Tiền</span>
            <span className="text-tertiary text-lg font-bold">$2,450</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-tertiary rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Alienation Meter */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-headline uppercase tracking-widest text-error">Tha hóa</span>
            <span className="text-error text-lg font-bold">32%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest overflow-hidden">
            <div className="h-full bg-error" style={{ width: '32%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Game Canvas */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="max-w-3xl w-full flex flex-col items-center gap-12">
          {/* Narrative Image */}
          <div className="relative w-full aspect-[21/9] overflow-hidden glitch-edge shadow-2xl">
            <img
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              alt="cinematic shot of a dimly lit academic library with floating dust motes and neon blue holographic text hovering over old books"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoBn0GgKUz_7nNwDIB-jhAZHtT22_xWOOzK_7XlTJ5dc1iV1pXQAuHo4Kc3gLJoCBBQ85Z7o9yGxf1JP0K9xPC1fyAjz7cfS43SxOqsSTUGi7AcZng26w0670Es1HRXTmyBpkyb5VF5sIao4kYncYy10Ccdfz79gqqzb6OGsmmFl-dZ3sTscJA_h8HcJ48slRzOlto0Q69dsQerk7DYT-I71wL_sUY4YVCFl9KqrKRdTrdKCyKO4CmBwuLrx02HAAZl-a74kaVg0oS"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-6">
              <span className="text-[10px] font-mono text-primary/60 tracking-[0.3em] uppercase">Giai đoạn 01: Thể chế</span>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="space-y-6 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter text-on-surface leading-tight text-glow">Hội thảo của những bóng ma</h1>
            <p className="text-lg md:text-xl text-on-surface-variant font-light leading-relaxed max-w-2xl mx-auto italic">
              "Giọng nói của vị giáo sư vang lên đều đều như một động cơ sắp hỏng. Xung quanh bạn, sinh viên đang chép dữ liệu vào các bảng tính kỹ thuật số, khuôn mặt họ được chiếu sáng bởi ánh xanh lạnh lẽo của sự hiệu quả. Bạn nhận ra rằng chương trình giảng dạy không dạy về sự giải phóng — nó đang dạy về sự tối ưu hóa."
            </p>
            <div className="pt-4 border-t border-outline-variant/20 max-w-xs mx-auto"></div>
            <p className="text-md text-primary font-medium tracking-wide">Bạn chọn cách nào để đối mặt với sự im lặng mang tính hệ thống này?</p>
          </div>

          {/* Choice Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <button className="group relative p-6 bg-surface-container-high hover:bg-primary-container transition-all duration-300 text-left overflow-hidden ring-1 ring-outline-variant/20 hover:ring-primary">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary group-hover:text-white">auto_stories</span>
                <div>
                  <div className="font-headline font-bold text-lg group-hover:text-white">Phá vỡ giáo trình</div>
                  <p className="text-sm text-on-surface-variant group-hover:text-on-primary-container">Cài cắm các văn bản cấp tiến vào ổ đĩa chung. Chấp nhận rủi ro bị tha hóa để đổi lấy sự sáng tỏ của tập thể.</p>
                </div>
              </div>
            </button>

            <button className="group relative p-6 bg-surface-container-high hover:bg-secondary-container transition-all duration-300 text-left overflow-hidden ring-1 ring-outline-variant/20 hover:ring-secondary">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary group-hover:text-white">paid</span>
                <div>
                  <div className="font-headline font-bold text-lg group-hover:text-white">Tối ưu hiệu suất</div>
                  <p className="text-sm text-on-surface-variant group-hover:text-on-secondary-container">Làm chủ các chỉ số của bộ máy. Tích lũy tiền bạc và tầm ảnh hưởng để thay đổi mọi thứ sau này.</p>
                </div>
              </div>
            </button>

            <button className="md:col-span-2 group relative p-6 bg-surface-container-lowest hover:bg-error-container/20 transition-all duration-300 text-center overflow-hidden ring-1 ring-error/30 hover:ring-error">
              <div className="flex flex-col items-center gap-2">
                <div className="font-headline font-bold text-lg text-error group-hover:text-white">Rời đi trong im lặng</div>
                <p className="text-xs text-on-surface-variant/60 uppercase tracking-widest">Từ bỏ hoàn toàn thể chế này. Tự bắt đầu phòng thí nghiệm của riêng bạn.</p>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Subtle Glitch Overlays (Decorative) */}
      <div className="fixed inset-0 pointer-events-none border-[12px] border-surface-container-lowest opacity-20 mix-blend-overlay z-0"></div>
      <div className="fixed top-0 left-0 w-1 h-full bg-primary/5 z-0"></div>
      <div className="fixed top-0 right-0 w-1 h-full bg-error/5 z-0"></div>
    </div>
  );
}
