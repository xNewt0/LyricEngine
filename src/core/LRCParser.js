/**
 * LRCParser
 * Parses LRC format strings into structured lyric objects.
 * Supports standard [mm:ss.xx] format.
 */
export class LRCParser {
    static parse(lrcString) {
        if (!lrcString) return [];

        const lines = lrcString.split('\n');
        const lyrics = [];
        const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

        for (const line of lines) {
            const match = timeRegex.exec(line);
            if (match) {
                const minutes = parseInt(match[1], 10);
                const seconds = parseInt(match[2], 10);
                const milliseconds = parseInt(match[3].padEnd(3, '0'), 10); // Handle 2 or 3 digit ms

                const time = minutes * 60 + seconds + milliseconds / 1000;
                const text = line.replace(timeRegex, '').trim();

                if (text) {
                    lyrics.push({ time, text });
                }
            }
        }

        // Sort by time just in case
        lyrics.sort((a, b) => a.time - b.time);

        // Calculate durations
        for (let i = 0; i < lyrics.length; i++) {
            if (i < lyrics.length - 1) {
                lyrics[i].duration = lyrics[i + 1].time - lyrics[i].time;
            } else {
                lyrics[i].duration = 5; // Default duration for last line
            }
        }

        return lyrics;
    }
}
