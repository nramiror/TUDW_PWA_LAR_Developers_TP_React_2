import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs px-4"
      onClick={onClose}
    >
      {}
      <div 
        className="relative w-full max-w-md transform rounded-[var(--radius-border)] border border-primary/20 bg-linear-to-b from-brand-light to-brand-bg p-6 shadow-2xl transition-all duration-300 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-secondary/60 transition-colors duration-200 hover:bg-secondary/10 hover:text-secondary focus-visible:outline-hidden"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {}
        <div className="mt-2 text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;