import React from 'react';
import { MISSION_DATA, GOVERNANCE_DATA, ETHICS_DATA } from '../constants';
import { FileSignature, ShieldAlert, HeartHandshake, Scale, CheckCircle2, Shield } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  FileSignature: <FileSignature size={40} />,
  ShieldAlert: <ShieldAlert size={40} />,
  HeartHandshake: <HeartHandshake size={40} />,
  Scale: <Scale size={40} />,
};

const Missions: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      
      {/* 1. Duties Section */}
      <div className="mb-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-sao-900 mb-3 relative inline-block font-serif">
            หน้าที่ของผู้ตรวจการแผ่นดิน
            <div className="absolute bottom-1 left-0 w-full h-3 bg-gold-200/50 -z-10 rounded-sm"></div>
          </h2>
          <p className="text-sao-700 text-lg">
             พันธกิจหลักในการคุ้มครองสิทธิและสร้างความเป็นธรรมในสังคม
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MISSION_DATA.map((mission) => (
            <div 
              key={mission.id} 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-sao-300 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 group"
            >
              <div className="p-5 bg-sao-50 text-sao-600 rounded-xl shrink-0 group-hover:bg-sao-600 group-hover:text-white transition-colors duration-300">
                {iconMap[mission.iconName]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sao-700 transition-colors">{mission.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {mission.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Governance Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-sao-900 mb-6 flex items-center font-serif">
          <Shield className="mr-3 text-gold-500" />
          หลักธรรมาภิบาล (Good Governance)
        </h3>
        <div className="bg-gradient-to-r from-sao-900 to-sao-800 text-white p-8 rounded-2xl shadow-xl border-l-8 border-gold-500 relative overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute top-0 right-0 p-10 opacity-5">
             <Shield size={200} />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
             {GOVERNANCE_DATA.map((item, idx) => (
               <div key={idx} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/10 group">
                 <div className="text-gold-400 font-bold text-lg mb-2 group-hover:text-gold-300">{item.title}</div>
                 <p className="text-xs text-gray-200 leading-relaxed font-light">
                   {item.description}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* 3. Ethics Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-sao-900 mb-6 flex items-center font-serif">
          <CheckCircle2 className="mr-3 text-green-600" />
          จริยธรรมสำคัญ (Key Ethics)
        </h3>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
             {ETHICS_DATA.map((item, idx) => (
               <div key={idx} className="p-6 hover:bg-sao-50 transition-colors duration-200 group">
                 <div className="flex items-start space-x-3">
                   <div className="w-8 h-8 rounded-full bg-sao-100 text-sao-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-sao-600 group-hover:text-white transition-colors">
                     {idx + 1}
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900 mb-2 group-hover:text-sao-700 transition-colors">{item.title}</h4>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       {item.description}
                     </p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Missions;
