import { useState, useEffect, useRef } from 'react';
import { audioController } from '../core/AudioController';
import { lyricSyncEngine } from '../core/LyricSyncEngine';

/**
 * useAudioPlayer
 * Connects React components to the AudioController and LyricEngine.
 */
export function useAudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [lyricState, setLyricState] = useState({ activeIndex: -1, activeLine: null, progress: 0 });

    useEffect(() => {
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);
        const onDurationChange = (d) => setDuration(d);

        const onTimeUpdate = (time) => {
            setCurrentTime(time);
            // Sync lyrics
            const state = lyricSyncEngine.sync(time);
            setLyricState(state);
        };

        audioController.on('play', onPlay);
        audioController.on('pause', onPause);
        audioController.on('ended', onEnded);
        audioController.on('durationchange', onDurationChange);
        audioController.on('timeupdate', onTimeUpdate);

        return () => {
            audioController.off('play', onPlay);
            audioController.off('pause', onPause);
            audioController.off('ended', onEnded);
            audioController.off('durationchange', onDurationChange);
            audioController.off('timeupdate', onTimeUpdate);
        };
    }, []);

    const controls = {
        load: (url, lrc) => {
            audioController.setSource(url);
            lyricSyncEngine.setLyrics(lrc);
        },
        play: () => audioController.play(),
        pause: () => audioController.pause(),
        seek: (time) => audioController.seek(time),
    };

    return { isPlaying, currentTime, duration, lyricState, controls };
}
