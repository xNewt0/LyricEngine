import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Maximize2, Volume2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function PlayerControls({ isPlaying, onTogglePlay, className }) {
    return (
        <div className={twMerge(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-50", // bottom-4 for small gap
            "flex items-center gap-6 px-6 py-3", // Smaller padding
            "bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full",
            "shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all",
            "hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]",
            className
        )}>

            {/* Previous */}
            <button className="group relative p-2 rounded-full hover:bg-white/5 transition-all active:scale-90">
                <SkipBack size={20} className="text-white/60 group-hover:text-white transition-colors" />
            </button>

            {/* Play/Pause Main Action */}
            <button
                onClick={onTogglePlay}
                className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg shadow-white/20"
            >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>

            {/* Next */}
            <button className="group relative p-2 rounded-full hover:bg-white/5 transition-all active:scale-90">
                <SkipForward size={20} className="text-white/60 group-hover:text-white transition-colors" />
            </button>

        </div>
    );
}
