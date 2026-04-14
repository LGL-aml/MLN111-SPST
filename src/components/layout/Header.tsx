'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Menu, X, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '@/data/constants';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main bar */}
      <div
        style={{
          background: 'rgba(10, 10, 26, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="block font-bold text-sm text-white">MLN111</span>
                <span className="block text-[10px] text-white/40">Triết học Mác – Lênin</span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setDropdownOpenId(item.href)}
                  onMouseLeave={() => item.children && setDropdownOpenId(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap
                      ${isActive(item.href)
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && dropdownOpenId === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 min-w-[180px] rounded-xl overflow-hidden"
                      style={{
                        background: 'rgba(15, 15, 30, 0.95)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div className="p-1.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all
                              ${isActive(child.href)
                                ? 'text-white bg-white/10'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                              }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* ── Mobile burger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X className="w-5 h-5 text-white/80" />
                : <Menu className="w-5 h-5 text-white/80" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: 'rgba(10, 10, 26, 0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <nav className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${isActive(item.href)
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {item.label}
                  </Link>

                  {/* Sub-items */}
                  {item.children && (
                    <div className="ml-4 mt-0.5 pl-3 border-l border-white/8 space-y-0.5 mb-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-[13px] transition-all
                            ${isActive(child.href)
                              ? 'text-white bg-white/10'
                              : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
