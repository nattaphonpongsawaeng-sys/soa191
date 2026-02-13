import React from 'react';
import { Section } from '../types';
import { LayoutDashboard, History, Target, Network, TrendingUp, X, LogOut, ChevronRight, Sparkles, Scale } from 'lucide-react';

interface SidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: Section.DASHBOARD, label: 'หน้าหลัก (Dashboard)', icon: <LayoutDashboard size={22} /> },
    { id: Section.TIMELINE, label: 'ไทม์ไลน์ประวัติ (Timeline)', icon: <History size={22} /> },
    { id: Section.MISSIONS, label: 'ภารกิจ (Missions)', icon: <Target size={22} /> },
    { id: Section.STRUCTURE, label: 'โครงสร้าง (Structure)', icon: <Network size={22} /> },
    { id: Section.STRATEGY, label: 'ยุทธศาสตร์ (Strategy)', icon: <TrendingUp size={22} /> },
  ];

  const handleNavClick = (section: Section) => {
    onSectionChange(section);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-72 text-white transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-2xl flex flex-col overflow-hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:inset-auto
          bg-[#2a1205] /* Darker base */
          border-r border-white/10
        `}
      >
        {/* Advanced Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a1905] via-[#2a1205] to-[#1a0a03] opacity-100 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0 mix-blend-overlay"></div>
        
        {/* Golden Sheen Gradient Animation */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-gold-500/10 to-transparent rotate-12 animate-sheen pointer-events-none z-0"></div>

        {/* Sidebar Header */}
        <div className="relative p-8 pb-10 z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-4 group cursor-pointer w-full">
               <div className="relative shrink-0">
                  {/* Rotating Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-gold-400/30 animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute -inset-2 bg-gold-500/20 blur-xl rounded-full animate-pulse"></div>
                  
                  {/* Logo Icon (Reverted to Icon for reliability, styled to look premium) */}
                  <div className="relative w-14 h-14 bg-gradient-to-br from-sao-900 to-sao-950 rounded-full flex items-center justify-center border-[3px] border-gold-500 shadow-[0_0_20px_rgba(197,144,45,0.4)] z-10 p-1.5 group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-1 rounded-full border border-gold-500/30"></div>
                    <Scale className="text-gold-400 drop-shadow-md" size={28} strokeWidth={2} />
                  </div>
                  
                  {/* Sparkle Decoration */}
                  <div className="absolute -top-1 -right-1 text-gold-300 animate-bounce delay-700">
                    <Sparkles size={14} />
                  </div>
               </div>
               
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-white to-gold-200 font-official drop-shadow-sm">
                  สตง.
                </span>
                <div className="h-0.5 w-12 bg-gradient-to-r from-gold-500 to-transparent my-1"></div>
                <span className="text-[10px] text-gold-400/90 tracking-[0.25em] uppercase font-sans">
                  Smart Audit
                </span>
              </div>
            </div>
            
            <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto relative z-10 scrollbar-hide">
          <div className="px-4 mb-4 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
            <span className="text-[10px] font-bold text-gray-400/80 uppercase tracking-widest font-sans">Main Menu</span>
            <span className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></span>
          </div>
          
          {menuItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden mb-1
                  ${isActive ? 'text-white shadow-lg' : 'text-gray-400 hover:text-gray-100'}
                `}
              >
                {/* Active Background - Glassmorphism + Gradient */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-600/30 via-gold-500/10 to-transparent z-0"></div>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] z-0 border border-white/10 rounded-xl"></div>
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-gold-400 rounded-r-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                  </>
                )}

                {/* Hover Background - Subtle glow */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                )}

                {/* Content */}
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`
                    transition-all duration-300 p-1.5 rounded-lg
                    ${isActive 
                      ? 'text-white bg-gradient-to-br from-gold-500 to-yellow-600 shadow-md transform scale-105' 
                      : 'text-gray-500 group-hover:text-gold-300 group-hover:bg-white/5'
                    }
                  `}>
                    {item.icon}
                  </div>
                  <span className={`
                    font-medium tracking-wide text-sm font-official transition-all duration-300
                    ${isActive ? 'text-white font-semibold' : 'group-hover:translate-x-1'}
                  `}>
                    {item.label}
                  </span>
                </div>

                {/* Chevron */}
                {isActive && (
                   <ChevronRight size={16} className="text-gold-400 animate-pulse relative z-10" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer with Card Design */}
        <div className="p-4 relative z-10 mt-auto">
           <div className="relative rounded-2xl p-5 overflow-hidden group">
             {/* Card Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md rounded-2xl group-hover:border-white/20 transition-colors"></div>
             
             {/* Abstract circle decoration */}
             <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gold-500/20 rounded-full blur-xl"></div>

             <div className="relative z-10 flex flex-col space-y-3">
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-xs font-bold shadow-lg">
                   AD
                 </div>
                 <div className="flex flex-col">
                   <span className="text-xs font-bold text-white">Admin User</span>
                   <span className="text-[10px] text-gray-400">System Admin</span>
                 </div>
               </div>
               
               <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-red-500/80 text-gray-200 hover:text-white transition-all duration-300 mt-2 text-xs font-medium border border-white/5">
                  <LogOut size={14} />
                  <span>ออกจากระบบ</span>
               </button>
             </div>
           </div>
           
           <div className="mt-4 text-center">
             <p className="text-[10px] text-gray-500 font-sans tracking-widest opacity-60">
               SAO V.2.0.4
             </p>
           </div>
        </div>
      </aside>

      <style>{`
        @keyframes sheen {
          0% { transform: translate(-50%, -50%) rotate(12deg); }
          100% { transform: translate(50%, 50%) rotate(12deg); }
        }
        .animate-sheen {
          animation: sheen 8s infinite linear;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Sidebar;