import { useState, useEffect, useRef } from 'react';
import { Radio, Mic, Send, AlertCircle, Terminal, Trash2 } from 'lucide-react';

const initialLog = [
  { time: '09:42:11', sender: 'SYS', type: 'info', msg: 'UPLINK SECURED. NUUK HQ ACTIVE.' },
  { time: '09:45:00', sender: 'OP-09', type: 'msg', msg: 'HQ, Snowcat Alpha is loaded with Fuel Inv-004. Moving to FOB-A.' },
  { time: '09:45:12', sender: 'CMD', type: 'msg', msg: 'Copy OP-09. Visibility dropping to 1.2km. Drive slow.' },
  { time: '10:12:04', sender: 'SYS', type: 'warn', msg: 'BETA TEAM (OP-03, OP-05) ENTERING PROXIMITY OF CREVASSE HAZARD ZONE.' },
  { time: '10:30:55', sender: 'OP-05', type: 'msg', msg: 'HQ, James here. The Thermal Drill tracks are frozen. I am stepping out to manually clear them.' },
  { time: '10:31:02', sender: 'CMD', type: 'msg', msg: 'Hold position OP-05. Wind is at 45 knots.' },
  { time: '10:32:14', sender: 'SYS', type: 'alert', msg: 'CRITICAL ALERT: OP-05 BIOMETRICS SPIKE. TEMP FATAL DROP.' },
];

export default function Comms() {
  const [inputValue, setInputValue] = useState('');
  
  const [chatLog, setChatLog] = useState(() => {
    const saved = sessionStorage.getItem('polarCommsLog');
    return saved ? JSON.parse(saved) : initialLog;
  });

  const chatContainerRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem('polarCommsLog', JSON.stringify(chatLog));
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];

    const newMessage = {
      time: timeString,
      sender: 'CMD',
      type: 'msg',
      msg: inputValue.trim()
    };

    setChatLog([...chatLog, newMessage]);
    setInputValue('');
  };

  // Function to wipe the local storage and reset to default
  const handleClearLog = () => {
    sessionStorage.removeItem('polarCommsLog');
    setChatLog(initialLog);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-end justify-between border-b border-slate-300 dark:border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Comms Log</h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest mt-1">ENCRYPTED VHF & SAT-LINK</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-polar-accent/10 border border-polar-accent/30 text-polar-accent text-[11px] font-mono font-bold uppercase tracking-widest">
            <Radio className="w-3 h-3 animate-pulse" />
            Uplink Active
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-lg shadow-2xl overflow-hidden font-mono relative">
        
        {/* Terminal Header with Clear Button */}
        <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-slate-500" />
            <span>BASH // SECURE_COMMS_V2.1</span>
          </div>
          <button 
            onClick={handleClearLog}
            className="flex items-center gap-2 px-2 py-1 hover:bg-polar-alert/20 hover:text-polar-alert transition-colors rounded text-[10px] tracking-widest uppercase"
            title="Purge Local Cache"
          >
            <Trash2 className="w-3 h-3" /> Purge Log
          </button>
        </div>

        {/* Message Log */}
        <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-3 pb-10">
          {chatLog.map((log, i) => (
            <div key={i} className="flex gap-4 text-sm animate-[fadeIn_0.3s_ease-in-out]">
              <span className="text-slate-600 shrink-0">[{log.time}]</span>
              <span className={`shrink-0 w-12 font-bold ${
                log.sender === 'CMD' ? 'text-polar-accent' : 
                log.sender === 'SYS' ? 'text-slate-500' : 'text-emerald-400'
              }`}>
                {log.sender}:
              </span>
              <span className={`${
                log.type === 'alert' ? 'text-polar-alert font-bold bg-polar-alert/10 px-2' :
                log.type === 'warn' ? 'text-polar-warning' :
                log.type === 'info' ? 'text-slate-500 italic' : 'text-slate-300'
              }`}>
                {log.type === 'alert' && <AlertCircle className="inline w-4 h-4 mr-2 mb-1" />}
                {log.msg}
              </span>
            </div>
          ))}
          <div className="flex gap-4 text-sm mt-4">
             <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
             <span className="w-2 h-4 bg-slate-500 animate-pulse"></span>
          </div>
        </div>

        {/* Input Area Form */}
        <form onSubmit={handleTransmit} className="bg-slate-900 border-t border-slate-800 p-4 shrink-0">
          <div className="flex gap-3">
            <button type="button" className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors rounded">
              <Mic className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="BROADCAST TO ALL CHANNELS..." 
              className="flex-1 bg-slate-950 border border-slate-800 text-white px-4 font-mono text-sm focus:outline-none focus:border-polar-accent transition-colors placeholder:text-slate-600"
            />
            <button type="submit" className="px-6 bg-polar-accent hover:bg-polar-accent/80 text-white font-bold tracking-widest uppercase text-sm transition-colors flex items-center gap-2">
              Transmit <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}