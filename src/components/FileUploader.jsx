import React, { useRef, useState } from 'react';
import { Upload, Music, FileText, Check, Plus } from 'lucide-react';
import { clsx } from 'clsx';

export function FileUploader({ onFilesSelected }) {
    const [musicFile, setMusicFile] = useState(null);
    const [lrcFile, setLrcFile] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    const musicInputRef = useRef(null);
    const lrcInputRef = useRef(null);

    const handleMusicChange = (e) => {
        if (e.target.files?.[0]) setMusicFile(e.target.files[0]);
    };

    const handleLrcChange = (e) => {
        if (e.target.files?.[0]) setLrcFile(e.target.files[0]);
    };

    const handleApply = () => {
        if (musicFile && lrcFile) {
            onFilesSelected(musicFile, lrcFile);
            setIsOpen(false); // Auto collapse after upload
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="p-3 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
                <Plus size={20} />
            </button>
        )
    }

    return (
        <div className="flex flex-col gap-3 p-5 bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/5 w-72 shadow-2xl">
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Yeni Parça</h3>
                <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white text-xs">KAPAT</button>
            </div>

            {/* Music Input */}
            <div
                onClick={() => musicInputRef.current?.click()}
                className={clsx(
                    "group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300",
                    musicFile
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                )}
            >
                <div className={clsx("p-2 rounded-lg", musicFile ? "bg-green-500/20 text-green-400" : "bg-black/30 text-white/40")}>
                    {musicFile ? <Check size={18} /> : <Music size={18} />}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className={clsx("text-sm font-medium truncate", musicFile ? "text-green-100" : "text-white/70")}>
                        {musicFile ? musicFile.name : "Ses Dosyası (.mp3)"}
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-wide">
                        {musicFile ? "Yüklendi" : "Seçmek için tıkla"}
                    </span>
                </div>
                <input type="file" accept="audio/*" ref={musicInputRef} onChange={handleMusicChange} className="hidden" />
            </div>

            {/* LRC Input */}
            <div
                onClick={() => lrcInputRef.current?.click()}
                className={clsx(
                    "group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300",
                    lrcFile
                        ? "bg-blue-500/10 border-blue-500/30"
                        : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                )}
            >
                <div className={clsx("p-2 rounded-lg", lrcFile ? "bg-blue-500/20 text-blue-400" : "bg-black/30 text-white/40")}>
                    {lrcFile ? <Check size={18} /> : <FileText size={18} />}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className={clsx("text-sm font-medium truncate", lrcFile ? "text-blue-100" : "text-white/70")}>
                        {lrcFile ? lrcFile.name : "Söz Dosyası (.lrc)"}
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-wide">
                        {lrcFile ? "Yüklendi" : "Seçmek için tıkla"}
                    </span>
                </div>
                <input type="file" accept=".lrc,.txt" ref={lrcInputRef} onChange={handleLrcChange} className="hidden" />
            </div>

            {/* Apply Button */}
            <button
                onClick={handleApply}
                disabled={!musicFile || !lrcFile}
                className={clsx(
                    "mt-2 w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all transform",
                    musicFile && lrcFile
                        ? "bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10"
                        : "bg-white/5 text-white/20 cursor-not-allowed"
                )}
            >
                BAŞLAT
            </button>
        </div>
    );
}
