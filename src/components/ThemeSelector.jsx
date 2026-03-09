import React from 'react';
import { Palette, Type } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export const THEMES = {
    black: {
        id: 'black',
        label: 'Karanlık',
        background: '#000000',
        surface: '#0a0a0a',
        text: '#ffffff',
        accent: '#ffffff',
        gradient: 'from-white/10 via-transparent to-transparent'
    },
    klasik: {
        id: 'klasik',
        label: 'Klasik',
        background: '#120a04', // Darker but richer
        surface: '#1f1208',
        text: '#fff8f0',
        accent: '#a85510', // Brighter, more visible amber
        gradient: 'from-[#a85510]/30 via-transparent to-transparent'
    },
    navy: {
        id: 'navy',
        label: 'Derin Mavi',
        background: '#060c18', // Slightly more blue visible
        surface: '#0c1428',
        text: '#e6f0ff',
        accent: '#4d8cff', // Brighter blue
        gradient: 'from-[#4d8cff]/25 via-transparent to-transparent'
    },
    emerald: {
        id: 'emerald',
        label: 'Zümrüt',
        background: '#051008', // Richer green base
        surface: '#0a1c10',
        text: '#e6fff0',
        accent: '#3db87a', // Brighter emerald
        gradient: 'from-[#3db87a]/25 via-transparent to-transparent'
    }
};

export const FONTS = {
    bold: { id: 'bold', label: 'Kalın (Varsayılan)', className: 'font-black' },
    elegant: { id: 'elegant', label: 'Zarif', className: 'font-semibold italic' }
};

export function ThemeSelector({ currentTheme, onThemeChange, currentFont, onFontChange }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="absolute top-6 right-6 z-50 flex flex-col items-end gap-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-all hover:scale-105 hover:rotate-90 active:scale-95 duration-500"
            >
                <Palette size={20} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="flex flex-col gap-3 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl min-w-[200px]"
                    >
                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest pl-1">Tema</span>

                        <div className="flex flex-col gap-1">
                            {Object.values(THEMES).map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => onThemeChange(theme.id)}
                                    className={clsx(
                                        "flex items-center gap-3 p-2.5 rounded-lg transition-all text-sm font-medium",
                                        currentTheme === theme.id
                                            ? "bg-white/10 text-white shadow-inner"
                                            : "text-white/50 hover:bg-white/5 hover:text-white/80"
                                    )}
                                >
                                    <div
                                        className="w-4 h-4 rounded-full border border-white/20"
                                        style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}80` }}
                                    />
                                    {theme.label}
                                </button>
                            ))}
                        </div>

                        <div className="h-px bg-white/10 my-1" />

                        <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest pl-1">Yazı Tipi</span>
                        <div className="flex flex-col gap-1">
                            {Object.values(FONTS).map(font => (
                                <button
                                    key={font.id}
                                    onClick={() => onFontChange(font.id)}
                                    className={clsx(
                                        "flex items-center gap-3 p-2.5 rounded-lg transition-all text-sm",
                                        font.className,
                                        currentFont === font.id
                                            ? "bg-white/10 text-white"
                                            : "text-white/50 hover:bg-white/5"
                                    )}
                                >
                                    <Type size={14} />
                                    <span>{font.label}</span>
                                </button>
                            ))}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
