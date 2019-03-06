import Vex from 'vexflow';

class NotationDrawer{
    constructor(lesson_notation) {
        this.div = lesson_notation
        this.VF = Vex.Flow;
        this.x = 500;
        this.y = 200;
        this.renderer = new this.VF.Renderer(this.div, this.VF.Renderer.Backends.SVG);
        this.renderer.resize(this.x, this.y);

        this.context = this.renderer.getContext();
        this.stave = new this.VF.TabStave(10, 40, 400);
        this.stave.addClef("tab").setContext(this.context).draw();

        this.notes = [];
        this.voice;
        this.formatter;
    }

    setNotes(tab_note){
        //Append ONE tab_note.Call it while there is notes left
        let vf_tab_note = new this.VF.TabNote(tab_note);
        this.notes.push(vf_tab_note);
    }

    createVoice(){
        // Create a voice in 4/4 and add notes
        //NOTE: the num of beats has to match number of notes
        this.voice = new this.VF.Voice({num_beats: 4,  beat_value: 4});
        this.voice.addTickables(this.notes);

    }

    formatAndJustify(){
        // Format and justify the notes to 400 pixels.
        this.formatter = new this.VF.Formatter().joinVoices([this.voice]).format([this.voice], 400);
    }

    render(){
        // Render voice
        this.voice.draw(this.context, this.stave);
    }
}

export function init_notation(){

    let lesson_notation = document.getElementById("lesson_notation");
    let notationDrawer = new NotationDrawer(lesson_notation);

    for(let i = 0; i < 8; i++){
        let tab_note ={
            positions: [{str: 6, fret: 5}],
            duration: "8"
        }

        notationDrawer.setNotes(tab_note);
    }

    notationDrawer.createVoice();
    notationDrawer.formatAndJustify();
    notationDrawer.render();
}