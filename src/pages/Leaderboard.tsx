export default function Leaderboard() {
  return (
    <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-headline uppercase tracking-[0.2em] text-xs mb-4 block">Xếp hạng Phân tích</span>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter leading-none text-on-surface mb-6">Thăng tiến <span className="text-surface-tint">tập thể</span></h1>
            <p className="text-on-surface-variant text-lg leading-relaxed font-light">Đo lường tiến trình biện chứng của các cá nhân trong hệ thống. Xếp hạng không phải là sự phân cấp quyền lực, mà là thước đo sự giải phóng khỏi sự tha hóa công nghiệp.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container p-6 border-l-2 border-primary">
              <div className="text-surface-tint text-sm uppercase tracking-widest mb-1">Tổng số người giải phóng</div>
              <div className="text-3xl font-headline font-bold">12,842</div>
            </div>
            <div className="bg-surface-container p-6 border-l-2 border-secondary">
              <div className="text-secondary text-sm uppercase tracking-widest mb-1">Độ ổn định hệ thống</div>
              <div className="text-3xl font-headline font-bold text-error">42.8%</div>
            </div>
          </div>
        </div>
      </header>

      {/* Leaderboard Controls */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="bg-surface-container-low p-1 flex w-full md:w-auto">
          <button className="px-8 py-3 bg-primary-container text-on-primary-container font-headline font-medium text-sm transition-all">Tự do nhất</button>
          <button className="px-8 py-3 text-on-surface-variant hover:text-on-surface font-headline font-medium text-sm transition-all">Giàu nhất</button>
          <button className="px-8 py-3 text-on-surface-variant hover:text-on-surface font-headline font-medium text-sm transition-all">Cân bằng nhất</button>
        </div>
        <div className="relative w-full md:w-80 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-high border-none py-3 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-primary placeholder:text-outline-variant" placeholder="Lọc đối tượng..." type="text" />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-hidden bg-surface-container-lowest">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container text-outline uppercase text-[10px] tracking-[0.3em] font-bold">
                <th className="px-8 py-4">Hạng</th>
                <th className="px-8 py-4">Đối tượng</th>
                <th className="px-8 py-4">Trạng thái triết học</th>
                <th className="px-8 py-4">Điểm tiến hóa</th>
                <th className="px-8 py-4">% Nhân tính</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Top 1 */}
              <tr className="group hover:bg-surface-container-low transition-colors">
                <td className="px-8 py-8">
                  <div className="text-3xl font-headline font-bold text-tertiary">01</div>
                </td>
                <td className="px-8 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
                      <img alt="close-up portrait of a thoughtful man with a clean minimalist aesthetic and soft cinematic lighting" className="absolute inset-0 w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6ALPL1Y3dkwrt9OgicBOSw9mAzC5ls09zIEgb37LbMHZ7lB5iUtfjQDZNRlPXe7gI0PNo2i6z84dffrX32Oz_JPbBkfyzc0bKleOzMLwqxqCaexqXJNBV7ITBMAk56wmTqPd73xhDnCCN3uqdJLiEfyZlu7M_rsGL7r9lCExR80_qyHNJ3eIDyR0_DCwPsBzcPxVLEzIQd-Bw1hiuoM7ISv1Miw_KSoZsTriU7mVsOI1QBybMzm2dKo4xy4hV8n04hBA-IkftSub3" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-headline font-bold text-lg text-on-surface">Subject_Aurelius</div>
                      <div className="text-xs text-outline font-mono">ID: LIB-1848-X</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <span className="bg-secondary/10 text-secondary px-3 py-1 text-xs uppercase tracking-widest font-bold">Hậu vật chất</span>
                </td>
                <td className="px-8 py-8">
                  <div className="text-2xl font-headline font-medium text-on-surface">9,842.00</div>
                </td>
                <td className="px-8 py-8 min-w-[200px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-secondary">98%</span>
                  </div>
                </td>
              </tr>

              {/* Top 2 */}
              <tr className="group hover:bg-surface-container-low transition-colors">
                <td className="px-8 py-8">
                  <div className="text-3xl font-headline font-bold text-outline">02</div>
                </td>
                <td className="px-8 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
                      <img alt="professional portrait of a confident woman with neutral background and sharp high-end editorial lighting" className="absolute inset-0 w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKQE2oSnCLV8uOczpiZPS6bKsvGtOGI0Tsnu-WwYJ2XLuhkBb4VZ0GSfd2xSxYxFThXM25qP5hDlRNGwNoxmI7cc29xjcz1SRIg-pKNTNPoX3wunMXxqJTDi6IE1EJZiEyiUEuPEZyFckDSZoBo0Dn_qXxHN0BsvuedwelzLlDqPq3kZB8dnWEFpGp1jNmCojqh0QvuYzXbWiXpEHTafefCdoAD2vXVHVqHQgmB8d1MyCcB1hk-uyUlz-5OF3imeFAEZxdS9Yr5qfG" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-headline font-bold text-lg text-on-surface">E_Luxemburg_99</div>
                      <div className="text-xs text-outline font-mono">ID: LIB-1919-A</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <span className="bg-primary/10 text-primary px-3 py-1 text-xs uppercase tracking-widest font-bold">Bậc thầy biện chứng</span>
                </td>
                <td className="px-8 py-8">
                  <div className="text-2xl font-headline font-medium text-on-surface">9,215.40</div>
                </td>
                <td className="px-8 py-8 min-w-[200px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-primary">85%</span>
                  </div>
                </td>
              </tr>

              {/* Top 3 */}
              <tr className="group hover:bg-surface-container-low transition-colors">
                <td className="px-8 py-8">
                  <div className="text-3xl font-headline font-bold text-outline">03</div>
                </td>
                <td className="px-8 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
                      <img alt="moody portrait of a man in dark clothing with soft side lighting and cinematic atmosphere" className="absolute inset-0 w-full h-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBevH1oObNtF4pkSy6XwBkSZwrRjyAx1_z7KxszvIqjdwWJnRG5AF2pizRiJ-_oWNPyM1qKNdg8njVEjw4wB24X19DpL2IFJif-UXBymNJg2b1WPtbT5sDfB17okX-6Zq2Kyr9JDtPGm63ghsaZZywsOG8EAeTMQ6V5JRrSq2XS4WM5d2uP11GIWK_5_GG9X6UaAVy2LSLSbyFlbnIIGq1dhu4cBHxSGzufg-Nk3XYAKwYK5Il3bNZr3M0wAgyuXZVQRxeVC3MQNQtb" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-headline font-bold text-lg text-on-surface">Gramsci_Ghost</div>
                      <div className="text-xs text-outline font-mono">ID: LIB-1937-G</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <span className="bg-tertiary/10 text-tertiary px-3 py-1 text-xs uppercase tracking-widest font-bold">Trí thức hữu cơ</span>
                </td>
                <td className="px-8 py-8">
                  <div className="text-2xl font-headline font-medium text-on-surface">8,990.12</div>
                </td>
                <td className="px-8 py-8 min-w-[200px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-tertiary">72%</span>
                  </div>
                </td>
              </tr>

              {/* Top 4 */}
              <tr className="group hover:bg-surface-container-low transition-colors">
                <td className="px-8 py-8">
                  <div className="text-3xl font-headline font-bold text-outline/30">04</div>
                </td>
                <td className="px-8 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
                      <div className="material-symbols-outlined text-outline">person</div>
                    </div>
                    <div>
                      <div className="font-headline font-bold text-lg text-on-surface">Subject_662</div>
                      <div className="text-xs text-outline font-mono">ID: ALN-2024-Z</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <span className="bg-outline/10 text-outline px-3 py-1 text-xs uppercase tracking-widest font-bold">Đang thức tỉnh</span>
                </td>
                <td className="px-8 py-8">
                  <div className="text-2xl font-headline font-medium text-on-surface">4,502.88</div>
                </td>
                <td className="px-8 py-8 min-w-[200px]">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-error rounded-full" style={{ width: '22%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-error">22%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Asymmetric Bento Elements */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-surface-container p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-headline font-bold mb-6 tracking-tight">Chân trời triết học của bạn</h3>
            <p className="text-on-surface-variant max-w-md mb-8">Bạn hiện đang nằm trong top 12% những đối tượng được giải phóng. Cam kết lý thuyết của bạn cao, nhưng thực tiễn vật chất cần đầu tư thêm.</p>
            <button className="bg-secondary text-on-secondary px-8 py-4 font-headline font-bold uppercase tracking-widest text-xs active:scale-95 transition-all">Đào sâu thực tiễn</button>
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-tl from-secondary to-transparent"></div>
          </div>
        </div>
        <div className="bg-surface-container-high p-8 flex flex-col justify-between">
          <span className="material-symbols-outlined text-4xl text-tertiary">psychology</span>
          <div>
            <h4 className="text-xl font-headline font-bold mb-2">Độ lệch lý thuyết</h4>
            <p className="text-sm text-outline leading-relaxed">Giám sát hệ thống cho thấy điểm nhân tính của bạn tăng 4% trong tuần này. Hãy tiếp tục đặt câu hỏi về cấu trúc.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
