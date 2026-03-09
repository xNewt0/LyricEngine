import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { THEMES, FONTS } from './ThemeSelector';

export function LyricStage({ lyrics, lyricState, theme = 'black', fontStyle = 'bold' }) {
    const { activeIndex } = lyricState;
    const currentTheme = THEMES[theme] || THEMES.black;
    const currentFont = FONTS[fontStyle] || FONTS.bold;

    // Entry direction patterns - variety of directions
    const getEntryOrigin = (index) => {
        const patterns = [
            { originX: 0, originY: -120 },     // From top
            { originX: -150, originY: 0 },     // From left
            { originX: 0, originY: 120 },      // From bottom
            { originX: 150, originY: 0 },      // From right
            { originX: -100, originY: -80 },   // Diagonal top-left
            { originX: 100, originY: -80 },    // Diagonal top-right
            { originX: -100, originY: 80 },    // Diagonal bottom-left
            { originX: 100, originY: 80 },     // Diagonal bottom-right
        ];
        return patterns[index % patterns.length];
    };

    // Only render the active line - forces remount on each change
    const activeLine = lyrics[activeIndex];

    if (!activeLine) {
        return (
            <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none px-4 md:px-8">
                <div className="text-white/30 text-2xl">Müzik için oynat tuşuna basın</div>
            </div>
        );
    }

    const { originX, originY } = getEntryOrigin(activeIndex);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none px-4 md:px-8">

            <div className="relative w-full max-w-6xl h-[60vh] flex flex-col items-center justify-center">

                <div className="relative w-full flex flex-col gap-6 md:gap-10 items-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeIndex} // Forces remount on each line change
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                                x: originX,
                                y: originY,
                                filter: 'blur(16px)',
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1.05,
                                x: 0,
                                y: 0,
                                filter: 'blur(0px)',
                                color: currentTheme.text,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.2,
                                filter: 'blur(20px)',
                                y: -60,
                                transition: { duration: 0.2, ease: "easeIn" }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 22,
                                mass: 1
                            }}
                            className="w-full flex justify-center transform-gpu will-change-transform text-center"
                            style={{
                                textShadow: `0 0 50px ${currentTheme.accent}60, 0 0 100px ${currentTheme.accent}30`
                            }}
                        >
                            <span className={clsx(
                                "block leading-tight tracking-tight transition-all duration-300 max-w-full",
                                currentFont.className,
                                "text-5xl md:text-7xl lg:text-8xl"
                            )}
                                style={{
                                    textWrap: 'balance',
                                    wordBreak: 'keep-all',
                                }}
                            >
                                {activeLine.text}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
