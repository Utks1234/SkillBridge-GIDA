import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  HelpCircle,
  Award,
  Coins
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getKaushalyaResponse, ChatMessage } from '../../services/aiEngine';
import { AudioReaderButton } from '../common/AudioReaderButton';
import { SampleDataBadge } from '../common/SampleDataBadge';

export const KaushalyaChatbot: React.FC = () => {
  const { language, speakText } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'kaushalya',
      text:
        'Hello! I am Kaushalya (कौशल्या), your bilingual AI Career Guide for GIDA Gorakhpur. Ask me about local factory vacancies at Gallantt Ispat, claiming the UP Govt ₹1,000 CMAPS stipend, 12-week courses at Govt ITI Chargawan & Sahjanwa, or technical interview tips!',
      hindiText:
        'नमस्ते! मैं कौशल सेतु गिडा की द्विभाषी एआई मार्गदर्शिका "कौशल्या" हूँ। मुझसे गैलेंट इस्पात, प्लास्टिक पार्क की रिक्तियों, यूपी सरकार के ₹1,000 सीएमएपी भत्ते, आईटीआई चरगांवा व सहजनवां के कोर्स और फैक्ट्री इंटरव्यू के बारे में पूछें!',
      timestamp: '18:40',
      suggestedQuestions: [
        language === 'hi' ? 'CMAPS योजना में ₹1,000 का अतिरिक्त भत्ता कैसे प्राप्त करें?' : 'How to get ₹1,000 extra stipend under CMAPS?',
        language === 'hi' ? 'गैलेंट इस्पात में सीएनसी ऑपरेटर के लिए क्या योग्यता चाहिए?' : 'What qualifications are needed for Gallantt CNC roles?',
        language === 'hi' ? 'प्लास्टिक पार्क में इंटरव्यू कैसे पास करें?' : 'How to crack technical interview in Plastic Park?'
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getKaushalyaResponse(q, language);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'kaushalya',
        text: response.replyEn,
        hindiText: response.replyHi,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: response.suggestedQuestions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="bg-navy-900 border border-navy-700/80 rounded-2xl shadow-xl flex flex-col h-[650px] overflow-hidden">
      
      {/* Chatbot Header */}
      <div className="p-4 bg-navy-950 border-b border-navy-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 font-bold text-lg">
              क
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-navy-950"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">
                कौशल्या <span className="text-emerald-400 font-sans">(Kaushalya AI Guide)</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Bilingual AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'hi'
                ? 'गिडा ट्रेड, सीएमएपी ₹1,000 भत्ता एवं करियर परामर्श'
                : 'Gorakhpur GIDA Trades, CMAPS Stipend & Technical Career Counselling'}
            </p>
          </div>
        </div>

        <SampleDataBadge />
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 touch-scroll bg-navy-950/40">
        {messages.map(msg => {
          const isBot = msg.sender === 'kaushalya';
          const displayedText = language === 'hi' && msg.hindiText ? msg.hindiText : msg.text;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-navy-900 border border-navy-700/80 text-slate-200 rounded-tl-sm shadow-md'
                    : 'bg-emerald-600 text-white rounded-tr-sm shadow-md shadow-emerald-950/40'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    {isBot ? 'कौशल्या (Kaushalya)' : 'You'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <p>{displayedText}</p>

                {isBot && (
                  <div className="pt-1 flex items-center justify-end">
                    <AudioReaderButton text={displayedText} size="sm" />
                  </div>
                )}
              </div>

              {/* Suggested Questions Pills if returned by Bot */}
              {isBot && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 ml-2 max-w-[90%]">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-left text-[11px] px-2.5 py-1 rounded-full bg-navy-800/80 hover:bg-navy-700 text-emerald-300 border border-navy-700 hover:border-emerald-500/40 transition active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-navy-900 border border-navy-800 w-fit text-xs text-slate-400">
            <Bot className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            <span>{language === 'hi' ? 'कौशल्या उत्तर लिख रही है...' : 'Kaushalya is typing...'}</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-navy-950 border-t border-navy-800">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'कौशल्या से पूछें (उदा. CMAPS भत्ता, गैलेंट सीएनसी, मोल्ड इंटरव्यू टिप्स)...'
                : 'Ask Kaushalya (e.g. CMAPS ₹1,000 stipend, Gallantt CNC, mold interview tips)...'
            }
            className="flex-1 bg-navy-900 border border-navy-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-950/40 transition active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
