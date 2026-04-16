import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Link as LinkIcon, Settings, AlignLeft, Scale, Globe, CheckCircle, ChevronDown } from 'lucide-react';

const SECTIONS = [
  { id: 's1', title: 'Khái niệm con người', icon: User },
  { id: 's2', title: 'Tha hóa là gì?', icon: LinkIcon },
  { id: 's3', title: 'Biểu hiện tha hóa', icon: Settings },
  { id: 's4', title: 'So sánh quan niệm', icon: Scale },
  { id: 's5', title: 'Giải phóng con người', icon: AlignLeft },
  { id: 's6', title: 'Thực tiễn hiện đại', icon: Globe },
];

const Accordion = ({ number, title, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-outline-variant rounded-xl overflow-hidden mb-3 bg-surface transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold
            ${number === 1 ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
              number === 2 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
              number === 3 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
              'bg-green-500/10 text-green-600 dark:text-green-400'}`}
          >
            {number}
          </span>
          <span className="font-semibold text-on-surface text-base">{title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-outline transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 text-base text-on-surface-variant leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Theory() {
  const [activeId, setActiveId] = useState('s1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for sticky nav
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12 pt-24 pb-8 md:pt-28 md:pb-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Sidebar TOC */}
      <aside className="w-full lg:w-[300px] flex-shrink-0 lg:sticky lg:top-24 z-10 bg-surface rounded-2xl p-5 shadow-sm border border-outline-variant">
        <h3 className="font-headline font-bold text-lg mb-4 text-on-surface px-2">Nội dung lý thuyết</h3>
        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap lg:whitespace-normal text-left transition-all text-base font-medium flex-shrink-0 ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'text-on-surface hover:bg-surface-variant'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : 'text-outline'}`} />
                <span className="truncate">{sec.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-16 space-y-16">
        
        {/* Header Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#11301c] via-[#102918] to-[#0a1a10] rounded-3xl p-8 lg:p-10 relative overflow-hidden border border-[#1e4a2a] shadow-lg"
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-green-400 bg-green-400/10 border border-green-400/25 px-3 py-1 rounded-full mb-5 hover:bg-green-400/20 transition-colors cursor-default">
            MLN111 · Lý thuyết
          </span>
          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-green-50 leading-tight mb-4">
            Tha hóa & <em className="text-green-400 not-italic">Giải phóng</em> con người
          </h1>
          <p className="text-green-200 text-base md:text-lg leading-relaxed max-w-3xl">
            Triết học Mác–Lênin về bản chất con người, hiện tượng tha hóa trong xã hội tư bản, và con đường giải phóng toàn diện.
          </p>
          <div className="flex flex-wrap gap-5 mt-8 text-xs text-green-300 font-medium">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>7 chủ đề lý thuyết</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>Ví dụ thực tiễn Việt Nam</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>Bảng so sánh & timeline</span>
          </div>
        </motion.div>

        {/* Section 1: Khái niệm con người */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }} id="s1" className="scroll-mt-28 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-on-surface">Con người trong triết học Mác–Lênin</h2>
                <p className="text-base text-outline mt-1">Vị trí trung tâm của hệ thống lý luận</p>
              </div>
            </div>
            
            <p className="text-on-surface-variant mb-4 leading-relaxed">
              Con người được xem là thực thể thống nhất giữa yếu tố sinh học và yếu tố xã hội, trong đó yếu tố xã hội giữ vai trò quyết định.
            </p>
            
            <figure className="border-l-4 border-primary pl-4 py-3 my-6 bg-primary/5 rounded-r-xl pr-4 shadow-sm">
              <blockquote className="italic text-on-surface font-medium leading-relaxed">
                "Bản chất con người là tổng hòa những quan hệ xã hội."
              </blockquote>
              <figcaption className="text-xs font-bold text-primary mt-2 uppercase tracking-wider">— C. Mác</figcaption>
            </figure>
            
            <p className="text-on-surface-variant leading-relaxed">
              Con người không tồn tại như cá thể biệt lập, mà luôn gắn với những điều kiện lịch sử–xã hội cụ thể. Đồng thời, con người vừa là sản phẩm của lịch sử, vừa là chủ thể sáng tạo ra lịch sử thông qua hoạt động thực tiễn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-blue-500/30 transition-colors">
              <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="text-blue-500">📌</span> 3 Luận điểm cốt lõi
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base text-on-surface-variant">
                  <span className="text-primary font-bold">01</span>
                  <span>Không có con người trừu tượng, phi giai cấp, phi thời đại</span>
                </li>
                <li className="flex items-start gap-3 text-base text-on-surface-variant">
                  <span className="text-primary font-bold">02</span>
                  <span>Bản chất con người không nhất thành, bất biến</span>
                </li>
                <li className="flex items-start gap-3 text-base text-on-surface-variant">
                  <span className="text-primary font-bold">03</span>
                  <span>Bản chất hình thành qua các mối quan hệ xã hội hiện thực</span>
                </li>
              </ul>
            </div>
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-amber-500/30 transition-colors">
              <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> Ý nghĩa thực tiễn
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed mt-2">
                Trong đổi mới đất nước: phát triển con người cả về mặt tự nhiên và xã hội; nâng cao đời sống vật chất và văn hóa. Không tuyệt đối hóa mặt nào.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Tha hóa là gì? */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }} id="s2" className="scroll-mt-28 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-red-500/30 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center flex-shrink-0">
                <LinkIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-on-surface">Định nghĩa tha hóa (Entfremdung)</h2>
                <p className="text-base text-outline mt-1">Khái niệm trung tâm trong học thuyết Mác</p>
              </div>
            </div>
            <p className="text-base text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Định Nghĩa:</strong> <span className="text-on-surface-variant">
                Tha hoá (Entfremdung) theo Mác–Lênin chỉ tình trạng con người mất dần ý thức và quyền làm chủ bản thân trong lao động và đời sống xã hội
                </span>
            </p>
            
            <figure className="border-l-4 border-red-500 pl-4 py-3 my-6 bg-red-500/5 rounded-r-xl pr-4 shadow-sm">
              <blockquote className="italic text-on-surface font-medium leading-relaxed">
                "Lao động bị tha hóa đảo ngược quan hệ đó… con người bị tha hóa là sự đánh mất mình trong thế giới do con người sáng tạo ra."
              </blockquote>
              <figcaption className="text-xs font-bold text-red-600 dark:text-red-400 mt-2 uppercase tracking-wider">— C. Mác, Bản thảo kinh tế–triết học 1844</figcaption>
            </figure>
            
            <p className="text-on-surface-variant leading-relaxed">
              Nói cách khác: con người lẽ ra sáng tạo và chi phối thế giới vật chất, nhưng trong xã hội tư bản, lao động và vật phẩm tự tách khỏi chủ thể, trở thành "công cụ" nô dịch ngược lại con người.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-on-surface mb-4 px-1">Bốn đặc điểm cơ bản</h3>
            <Accordion number={1} title="Tính khách quan" defaultOpen={true}>
              Không phụ thuộc vào mong muốn cá nhân, mà do các điều kiện kinh tế–xã hội quy định. Tha hóa là tất yếu trong chế độ tư hữu tư liệu sản xuất.
            </Accordion>
            <Accordion number={2} title="Tính lịch sử">
              Tha hóa không tồn tại vĩnh viễn. Nó ra đời cùng chế độ tư hữu và sẽ mất đi khi các điều kiện đó bị xóa bỏ. Đây là hiện tượng mang tính lịch sử, gắn với hình thái kinh tế–xã hội có giai cấp.
            </Accordion>
            <Accordion number={3} title="Tính đối lập">
              Sản phẩm lao động biến thành thế lực thù địch, nô dịch chính người sáng tạo ra nó. Điều con người tạo ra quay lại thống trị, kiểm soát con người.
            </Accordion>
            <Accordion number={4} title="Tính phổ biến">
              Trong xã hội tư bản, tha hóa không chỉ ảnh hưởng đến công nhân mà còn đến cả nhà tư bản, mặc dù ở các mức độ và trạng thái khác nhau.
            </Accordion>
          </div>
        </motion.section>

        {/* Section 3: Biểu hiện tha hóa */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }} id="s3" className="scroll-mt-28 space-y-6">
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-6 px-1 border-l-4 border-amber-500 pl-3">3 Biểu hiện của tha hóa</h2>
          
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[11px] font-bold px-2 py-1 bg-red-500/10 text-red-700 dark:text-red-400 rounded">Lao động cưỡng bức</span>
              <span className="text-[11px] font-bold px-2 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded">Mất sáng tạo</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="text-amber-500">⚙️</span> 1. Tha hóa trong hoạt động lao động
            </h3>
            <p className="text-base text-on-surface-variant leading-relaxed mb-4">
              Lao động trong chủ nghĩa tư bản mang tính cưỡng bức và thụ động — người lao động chỉ thực hiện chức năng bảo đảm sinh tồn, không được tự do sáng tạo.
            </p>
            <div className="bg-surface-variant/50 p-4 rounded-xl text-base italic text-on-surface border border-outline-variant/30">
              <span className="font-bold not-italic text-amber-600 dark:text-amber-400 me-2">Thực tiễn VN:</span> 
              Điều tra Viện Công nhân và Công đoàn cho thấy trên 52% lao động phải làm thêm giờ, trung bình hơn 10 ngày tăng ca/tháng.
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[11px] font-bold px-2 py-1 bg-red-500/10 text-red-700 dark:text-red-400 rounded">Mất quyền sở hữu</span>
              <span className="text-[11px] font-bold px-2 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded">Sức lao động = hàng hóa</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="text-red-500">📦</span> 2. Tha hóa trong sản phẩm lao động
            </h3>
            <p className="text-base text-on-surface-variant leading-relaxed mb-4">
              Sản phẩm do người lao động tạo ra không thuộc quyền sở hữu của họ mà là của chủ tư bản. Sản phẩm trở thành "vật chất chết" đối lập với người lao động.
            </p>
            <p className="text-base text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Ví dụ:</strong> Người công nhân lắp ráp iPhone không được hưởng thành quả từ thiết bị do mình tạo ra, trong khi đời sống họ lại rất bấp bênh như trong vụ Foxconn (Trung Quốc) hàng loạt nhân viên trẻ tự tử vì áp lực và cảm giác vô nghĩa trong sản xuất. Bên cạnh đó, người lao động nông nghiệp ở Việt Nam gia nhập HTX (hợp tác xã) chia sẻ sản phẩm để giảm thiểu tha hóa, tạo chuỗi liên kết giá trị giúp nông dân thu nhập cao hơn, giảm lãng phí.
            </p>
          </div>

          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[11px] font-bold px-2 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded">Cạnh tranh thay hợp tác</span>
              <span className="text-[11px] font-bold px-2 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded">Cô lập xã hội</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2 flex items-center gap-2">
              <span className="text-blue-500">🤝</span> 3. Tha hóa trong quan hệ xã hội
            </h3>
            <p className="text-base text-on-surface-variant leading-relaxed mb-4">
              Trong xã hội tư bản, quan hệ giữa người với người bị “hoán đổi” thành quan hệ giữa người và vật. Tiền lương và hàng hoá trung gian quan hệ xã hội, khiến con người phải cạnh tranh với nhau thay vì hợp tác. C.Mác nhấn mạnh: “Quan hệ giữa người và người đã bị thay thế bằng quan hệ giữa người và vật”
            </p>
            <p className="text-base text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Ví dụ:</strong> chịu áp lực kết quả qua KPI, chấm công trực tuyến…, tạo ra cảm giác chỉ là một mắt xích vô danh trong tổ chức. Cụ thể, hàng nghìn công nhân Việt Nam phải làm thêm giờ dài hạn, xa gia đình (chỉ quấn quần ở nhà máy và phòng trọ); họ ít giao tiếp cộng đồng, quan hệ lỏng lẻo, dẫn đến tệ nạn xã hội như đình công, đình trệ sản xuất (nhiều vụ đình công do mâu thuẫn lương bổng ở Bình Dương, Bắc Giang…).
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl overflow-hidden mt-6 shadow-sm">
            <div className="p-4 border-b border-primary/10 bg-primary/10">
              <h3 className="font-bold text-primary text-base">Bảng tổng hợp</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-base text-left">
                <thead className="bg-primary/5 border-b border-primary/20">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-on-surface w-1/4">Biểu hiện</th>
                    <th className="px-4 py-3 font-semibold text-on-surface">Cơ chế</th>
                    <th className="px-4 py-3 font-semibold text-on-surface">Hệ quả xã hội</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-4 py-3 font-semibold text-on-surface">Trong lao động</td>
                    <td className="px-4 py-3 text-on-surface-variant">Lao động cưỡng bức, máy móc hóa</td>
                    <td className="px-4 py-3 text-on-surface-variant">Chán ghét công việc, mất động lực sáng tạo</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-4 py-3 font-semibold text-on-surface">Trong sản phẩm</td>
                    <td className="px-4 py-3 text-on-surface-variant">Sản phẩm thuộc về doanh nghiệp / chủ</td>
                    <td className="px-4 py-3 text-on-surface-variant">Bị nô dịch bởi vật phẩm, khoảng cách tài sản</td>
                  </tr>
                  <tr className="hover:bg-primary/5 transition-colors">
                    <td className="px-4 py-3 font-semibold text-on-surface">Trong bản chất</td>
                    <td className="px-4 py-3 text-on-surface-variant">Tính người bị thay bằng bản năng sinh tồn</td>
                    <td className="px-4 py-3 text-on-surface-variant">Suy thoái đạo đức, đánh mất giá trị nhân văn</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Section 4: So sánh */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }} id="s4" className="scroll-mt-28 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm overflow-hidden hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">So sánh quan niệm về con người</h2>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-outline-variant/50">
              <table className="w-full text-base text-left border-collapse">
                <thead className="bg-surface-variant/30 border-b-2 border-outline-variant">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-on-surface w-1/4">Tiêu chí</th>
                    <th className="px-5 py-4 font-semibold text-outline-variant w-[37.5%]">Các nhà tư tưởng trước Mác</th>
                    <th className="px-5 py-4 font-semibold text-primary w-[37.5%]">Triết học Mác–Lênin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  <tr className="hover:bg-surface-variant/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-on-surface">Nguồn gốc</td>
                    <td className="px-5 py-4 text-on-surface-variant">Do đấng sáng tạo hoặc tự nhiên ban tặng sẵn có</td>
                    <td className="px-5 py-4 text-on-surface font-medium bg-primary/5">Sản phẩm của lịch sử và hoạt động thực tiễn</td>
                  </tr>
                  <tr className="hover:bg-surface-variant/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-on-surface">Bản chất</td>
                    <td className="px-5 py-4 text-on-surface-variant">Trừu tượng, vĩnh cửu, nằm bên trong mỗi cá nhân</td>
                    <td className="px-5 py-4 text-on-surface font-medium bg-primary/5">Tổng hòa các quan hệ xã hội hiện thực, biến đổi</td>
                  </tr>
                  <tr className="hover:bg-surface-variant/50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-on-surface">Vai trò</td>
                    <td className="px-5 py-4 text-on-surface-variant">Sản phẩm thụ động của hoàn cảnh</td>
                    <td className="px-5 py-4 text-on-surface font-medium bg-primary/5">Chủ thể sáng tạo, vừa là sản phẩm vừa là chủ nhân</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Giải phóng */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }} id="s5" className="scroll-mt-28 space-y-6">
          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <AlignLeft className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-on-surface">Giải phóng con người theo Mác–Ăngghen</h2>
                <p className="text-base text-outline mt-1">Mục đích cuối cùng của triết học Mác–Lênin</p>
              </div>
            </div>
            <p className="text-base text-on-surface-variant leading-relaxed">
              Giải phóng con người là quá trình xóa bỏ các hình thức áp bức, bóc lột, bất công và sự tha hóa để con người có thể phát triển tự do, toàn diện mọi năng lực của mình.
            </p>
            <figure className="border-l-4 border-primary pl-4 py-2 mt-4 bg-primary/5 rounded-r-xl pr-4">
              <blockquote className="italic text-on-surface font-medium leading-relaxed">
                "Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người."
              </blockquote>
            </figure>
          </div>

          <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-on-surface mb-8 border-b border-outline-variant pb-3">4 Phương diện giải phóng</h3>
            <div className="space-y-8 border-l-[3px] border-outline-variant ml-4 pl-6 relative">
              <div className="relative group">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-surface border-[3px] border-primary z-10 top-1 group-hover:scale-125 transition-transform"></div>
                <h4 className="font-bold text-primary mb-1 text-base uppercase tracking-wider">Giải phóng kinh tế</h4>
                <p className="text-base text-on-surface-variant leading-relaxed">Nền tảng: Xóa bỏ chế độ tư hữu tư bản, thiết lập chế độ công hữu. Người lao động làm chủ phương tiện sản xuất, tự do phân phối giá trị thặng dư.</p>
              </div>
              <div className="relative group">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-surface border-[3px] border-primary z-10 top-1 group-hover:scale-125 transition-transform"></div>
                <h4 className="font-bold text-primary mb-1 text-base uppercase tracking-wider">Giải phóng chính trị</h4>
                <p className="text-base text-on-surface-variant leading-relaxed">Lật đổ sự thống trị của giai cấp bóc lột, thiết lập nền chuyên chính vô sản — nền dân chủ thực sự nơi quyền lực thuộc về nhân dân.</p>
              </div>
              <div className="relative group">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-surface border-[3px] border-primary z-10 top-1 group-hover:scale-125 transition-transform"></div>
                <h4 className="font-bold text-primary mb-1 text-base uppercase tracking-wider">Giải phóng xã hội</h4>
                <p className="text-base text-on-surface-variant leading-relaxed">Xóa bỏ phân biệt đối xử về giai cấp, dân tộc, giới tính. Xây dựng quan hệ xã hội dựa trên bình đẳng, tương trợ và tôn trọng phẩm giá con người.</p>
              </div>
              <div className="relative group">
                <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 z-10 top-1 group-hover:scale-125 transition-transform"></div>
                <h4 className="font-bold text-primary mb-1 text-base uppercase tracking-wider">Đích cuối: Giải phóng toàn diện</h4>
                <p className="text-base text-on-surface-variant leading-relaxed">Phát triển con người cả về thể chất, trí tuệ, đạo đức. Đủ thời gian học tập, sáng tạo, tự do lựa chọn nghề nghiệp phát huy tối đa năng lực cá nhân.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 6: Thực tiễn */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }} id="s6" className="scroll-mt-28 space-y-6">
          <h2 className="text-3xl font-headline font-bold text-on-surface flex items-center gap-3 border-b border-outline-variant pb-3">
            <Globe className="w-6 h-6 text-primary" /> Thực tiễn hiện đại
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ y: -5 }} className="bg-surface border border-outline-variant rounded-2xl p-5 text-center shadow-sm">
              <div className="text-3xl lg:text-4xl font-black text-primary mb-2">52%</div>
              <div className="text-xs text-on-surface-variant leading-tight">lao động VN làm thêm giờ</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-surface border border-outline-variant rounded-2xl p-5 text-center shadow-sm">
              <div className="text-3xl lg:text-4xl font-black text-primary mb-2">10+</div>
              <div className="text-xs text-on-surface-variant leading-tight">ngày tăng ca trung bình/tháng</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-surface border border-outline-variant rounded-2xl p-5 text-center shadow-sm">
              <div className="text-3xl lg:text-4xl font-black text-amber-500 mb-2">76%</div>
              <div className="text-xs text-on-surface-variant leading-tight">tăng ca tự nguyện vì thu nhập</div>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-primary/10 border border-primary/20 rounded-2xl p-5 text-center shadow-sm">
              <div className="text-3xl lg:text-4xl font-black text-primary mb-2">12-16<span className="text-xl">h</span></div>
              <div className="text-xs text-on-surface-variant leading-tight">giờ làm/ngày tại một số KCN</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="text-amber-500 text-lg">🏭</span> Áp lực công nghiệp
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Công nhân tại các đô thị công nghiệp lớn phải tăng ca liên tục để trang trải cuộc sống và đảm bảo thu nhập. Sự cuốn vào dây chuyền sản xuất minh hoạ cho sự tha hóa về hoạt động lao động, mất đi thời gian dành cho bản thân và gia đình.
              </p>
            </div>
            <div className="bg-surface border border-outline-variant rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="text-red-500 text-lg">💼</span> Hội chứng Burnout
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Tỉ lệ suy kiệt tinh thần và chán nản (burnout) ngày càng lan rộng trong giới văn phòng. Cảm giác vô nghĩa trong công việc lặp đi lặp lại hay áp lực quá tải chính là biểu hiện hiện đại của sự tha hóa tinh thần trong lòng xã hội số.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mt-6">
            <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Hướng tới giải phóng trong bối cảnh mới
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-xs font-semibold px-4 py-2 bg-surface text-primary border border-primary/20 rounded-full shadow-sm">Nâng cao phúc lợi xã hội</span>
              <span className="text-xs font-semibold px-4 py-2 bg-surface text-primary border border-primary/20 rounded-full shadow-sm">Cải thiện điều kiện làm việc</span>
              <span className="text-xs font-semibold px-4 py-2 bg-surface text-blue-600 border border-blue-500/20 rounded-full shadow-sm">Mô hình kinh tế chia sẻ</span>
              <span className="text-xs font-semibold px-4 py-2 bg-surface text-amber-600 border border-amber-500/20 rounded-full shadow-sm">Chuyển đổi số nhân văn</span>
            </div>
            <p className="text-base text-on-surface-variant leading-relaxed max-w-3xl border-l-[3px] border-primary pl-4">
              Dù hình thái kinh tế hiện đại đã thay đổi với nhiều yếu tố phức tạp, các nguyên lý của Mác về chống tha hóa và giải phóng con người vẫn còn nguyên giá trị nền tảng. Xã hội đang dần nhận thức rõ hơn về việc trao quyền làm chủ người lao động, không để con người trở thành "công cụ" của AI hay thuật toán, qua đó từng bước thực hiện quá trình tự do phát triển toàn diện của nhân loại.
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
