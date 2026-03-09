/**
 * LyricSyncEngine
 * Stateless logic to determine the current lyrical state based on time.
 */
export class LyricSyncEngine {
    constructor() {
        this.lyrics = [];
    }

    setLyrics(lyrics) {
        this.lyrics = lyrics;
    }

    /**
     * Returns the current state of lyrics for a given time
     * @param {number} time - Current audio time in seconds
     * @returns {object} - { activeIndex, activeLine, progress }
     */
    sync(time) {
        if (this.lyrics.length === 0) {
            return { activeIndex: -1, activeLine: null, progress: 0 };
        }

        // Find the active line
        // Since we likely play forward, we could optimize, but finding index is cheap for <100 lines.
        let activeIndex = -1;

        // Find the last line that started before current time
        for (let i = 0; i < this.lyrics.length; i++) {
            if (time >= this.lyrics[i].time) {
                activeIndex = i;
            } else {
                break;
            }
        }

        if (activeIndex === -1) {
            // Before first line
            return { activeIndex: -1, activeLine: null, progress: 0 };
        }

        const activeLine = this.lyrics[activeIndex];
        const duration = activeLine.duration || 0;

        // Calculate progress (0 to 1)
        let progress = 0;
        if (duration > 0) {
            const elapsed = time - activeLine.time;
            progress = Math.min(Math.max(elapsed / duration, 0), 1);
        }

        return {
            activeIndex,
            activeLine,
            progress
        };
    }
}

export const lyricSyncEngine = new LyricSyncEngine();
