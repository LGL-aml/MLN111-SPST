'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Info, X } from 'lucide-react';
import { SectionHeading, GlassCard, MotionDiv } from '@/components/ui/SharedComponents';
import { MINDMAP_DATA } from '@/data/practical-data';

interface NodeData {
  id: string;
  label: string;
  description?: string;
  color?: string;
  icon?: string;
  children?: NodeData[];
}

export default function MindmapPage() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'khai-quat', 'tha-hoa', 'giai-phong', 'y-nghia']));
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [scale, setScale] = useState(1);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    const getAllIds = (node: NodeData): string[] => {
      const ids = [node.id];
      node.children?.forEach((child) => ids.push(...getAllIds(child)));
      return ids;
    };
    setExpandedNodes(new Set(getAllIds(MINDMAP_DATA)));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set(['root']));
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-dots opacity-15" />

      <section className="section-padding">
        <div className="section-container relative">
          <SectionHeading
            badge="Sơ đồ tư duy"
            title="Toàn cảnh bài học"
            subtitle="Click vào các nhánh để mở rộng hoặc thu gọn. Click vào node để xem mô tả."
            gradient="from-indigo-400 to-purple-400"
          />

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button onClick={() => setScale((s) => Math.min(s + 0.1, 1.5))} className="btn-secondary !px-3 !py-2">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))} className="btn-secondary !px-3 !py-2">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={expandAll} className="btn-secondary !px-3 !py-2 text-xs">Mở tất cả</button>
            <button onClick={collapseAll} className="btn-secondary !px-3 !py-2 text-xs">Thu gọn</button>
          </div>

          {/* Mindmap */}
          <div className="overflow-x-auto pb-8">
            <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', transition: 'transform 0.3s ease' }}>
              <MindmapTree
                node={MINDMAP_DATA}
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
                onSelect={setSelectedNode}
                depth={0}
              />
            </div>
          </div>

          {/* Node Detail Modal */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
                onClick={() => setSelectedNode(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="glass-card p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {selectedNode.icon && <span className="text-2xl">{selectedNode.icon}</span>}
                      <h3 className="text-lg font-semibold text-white">{selectedNode.label}</h3>
                    </div>
                    <button onClick={() => setSelectedNode(null)} className="p-1 rounded hover:bg-white/5">
                      <X className="w-4 h-4 text-white/50" />
                    </button>
                  </div>
                  {selectedNode.description && (
                    <p className="text-sm text-white/60 leading-relaxed">{selectedNode.description}</p>
                  )}
                  {selectedNode.children && selectedNode.children.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs text-white/40 mb-2">Nhánh con:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.children.map((child) => (
                          <span key={child.id} className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/60 border border-white/10">
                            {child.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// RECURSIVE TREE COMPONENT
// ==========================================
function MindmapTree({
  node,
  expandedNodes,
  onToggle,
  onSelect,
  depth,
}: {
  node: NodeData;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (node: NodeData) => void;
  depth: number;
}) {
  const isExpanded = expandedNodes.has(node.id);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`${depth === 0 ? 'flex flex-col items-center' : 'ml-6 border-l border-white/5 pl-4'}`}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: depth * 0.05 }}
        className={`flex items-center gap-2 mb-2 ${depth === 0 ? 'mb-6' : ''}`}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={() => onToggle(node.id)}
            className="w-5 h-5 rounded flex items-center justify-center text-xs bg-white/5 hover:bg-white/10 text-white/50 shrink-0 transition-colors"
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}

        {/* Node */}
        <button
          onClick={() => onSelect(node)}
          className={`mindmap-node flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
            depth === 0
              ? 'text-base font-bold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-white'
              : depth === 1
              ? 'text-sm font-semibold border-white/10 text-white/90 hover:border-white/20'
              : 'text-xs font-medium border-white/5 text-white/70 hover:border-white/15'
          }`}
          style={{
            backgroundColor: depth > 0 ? `${node.color}10` : undefined,
            borderColor: depth === 1 ? `${node.color}30` : undefined,
          }}
        >
          {node.icon && <span>{node.icon}</span>}
          <span>{node.label}</span>
          {node.description && <Info className="w-3 h-3 text-white/30 shrink-0" />}
        </button>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`overflow-hidden ${depth === 0 ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full' : 'space-y-1'}`}
          >
            {node.children!.map((child) => (
              <div key={child.id} className={depth === 0 ? '' : ''}>
                <MindmapTree
                  node={child}
                  expandedNodes={expandedNodes}
                  onToggle={onToggle}
                  onSelect={onSelect}
                  depth={depth + 1}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
