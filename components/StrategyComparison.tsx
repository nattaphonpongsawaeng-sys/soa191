import React, { useState } from 'react';
import { STRATEGY_DATA } from '../constants';
import { AlertTriangle, Archive, Zap, ArrowRight, CheckCircle2, Target } from 'lucide-react';

const StrategyComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'problem' | 'old' | 'new'>('old');

  const problemData = STRATEGY_DATA.find(i => i.category === 'problem');
  const oldData = STRATEGY_DATA.find(i => i.category === 'old_strategy');
  const newData = STRATEGY_DATA.find(i => i.category === 'new_process');

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-sao-900 mb-3 relative inline-block font-serif">
            ยุทธศาสตร์การทำงาน
            <div className="absolute bottom-1 left-0 w-full h-3 bg-gold-200/50 -z-10 rounded-sm"></div>
          </h2>
          <p className="text-sao-700 text-lg">
            วิเคราะห์ปัญหา อดีต และทิศทางสู่อนาคต
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <button 
          onClick={() => setActiveTab('problem')}
          className={`flex-1 p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${activeTab === 'problem' ? 'border-red-500 bg-red-50 shadow-md ring-1 ring-red-200' : 'border-gray-200 bg-white hover:border-red-200 shadow-sm'}`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${activeTab === 'problem' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'}`}>
              <AlertTriangle size={24} />
            </div>
            <span className={`font-bold text-lg ${activeTab === 'problem' ? 'text-red-900' : 'text-gray-700'}`}>อุปสรรค</span>
          </div>
          <p className="text-sm text-gray-500">ข้อจำกัดด้านบุคลากรและกฎหมาย</p>
        </button>

        <button 
          onClick={() => setActiveTab('old')}
          className={`flex-1 p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${activeTab === 'old' ? 'border-gray-400 bg-gray-50 shadow-md ring-1 ring-gray-200' : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'}`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${activeTab === 'old' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Archive size={24} />
            </div>
            <span className={`font-bold text-lg ${activeTab === 'old' ? 'text-gray-900' : 'text-gray-700'}`}>ยุทธศาสตร์เก่า</span>
          </div>
          <p className="text-sm text-gray-500">เน้นการจับผิดและการตรวจสอบย้อนหลัง</p>
        </button>

        <button 
          onClick={() => setActiveTab('new')}
          className={`flex-1 p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group ${activeTab === 'new' ? 'border-sao-500 bg-sao-50 shadow-md ring-1 ring-sao-200' : 'border-gray-200 bg-white hover:border-sao-200 shadow-sm'}`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg ${activeTab === 'new' ? 'bg-sao-600 text-white' : 'bg-sao-100 text-sao-600'}`}>
              <Zap size={24} />
            </div>
            <span className={`font-bold text-lg ${activeTab === 'new' ? 'text-sao-900' : 'text-gray-700'}`}>ยุทธศาสตร์ปัจจุบัน</span>
          </div>
          <p className="text-sm text-gray-500">เชิงรุก ทันสมัย และเป็นที่ปรึกษา</p>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-full h-1 ${activeTab === 'problem' ? 'bg-red-500' : activeTab === 'old' ? 'bg-gray-500' : 'bg-sao-500'}`}></div>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
              {activeTab === 'problem' && <AlertTriangle className="text-red-600" size={32} />}
              {activeTab === 'old' && <Archive className="text-gray-600" size={32} />}
              {activeTab === 'new' && <Target className="text-sao-600" size={32} />}
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {activeTab === 'problem' && problemData?.title}
                {activeTab === 'old' && oldData?.title}
                {activeTab === 'new' && newData?.title}
              </h3>
              <p className="text-gray-500 mt-1">รายละเอียดและประเด็นสำคัญ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(activeTab === 'problem' ? problemData : activeTab === 'old' ? oldData : newData)?.items.map((item, idx) => (
              <div 
                key={idx} 
                className={`
                  flex items-start space-x-4 p-5 rounded-lg border transition-all hover:shadow-sm
                  ${activeTab === 'problem' ? 'bg-red-50/50 border-red-100' : ''}
                  ${activeTab === 'old' ? 'bg-gray-50/50 border-gray-100' : ''}
                  ${activeTab === 'new' ? 'bg-sao-50/50 border-sao-100' : ''}
                `}
              >
                <div className={`mt-1 shrink-0`}>
                   {activeTab === 'problem' && <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />}
                   {activeTab === 'old' && <div className="w-2 h-2 rounded-full bg-gray-500 mt-2" />}
                   {activeTab === 'new' && <CheckCircle2 className="text-sao-600" size={20} />}
                </div>
                <p className={`font-medium text-lg leading-relaxed text-gray-800`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {activeTab === 'new' && (
          <div className="bg-sao-900 p-10 text-white relative overflow-hidden">
             <div className="absolute right-0 top-0 w-64 h-64 bg-sao-800 rounded-full opacity-50 blur-3xl -mr-20 -mt-20"></div>
            <h4 className="font-bold text-xl mb-8 flex items-center relative z-10 border-b border-sao-700 pb-4">
              <Zap className="mr-2 text-gold-400" />
              <span>เป้าหมายการเปลี่ยนแปลง (Transformation)</span>
            </h4>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex-1 bg-sao-800 p-6 rounded-xl border border-sao-700 w-full text-center md:text-left">
                <div className="text-gray-400 text-xs font-bold tracking-wider mb-2 uppercase">From</div>
                <div className="font-bold text-xl text-white mb-1">Auditor as Police</div>
                <div className="text-sm text-sao-200">จับผิดเหมือนตำรวจ</div>
              </div>
              
              <div className="flex items-center justify-center">
                 <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-lg shadow-gold-900/20 text-sao-900">
                    <ArrowRight size={24} />
                 </div>
              </div>
              
              <div className="flex-1 bg-gradient-to-br from-sao-700 to-sao-600 p-6 rounded-xl border border-sao-500 shadow-xl w-full text-center md:text-left">
                <div className="text-gold-300 text-xs font-bold tracking-wider mb-2 uppercase">To</div>
                <div className="font-bold text-xl text-white mb-1">Trusted Advisor</div>
                <div className="text-sm text-sao-100">ที่ปรึกษาที่วางใจได้</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyComparison;
