import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { PlayerControls } from './components/PlayerControls';
import { LyricStage } from './components/LyricStage';
import { FileUploader } from './components/FileUploader';
import { ThemeSelector, THEMES } from './components/ThemeSelector';
import { LRCParser } from './core/LRCParser';

// Sample Data
const SAMPLE_MP3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const SAMPLE_LRC = `
[00:00.00] ...
[00:05.12] Yolculuk başlıyor
[00:08.50] Sessizliğin içinden geçiyoruz
[00:12.30] Işıklar sönüyor yavaşça
[00:16.80] Ve derinlere sürükleniyoruz
[00:21.00] Neon gecenin içine
[00:25.50] Gölgelerin canlandığı yere
[00:30.00] (Müzik Arası)
[00:35.00] Duyuyor musun kullanıcının sesini?
[00:39.00] Boşlukta fısıldıyor usulca
[00:43.00] Dijital bir rüyanın yankıları
[00:48.00] Gerçeği kodlarken, şüphe yok
`;

function App() {
  const { isPlaying, lyricState, controls } = useAudioPlayer();
  const [parsedLyrics, setParsedLyrics] = useState([]);

  // Theme & Font State
  const [currentThemeId, setCurrentThemeId] = useState('black');
  const [currentFontId, setCurrentFontId] = useState('bold'); // Bold is default

  // Derived Theme Data
  const theme = THEMES[currentThemeId] || THEMES.black;

  useEffect(() => {
    const lyrics = LRCParser.parse(SAMPLE_LRC);
    setParsedLyrics(lyrics);
    controls.load(SAMPLE_MP3, lyrics);
  }, []);

  const handleFilesSelected = (musicFile, lrcFile) => {
    const objectUrl = URL.createObjectURL(musicFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const lrcContent = e.target.result;
      const lyrics = LRCParser.parse(lrcContent);
      setParsedLyrics(lyrics);
      controls.load(objectUrl, lyrics);
      controls.play();
    };
    reader.readAsText(lrcFile);
  };

  return (
    <div
      className="w-full h-screen overflow-hidden relative font-sans selection:bg-white/20 transition-colors duration-1000"
      style={{ backgroundColor: theme.background }}
    >
      {/* Dynamic Background */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${theme.gradient} opacity-50 blur-3xl pointer-events-none transition-all duration-1000`}
      />

      {/* Top Left Uploader */}
      <div className="absolute top-6 left-6 z-40">
        <FileUploader onFilesSelected={handleFilesSelected} />
      </div>

      {/* Top Right Theme Selector */}
      <ThemeSelector
        currentTheme={currentThemeId}
        onThemeChange={setCurrentThemeId}
        currentFont={currentFontId}
        onFontChange={setCurrentFontId}
      />

      {/* Main Stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <LyricStage
          lyrics={parsedLyrics}
          lyricState={lyricState}
          theme={currentThemeId}
          fontStyle={currentFontId}
        />
      </div>

      {/* Bottom Controls */}
      <PlayerControls
        isPlaying={isPlaying}
        onTogglePlay={() => (isPlaying ? controls.pause() : controls.play())}
      />
    </div>
  );
}

export default App;
