/**
 * AudioController
 * Wraps HTML5 Audio to provide a clean API and high-precision time updates
 * using requestAnimationFrame for smoother lyric syncing.
 */
class AudioController {
    constructor() {
        this.audio = new Audio();
        this.audio.preload = 'auto';
        this.isPlaying = false;
        this.rafId = null;

        // Event listeners storage
        this.listeners = {
            timeupdate: [],
            play: [],
            pause: [],
            ended: [],
            durationchange: [],
        };

        // Bind methods
        this.tick = this.tick.bind(this);
        this.onAudioPlay = this.onAudioPlay.bind(this);
        this.onAudioPause = this.onAudioPause.bind(this);
        this.onAudioEnded = this.onAudioEnded.bind(this);

        // native events
        this.audio.addEventListener('play', this.onAudioPlay);
        this.audio.addEventListener('pause', this.onAudioPause);
        this.audio.addEventListener('ended', this.onAudioEnded);
        this.audio.addEventListener('durationchange', () => this.emit('durationchange', this.audio.duration));
    }

    setSource(url) {
        this.audio.src = url;
        this.audio.load();
    }

    play() {
        return this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    seek(time) {
        this.audio.currentTime = time;
    }

    get currentTime() {
        return this.audio.currentTime;
    }

    get duration() {
        return this.audio.duration || 0;
    }

    // Event System
    on(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }

    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
    }

    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }

    // Internal Logic
    onAudioPlay() {
        this.isPlaying = true;
        this.emit('play');
        this.startLoop();
    }

    onAudioPause() {
        this.isPlaying = false;
        this.emit('pause');
        this.stopLoop();
    }

    onAudioEnded() {
        this.isPlaying = false;
        this.emit('ended');
        this.stopLoop();
    }

    startLoop() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
        this.tick();
    }

    stopLoop() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }

    tick() {
        if (!this.isPlaying) return;

        this.emit('timeupdate', this.audio.currentTime);
        this.rafId = requestAnimationFrame(this.tick);
    }

    destroy() {
        this.stopLoop();
        this.audio.pause();
        this.audio.removeEventListener('play', this.onAudioPlay);
        this.audio.removeEventListener('pause', this.onAudioPause);
        this.audio.removeEventListener('ended', this.onAudioEnded);
        this.audio.src = '';
    }
}

export const audioController = new AudioController();
