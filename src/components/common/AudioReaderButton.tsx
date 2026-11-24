import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AudioReaderButtonProps {
  text: string;
  hindiText?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const AudioReaderButton: React.FC<AudioReaderButtonProps> = ({
  text,
  hindiText,
  className = '',
  size = 'md'
}) => {
  const { audioActive, speakText, stopSpeech, language } = useApp();

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioActive) {
      stopSpeech();
    } else {
      const targetText = language === 'hi' && hindiText ? hindiText : text;
      speakText(targetText, language);
    }
  };

  const isSmall = size === 'sm';

  return (
    <button
      onClick={handleAudioClick}
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
        audioActive
          ? 'bg-emerald-500 text-white animate-pulse shadow-md shadow-emerald-500/20'
          : 'bg-navy-800 hover:bg-navy-700 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60'
      } ${isSmall ? 'p-1 text-xs' : 'px-2.5 py-1 text-xs font-medium'} ${className}`}
      title={language === 'hi' ? 'ऑडियो सुनें (Web Speech)' : 'Listen via Web Speech Voice Reader'}
      aria-label="Text to speech audio readout"
    >
      {audioActive ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      <span>{language === 'hi' ? (audioActive ? 'रोकें' : 'सुनें') : (audioActive ? 'Stop' : 'Audio')}</span>
    </button>
  );
};
