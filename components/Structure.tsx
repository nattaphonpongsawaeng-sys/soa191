import React from 'react';
import { STRUCTURE_DATA } from '../constants';
import { StructureNode } from '../types';
import { Gavel, Briefcase, Building2, MapPin, Building, ArrowDown } from 'lucide-react';

const StructureCard: React.FC<{ node: StructureNode; level: number }> = ({ node, level }) => {
  // Define styles and icons based on level
  let containerStyle = '';
  let iconBg = '';
  let IconComponent = null;

  if (level === 0) {
    // Policy Level
    containerStyle = 'bg-white border-l-8 border-gold-500 shadow-xl ring-1 ring-gray-100';
    iconBg = 'bg-sao-900 text-gold-400';
    IconComponent = Gavel;
  } else if (level === 1) {
    // Management Level
    containerStyle = 'bg-white border-l-8 border-sao-600 shadow-lg ring-1 ring-gray-100';
    iconBg = 'bg-sao-600 text-white';
    IconComponent = Briefcase;
  } else {
    // Operation Level
    containerStyle = 'bg-white border-l-8 border-sao-400 shadow-md ring-1 ring-gray-100';
    iconBg = 'bg-sao-100 text-sao-600';
    IconComponent = Building2;
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl">
      {/* Level Title Badge */}
      {node.levelTitle && (
        <div className="mb-4 bg-sao-900 text-white px-6 py-2 rounded-full font-bold text-sm md:text-base shadow-lg z-10 border border-gold-500/30">
          {node.levelTitle}
        </div>
      )}

      {/* Main Card */}
      <div className={`relative w-full p-6 md:p-8 rounded-r-xl ${containerStyle} transition-transform hover:-translate-y-1 duration-300`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Cartoon Icon Illustration */}
          <div className={`w-20 h-20 md:w-24 md:h-24 ${iconBg} rounded-full flex items-center justify-center shrink-0 shadow-md border-4 border-white`}>
             {IconComponent && <IconComponent size={36} />}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-serif">{node.name}</h3>
            <div className="space-y-2">
              {node.role.split('\n').map((line, idx) => (
                <p key={idx} className="text-gray-600 text-sm md:text-base font-medium flex items-center md:justify-start justify-center">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Child Cards (Leaf Nodes) - specifically for Operation level */}
        {node.children && !node.relationText && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            {node.children.map((child, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-3 hover:bg-sao-50 transition-colors">
                <div className="p-2 bg-white rounded-full text-sao-600 shadow-sm border border-gray-100">
                  {idx === 0 ? <Building size={18} /> : <MapPin size={18} />}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{child.name}</div>
                  <div className="text-xs text-gray-500">{child.role}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connection Arrow */}
      {node.children && node.relationText && (
        <div className="flex flex-col items-center my-4 h-20">
          <div className="w-0.5 h-full bg-sao-200 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 border border-sao-200 rounded-full text-xs text-sao-500 font-semibold whitespace-nowrap shadow-sm">
              {node.relationText}
            </div>
          </div>
          <ArrowDown className="text-sao-300 -mt-2" size={20} />
        </div>
      )}

      {/* Recursive Rendering for next levels */}
      {node.children && node.relationText && node.children.map((child, idx) => (
        <StructureCard key={idx} node={child} level={level + 1} />
      ))}
    </div>
  );
};

const Structure: React.FC = () => {
  return (
    <div className="max-w-full mx-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-sao-900 mb-3 relative inline-block font-serif">
          โครงสร้างองค์กร
          <div className="absolute bottom-1 left-0 w-full h-3 bg-gold-200/50 -z-10 rounded-sm"></div>
        </h2>
        <p className="text-sao-700 text-lg">
          การแบ่งสายงานบังคับบัญชาตามระดับนโยบาย บริหาร และปฏิบัติการ
        </p>
      </div>

      <div className="flex flex-col items-center pb-20 bg-gray-50/50 rounded-3xl p-4 md:p-10 border border-gray-100">
        <StructureCard node={STRUCTURE_DATA} level={0} />
      </div>
    </div>
  );
};

export default Structure;
