import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md", showText = true }) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  return (
    <div id="safedrill-brand-logo" className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 p-1.5 shadow-lg shadow-orange-500/20 ring-1 ring-white/20 ${iconSizes[size]}`}>
        {/* Animated radar pulse */}
        <div className="absolute inset-0 rounded-xl bg-amber-400 opacity-25 animate-ping" style={{ animationDuration: '3s' }} />
        
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 text-slate-950 stroke-current"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Shield Outline */}
          <path
            d="M16 3L5 7v9c0 7.5 4.5 12.5 11 14 6.5-1.5 11-6.5 11-14V7L16 3z"
            fill="#0f172a"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          {/* Internal Warning Drill & Lightning/Rescue Bolt */}
          <path
            d="M17 9L11 17h5l-1 7 7-9h-5l1-6z"
            fill="#f59e0b"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white font-sans ${textSizes[size]}`}>
              SAFE<span className="text-amber-500 dark:text-amber-400 font-black">DRILL</span>
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 tracking-wider uppercase">
              v2.0
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 tracking-wide">
            Disaster Readiness & Response Hub
          </span>
        </div>
      )}
    </div>
  );
};

