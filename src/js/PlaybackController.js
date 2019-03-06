class PlaybackController {
    constructor() {
        this.playbackAudioContext = new AudioContext();
        this.audioBuffer;
        this.source;
    }

    setAudioBuffer(audioBuffer){
        this.audioBuffer = audioBuffer;
    }
    printAudioBuffer(){
        console.log(this.audioBuffer);
    }

    getAudioContext(){
        return this.playbackAudioContext;
    }

    playAudio(){
        //const source = this.playbackAudioContext.createBufferSource();
        this.source = this.playbackAudioContext.createBufferSource();
        this.source.buffer = this.audioBuffer;
        this.source.connect(this.playbackAudioContext.destination);
        this.source.start();
    }

    stopAudio(){
        if(!this.source.stop){
            this.source.stop = source.noteOff;
        }
        this.source.stop(0);
    }

    pauseAudio(){
    if(this.playbackAudioContext.state == 'running'){
        this.playbackAudioContext.suspend()
        return "suspended";
    }
    else if(this.playbackAudioContext.state == 'suspended'){
        this.playbackAudioContext.resume();
        return "running";
    }
    }
}

module.exports = PlaybackController;


