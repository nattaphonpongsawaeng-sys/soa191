import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { askGemini } from '../services/gemini';
import { Section } from '../types';
import { MISSION_DATA, TIMELINE_DATA, STRATEGY_DATA, STRUCTURE_DATA } from '../constants';

interface ChatWidgetProps {
  currentSection: Section;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: 'สวัสดีครับ ผมคือผู้ช่วย AI ของ สตง. มีข้อสงสัยเกี่ยวกับข้อมูลในหน้า Dashboard สอบถามได้เลยครับ' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContext = () => {
    switch (currentSection) {
      case Section.TIMELINE:
        return `ข้อมูลไทม์ไลน์: ${JSON.stringify(TIMELINE_DATA)}`;
      case Section.MISSIONS:
        return `ข้อมูลภารกิจ: ${JSON.stringify(MISSION_DATA)}`;
      case Section.STRUCTURE:
        return `ข้อมูลโครงสร้าง: ${JSON.stringify(STRUCTURE_DATA)}`;
      case Section.STRATEGY:
        return `ข้อมูลยุทธศาสตร์: ${JSON.stringify(STRATEGY_DATA)}`;
      default:
        return "หน้าภาพรวม Dashboard ของสำนักงานการตรวจเงินแผ่นดิน";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    const context = getContext();
    const answer = await askGemini(userMsg, context);

    setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 border-2 border-white
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-gradient-to-r from-sao-800 to-sao-900 text-white hover:scale-110'}
        `}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`
          fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
        `}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sao-900 to-sao-800 p-4 text-white flex justify-between items-center border-b border-gold-500">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
               <Bot size={20} className="text-gold-400" />
            </div>
            <span className="font-semibold tracking-wide">SAO AI Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`
                  max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-sao-700 text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-sm border border-gray-200 shadow-sm flex items-center space-x-2">
                <Loader2 className="animate-spin text-sao-600" size={16} />
                <span className="text-xs text-gray-500">กำลังประมวลผล...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-sao-400 focus-within:bg-white transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="ถามเกี่ยวกับหน้านี้..."
              className="flex-1 px-3 py-2 bg-transparent focus:outline-none text-sm"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-sao-800 text-white rounded-full hover:bg-sao-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-transform active:scale-95"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
