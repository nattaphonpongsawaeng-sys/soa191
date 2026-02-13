import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';
import Missions from './components/Missions';
import Structure from './components/Structure';
import StrategyComparison from './components/StrategyComparison';
import ChatWidget from './components/ChatWidget';
import { Section } from './types';
import { Menu, Search, Bell, TrendingUp, Shield, FileText, Building, Map, AlertCircle, CheckCircle, Award, ChevronRight, Activity, Zap, Scale } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';

// Thailand Map Component (Enhanced with Data Flow Animation)
const ThailandMapSVG = () => (
  <svg viewBox="0 0 380 650" className="w-full h-full drop-shadow-2xl filter contrast-125">
    <defs>
      <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:'#ea580c', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#7c2d12', stopOpacity:1}} />
      </linearGradient>
      <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#c5902d" stopOpacity="0"/>
        <stop offset="50%" stopColor="#fbbf24" stopOpacity="1"/>
        <stop offset="100%" stopColor="#c5902d" stopOpacity="0"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Abstract Thailand Shape */}
    <path 
      d="M140,20 L170,10 L190,20 L200,50 L180,80 L220,90 L240,100 L260,120 L280,140 L260,170 L240,190 L220,180 L200,200 L190,240 L180,270 L190,300 L180,330 L170,360 L160,390 L150,430 L140,470 L130,510 L140,550 L160,570 L150,590 L130,600 L110,580 L100,550 L90,510 L100,470 L110,430 L120,390 L130,350 L120,310 L110,270 L100,230 L90,190 L80,160 L70,130 L80,100 L90,70 L110,50 L130,40 Z" 
      fill="url(#mapGradient)" 
      stroke="#c5902d" 
      strokeWidth="1.5"
      className="opacity-90 hover:opacity-100 transition-opacity duration-500"
    />
    
    {/* Animated Data Lines (Connecting Bangkok to Regions) */}
    <g className="opacity-60">
      {/* North Line */}
      <path d="M180,290 Q165,220 150,150" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,10">
         <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
      </path>
      {/* North-East Line */}
      <path d="M180,290 Q210,235 240,180" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,10">
         <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.5s" repeatCount="indefinite" />
      </path>
      {/* South Line */}
      <path d="M180,290 Q160,410 140,530" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,10">
         <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
      </path>
    </g>

    {/* Hotspots with Rings */}
    <g>
      {/* Bangkok Center */}
      <circle cx="180" cy="290" r="4" fill="#fbbf24" filter="url(#glow)">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="180" cy="290" r="10" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.5">
        <animate attributeName="r" values="10;15;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Regional Nodes */}
      <circle cx="150" cy="150" r="3" fill="#fbbf24" filter="url(#glow)" />
      <circle cx="240" cy="180" r="3" fill="#fbbf24" filter="url(#glow)" />
      <circle cx="140" cy="530" r="3" fill="#fbbf24" filter="url(#glow)" />
    </g>

    {/* Labels */}
    <text x="195" y="295" className="text-[12px] fill-white font-bold font-sans drop-shadow-md" textAnchor="start">ส่วนกลาง (HQ)</text>
  </svg>
);

