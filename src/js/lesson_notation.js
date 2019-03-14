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

    printNotes(){
        for(let i = 0; i < this.notes.length; i++){
            console.log(this.notes[i].positions);
            console.log(this.notes[i].duration);
        }

    }

    createVoice(beat_count){
        // Create a voice in 4/4 and add notes
        //NOTE: the num of beats has to match number of notes
        try{
            this.voice = new this.VF.Voice({num_beats: beat_count,  beat_value: 4});
            this.voice.addTickables(this.notes);
            this.voice.setStrict(false);
        }catch(err){
            console.log(err);
        }

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

export function draw_tab(lesson_string_list,lesson_fret_list,lesson_note_durations,total_beats_after_padding){
    console.log("lesson_string_list: " + lesson_string_list);
    console.log("lesson_fret_list: " + lesson_fret_list);
    console.log("lesson_note_durations: " + lesson_note_durations);

    let lesson_note_durations_length = lesson_note_durations.length;
    let lesson_notation = document.getElementById("lesson_notation");
    let lesson_fret_list_length = lesson_fret_list.length;

    let notationDrawer = new NotationDrawer(lesson_notation);

    let total_beats = 0;

    for(let i = 0; i < lesson_note_durations_length; i++){
        //console.log(lesson_fret_list[i])

        // get the notes played. else draw the padding
        if (i < lesson_fret_list_length){
            let str = lesson_string_list[i];
            let fret = lesson_fret_list[i];
            let note_duration = lesson_note_durations[i];
    
            let str_num = string_note_to_number_mapping[str];
            let dur = duration_mapping[note_duration]
    
            let tab_note ={
                positions: [{str: str_num, fret: fret}],
                duration: dur
            }
    
            //total_beats += dur / 4;
            console.log("total_beats: " + total_beats);
            //console.log(tab_note.positions);
            //console.log(tab_note.duration);
            notationDrawer.setNotes(tab_note);

        }
        else{
            // let dur = duration_mapping[lesson_note_durations[i]];
            // let tab_note ={
            //     positions: [{str: 0, fret: 0}],
            //     // Make it a rest
            //     duration: dur + "r"
            // }
            // notationDrawer.setNotes(tab_note);
        }

    }
    notationDrawer.printNotes()
    
    notationDrawer.createVoice(total_beats_after_padding);
    notationDrawer.formatAndJustify();
    notationDrawer.render();


}

let string_note_to_number_mapping = {
    E: 6,
    A: 5,
    D: 4,
    G: 3,
    B: 2,
    e: 1 
}

//for tab_note
let duration_mapping = {
    whole:"1", 
    half:"2", 
    quarter:"4", 
    eight:"8", 
    sixteenth:"16",
    thiry_second: "32"
}

let beat_count = {
    whole:"4", 
    half:"2", 
    quarter:"1", 
    eight:"0.5", 
    sixteenth:"0.25",
    thiry_second: "0.125"
}