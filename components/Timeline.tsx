import React from 'react';
import { TIMELINE_DATA } from '../constants';
import { Calendar, Flag } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
       <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-sao-900 mb-4 inline-block relative font-serif">
          ไทม์ไลน์ประวัติความเป็นมา
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gold-500 rounded-full"></span>
        </h2>
        <p className="text-gray-600 text-lg">
          เส้นทางเกียรติยศแห่งการรักษาผลประโยชน์แผ่นดิน
        </p>
      </div>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-sao-200"></div>

        <div className="space-y-12">
          {TIMELINE_DATA.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-1/2"></div>
                
                {/* Center Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-sao-500 shadow-md z-10 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className={`
                    bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-sao-200 transition-all duration-300 group
                    ${index === 0 ? 'bg-sao-50 border-sao-200' : ''}
                  `}>
                    <div className="flex items-center space-x-2 text-sao-700 font-bold mb-2">
                      <div className={`p-1.5 rounded-md ${index === 0 ? 'bg-gold-100 text-gold-700' : 'bg-sao-100'}`}>
                        {index === 0 ? <Flag size={16} /> : <Calendar size={16} />}
                      </div>
                      <span className="text-lg tracking-wide font-serif">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sao-800 transition-colors">{event.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-16 p-10 bg-sao-900 rounded-2xl text-center text-white shadow-xl relative overflow-hidden border-t-4 border-gold-500">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-3 font-serif">100+ ปี แห่งความภาคภูมิใจ</h3>
          <p className="text-sao-100 font-light text-lg">
            มุ่งมั่นตรวจสอบเพื่อความโปร่งใสและวินัยการเงินการคลังของแผ่นดิน
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