const DashboardHome: React.FC = () => {
  // Mock Data for Line Chart
  const trendData = [
    { year: '2563', reports: 1200, issues: 450, solved: 300 },
    { year: '2564', reports: 1350, issues: 380, solved: 320 },
    { year: '2565', reports: 1500, issues: 520, solved: 400 },
    { year: '2566', reports: 1800, issues: 310, solved: 290 },
    { year: '2567', reports: 2100, issues: 280, solved: 270 },
  ];

  const highlights = [
    { date: '15 มี.ค. 2567', title: 'ประกาศใช้ระเบียบใหม่', desc: 'ระเบียบว่าด้วยวินัยการเงินการคลังฉบับปรับปรุง', type: 'law' },
    { date: '02 ก.พ. 2567', title: 'ตรวจสอบโครงการรถไฟฟ้า', desc: 'รายงานผลการตรวจสอบโครงการสายสีส้ม', type: 'audit' },
    { date: '10 ม.ค. 2567', title: 'เปิดตัว e-Audit', desc: 'ระบบตรวจสอบดิจิทัลเต็มรูปแบบ', type: 'tech' },
    { date: '12 ธ.ค. 2566', title: 'สัมมนาวิชาการ', desc: 'ทิศทางการตรวจสอบภาครัฐยุคใหม่', type: 'event' },
  ];

  return (
    <div className="min-h-screen pb-10 font-sans">
      
      {/* 1. Cinematic Video Hero Banner */}
      <div className="relative h-[450px] w-full overflow-hidden bg-sao-900 border-b-4 border-gold-500 shadow-2xl group">
        
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
            {/* Using a tech/network style background video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-global-network-map-12294-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Fallback pattern if video fails or loads slow */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>
        
        {/* Gradient Overlay for Brand Consistency */}
        <div className="absolute inset-0 bg-gradient-to-r from-sao-950 via-sao-900/90 to-sao-800/40"></div>
        
        {/* Animated Particles/Decorations */}
        <div className="absolute top-0 right-0 p-20 opacity-10 animate-pulse">
           <Activity size={400} className="text-white transform rotate-12" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-6 md:space-y-0 md:space-x-10">
            
            {/* Animated Logo Section - UPDATED TO PREMIUM ICON */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-spin-slow"></div>
              <div className="relative w-32 h-32 md:w-44 md:h-44 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-gold-500 shadow-2xl transform transition-transform duration-500 hover:rotate-y-12 overflow-hidden p-2">
                 <div className="w-full h-full rounded-full bg-sao-900 flex items-center justify-center border-4 border-gold-100/50 shadow-inner">
                    <Scale className="text-gold-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" size={64} strokeWidth={1.5} />
                 </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left text-white mb-6 max-w-2xl">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                  <div className="px-3 py-1 border border-gold-400/50 rounded-full bg-sao-950/40 backdrop-blur-md text-gold-300 text-xs font-bold tracking-widest uppercase shadow-sm flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Royal Thai Government
                  </div>
                  <div className="px-3 py-1 border border-white/20 rounded-full bg-white/10 backdrop-blur-md text-gray-200 text-xs font-bold tracking-widest uppercase shadow-sm">
                    FISCAL YEAR 2568
                  </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-official font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400 drop-shadow-lg leading-tight">
                สำนักงานการตรวจเงินแผ่นดิน
              </h1>
              <p className="text-gold-200 text-xl md:text-2xl font-light tracking-wide mt-2 font-official border-l-4 border-gold-500 pl-4 ml-1 md:ml-0">
                State Audit Office of the Kingdom of Thailand
              </p>
              <p className="text-gray-300 text-sm mt-4 max-w-lg font-light">
                ขับเคลื่อนวินัยการเงินการคลังของรัฐด้วยนวัตกรรมและธรรมาภิบาล เพื่อประโยชน์สูงสุดของประชาชน
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute left-0 bottom-0 w-full h-24 bg-gradient-to-t from-sao-50 to-transparent"></div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-20">
        
        {/* 3. KPI Cards - Enhanced with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'หน่วยรับตรวจ (Agencies)', value: '8,542', sub: 'ทั้งหมดในระบบฐานข้อมูล', icon: <Building size={24} />, color: 'sao', trend: '+12' },
            { label: 'รายงานการตรวจสอบ (Reports)', value: '12,450', sub: 'รายงานฉบับสมบูรณ์', icon: <FileText size={24} />, color: 'gold', trend: '+8.5%' },
            { label: 'มูลค่าความเสียหาย (Damages)', value: '฿3.2B', sub: 'เรียกคืนรายได้แผ่นดิน', icon: <AlertCircle size={24} />, color: 'red', trend: '-2.4%' },
            { label: 'ข้อเสนอแนะ (Recommendations)', value: '5,600', sub: 'นำไปปฏิบัติแล้ว', icon: <Shield size={24} />, color: 'green', trend: '+95%' }
          ].map((card, idx) => (
             <div key={idx} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white p-6 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                {/* Decoration Circle */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${card.color === 'sao' ? 'orange' : card.color}-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider font-sans">{card.label}</p>
                    <div className="flex items-end space-x-2 mt-1">
                        <h3 className={`text-3xl font-bold text-gray-900 font-official`}>{card.value}</h3>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded bg-${card.color === 'red' ? 'red' : 'green'}-100 text-${card.color === 'red' ? 'red' : 'green'}-700 font-bold flex items-center`}>
                           {card.color === 'red' ? '▼' : '▲'} {card.trend}
                        </span>
                        <p className="text-xs text-gray-400">{card.sub}</p>
                    </div>
                  </div>
                  <div className={`p-3 bg-white rounded-xl text-${card.color === 'sao' ? 'orange' : card.color}-600 shadow-md ring-1 ring-gray-100 group-hover:rotate-12 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                </div>
                {/* Bottom Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-${card.color === 'sao' ? 'orange' : card.color}-400 to-${card.color === 'sao' ? 'orange' : card.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
             </div>
          ))}
        </div>

        {/* Charts & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* 5. Annual Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sao-100 rounded-lg text-sao-600">
                    <Award size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 font-official">แนวโน้มผลการตรวจสอบ (Performance Trends)</h3>
                    <p className="text-xs text-gray-400">เปรียบเทียบข้อมูลย้อนหลัง 5 ปีงบประมาณ</p>
                </div>
              </div>
              <button className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 transition-colors flex items-center">
                 Download Report <FileText size={12} className="ml-1"/>
              </button>
            </div>
            
            <div className="flex-1 w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} style={{ fontFamily: 'Sarabun', fontSize: '12px' }} />
                  <YAxis axisLine={false} tickLine={false} style={{ fontFamily: 'Sarabun', fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontFamily: 'Sarabun' }}
                    cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '5 5' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontFamily: 'Sarabun' }} />
                  <Area type="monotone" dataKey="reports" name="รายงาน (Reports)" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                  <Area type="monotone" dataKey="issues" name="ข้อตรวจพบ (Issues)" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorIssues)" />
                  <Line type="monotone" dataKey="solved" name="แก้ไขแล้ว (Solved)" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 6. Geo Map (Interactive & Animated) */}
          <div className="bg-sao-900 rounded-2xl shadow-2xl border border-sao-800 p-0 relative overflow-hidden flex flex-col group">
            {/* Background Grid Animation */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Header */}
            <div className="p-5 border-b border-sao-800 bg-sao-950/80 backdrop-blur-md relative z-10 flex justify-between items-center">
              <div>
                  <h3 className="text-white font-bold font-official flex items-center">
                    <Map className="mr-2 text-gold-500" size={18} />
                    พื้นที่ตรวจสอบ (Live Monitor)
                  </h3>
                  <p className="text-[10px] text-gray-400 pl-6">Real-time data synchronization</p>
              </div>
              <div className="flex items-center space-x-1.5 px-2 py-1 bg-sao-800 rounded-full border border-sao-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[10px] text-gray-200 font-mono">ONLINE</span>
              </div>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center p-4 bg-gradient-to-b from-sao-900 to-black/90 group-hover:from-sao-800 transition-colors duration-500">
               <ThailandMapSVG />
               
               {/* Floating Info Stats */}
               <div className="absolute top-20 left-4">
                   <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/10 mb-2 transform transition-all hover:scale-105 cursor-pointer">
                       <div className="text-[10px] text-gray-400">ภาคเหนือ</div>
                       <div className="text-gold-400 text-xs font-bold">98% Complete</div>
                       <div className="h-1 w-full bg-gray-700 rounded-full mt-1 overflow-hidden">
                           <div className="h-full bg-gold-500 w-[98%]"></div>
                       </div>
                   </div>
               </div>

               {/* Legend Overlay */}
               <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-lg">
                 <div className="flex items-center mb-2">
                   <Zap size={10} className="text-gold-500 mr-1" />
                   <span className="text-[10px] text-gray-300 font-bold">DATA FEED</span>
                 </div>
                 <div className="space-y-1.5">
                    <div className="flex items-center justify-between w-24 text-[10px]">
                        <span className="text-gray-400">Connection</span>
                        <span className="text-green-400">Stable</span>
                    </div>
                    <div className="flex items-center justify-between w-24 text-[10px]">
                        <span className="text-gray-400">Latency</span>
                        <span className="text-gold-400">24ms</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* 4. Timeline Section (Horizontal) */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Activity size={100} />
          </div>

          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
                <h3 className="text-xl font-bold text-sao-900 font-official flex items-center">
                <div className="p-2 bg-gradient-to-br from-gold-100 to-gold-200 rounded-lg mr-3 text-gold-700 shadow-sm border border-gold-200">
                    <CheckCircle size={24} />
                </div>
                เหตุการณ์สำคัญ (Timeline & Milestones)
                </h3>
            </div>
            <button className="text-sm text-sao-600 hover:text-sao-800 font-medium flex items-center transition-colors bg-sao-50 px-3 py-1.5 rounded-full hover:bg-sao-100">
              ดูทั้งหมด <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="relative z-10">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {highlights.map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  {/* Timeline Dot */}
                  <div className="hidden md:flex justify-center mb-6 relative">
                     <div className="w-4 h-4 rounded-full bg-white border-4 border-gold-500 shadow-lg group-hover:scale-125 group-hover:border-sao-600 transition-all duration-300 z-10"></div>
                     {/* Pulse Effect */}
                     {index === 0 && <div className="absolute w-4 h-4 rounded-full bg-gold-500 animate-ping opacity-50 z-0"></div>}
                  </div>
                  
                  {/* Card Content */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-gold-300 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-gold-500 transition-colors duration-300"></div>
                    <div className="text-xs font-bold text-gold-600 mb-2 font-sans bg-gold-50 w-fit px-2 py-0.5 rounded-md border border-gold-100">
                      {item.date}
                    </div>
                    <h4 className="font-bold text-sao-900 mb-2 font-official text-lg group-hover:text-sao-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>(Section.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentSection) {
      case Section.DASHBOARD:
        return <DashboardHome />;
      case Section.TIMELINE:
        return <Timeline />;
      case Section.MISSIONS:
        return <Missions />;
      case Section.STRUCTURE:
        return <Structure />;
      case Section.STRATEGY:
        return <StrategyComparison />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-sao-50 overflow-hidden font-sans">
      <Sidebar 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Top Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-8 h-16 shrink-0 z-30 shadow-sm sticky top-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mr-4 md:hidden text-sao-900 hover:text-gold-600 p-2 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex flex-col">
               <span className="text-sm font-bold text-sao-900 font-official tracking-wide flex items-center">
                 ระบบบริหารจัดการข้อมูลองค์กร <span className="ml-2 px-1.5 py-0.5 bg-sao-100 text-sao-700 text-[10px] rounded border border-sao-200">v2.0</span>
               </span>
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">Executive Information System</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden md:flex relative group">
              <input 
                type="text" 
                placeholder="ค้นหารายงาน / เอกสาร..." 
                className="pl-10 pr-4 py-2 rounded-full bg-gray-50 border border-gray-200 focus:border-sao-400 focus:bg-white focus:ring-4 focus:ring-sao-100 text-sm w-72 transition-all outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-sao-500 transition-colors" size={16} />
            </div>
            
            <button className="relative p-2 text-gray-500 hover:text-sao-900 hover:bg-gray-100 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
            </button>
            
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sao-800 to-sao-900 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-gold-400 cursor-pointer hover:shadow-lg transition-shadow relative">
                 AD
                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="text-xs hidden md:block">
                <div className="font-bold text-gray-800 font-official">Admin User</div>
                <div className="text-gray-400">System Administrator</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-sao-50 scroll-smooth">
          {renderContent()}
        </main>
      </div>

      <ChatWidget currentSection={currentSection} />
    </div>
  );
};

export default App;