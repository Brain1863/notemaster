import { Sparkles } from 'lucide-react';
import { AIPanel } from './AIPanel';
import './AIFloatingButton.css';

interface AIFloatingButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function AIFloatingButton({ isOpen, onToggle, onClose }: AIFloatingButtonProps) {
  if (isOpen) {
    return (
      <div className="ai-floating-modal">
        <div className="ai-floating-modal-content">
          <AIPanel isFloating onClose={onClose} />
        </div>
      </div>
    );
  }

  return (
    <button className="ai-floating-btn" onClick={onToggle} title="AI 助手">
      <Sparkles size={24} />
    </button>
  );
}
