import React from 'react';
import { Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SampleDataBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language } = useApp();

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 tracking-wide select-none ${className}`}
      title={
        language === 'hi'
          ? 'यह रिकॉर्ड हैकाथॉन प्रदर्शन हेतु नमूना डेटा है'
          : 'This is verified sample benchmark data for hackathon demonstration'
      }
    >
      <Tag className="w-3 h-3 text-amber-400" />
      {language === 'hi' ? 'नमूना डेटा' : 'Sample Data'}
    </span>
  );
};
