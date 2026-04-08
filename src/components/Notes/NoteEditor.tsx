import React, { useState, useEffect, useRef } from 'react';

interface NoteEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export function NoteEditor({ initialContent = "", onSave, onCancel }: NoteEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isError, setIsError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSave = () => {
    if (content.trim() === '') {
      setIsError(true);
      setTimeout(() => setIsError(false), 500); // clear error state after shake animation
      return;
    }
    onSave(content.trim());
  };

  return (
    <div className={`flex flex-col gap-3 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md transition-all duration-200 ${isError ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a note..."
        className="w-full min-h-[80px] bg-[var(--bg-base)] border border-[var(--border-default)] rounded-md text-[var(--text-sm)] text-[var(--text-primary)] p-3 resize-y focus:outline-none focus:border-[var(--accent-primary)] focus:shadow-[var(--shadow-accent)] transition-all duration-200"
      />
      <div className="flex justify-end gap-2">
        <button 
          onClick={onCancel}
          className="px-4 py-2 text-[var(--text-sm)] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-sm bg-transparent"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 text-[var(--text-sm)] font-medium text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] transition-colors rounded-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={content.trim() === ''}
        >
          Save
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
        }
      `}} />
    </div>
  );
}
