import React from "react";

export function NeonSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[180px] relative">
      {/* Outer blurred glow */}
      <div className="absolute">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#31ffe6]/40 via-[#fd43ad]/40 to-[#31ffe6]/30 blur-2xl opacity-90 animate-pulse"></div>
      </div>
      {/* Neon ring spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-[6px] border-t-transparent border-b-transparent border-l-[#31ffe6] border-r-[#fd43ad] rounded-full animate-spin shadow-[0_0_32px_8px_#31ffe6aa]"></div>
        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#31ffe6] via-[#fd43ad] to-[#31ffe6] blur-md opacity-80"></div>
      </div>
    </div>
  );
}
