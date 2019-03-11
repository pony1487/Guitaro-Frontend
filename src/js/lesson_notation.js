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

export function draw_tab(lesson_string_list,lesson_fret_list,user_string_list,user_fret_list){
    //console.log(lesson_string_list);
    console.log(lesson_fret_list);
    //console.log(user_string_list);
    //console.log(user_fret_list);

    //The lesson arrays(frets and strings) are the same size. Same for the user arrays
    let len = lesson_fret_list.length;

    let lesson_notation = document.getElementById("lesson_notation");
    let notationDrawer = new NotationDrawer(lesson_notation);

    for(let i = 0; i < len; i++){
        //console.log(lesson_fret_list[i])

        let str = lesson_string_list[i];
        let fret = lesson_fret_list[i];

        let str_num = string_note_to_number_mapping[str];
        let tab_note ={
            positions: [{str: str_num, fret: fret}],
            duration: "8"
        }

        //console.log(tab_note.positions[0]);
        notationDrawer.setNotes(tab_note);
    }

    notationDrawer.createVoice();
    notationDrawer.formatAndJustify();
    notationDrawer.render();


}
/*
for(let i = 0; i <  strings.length;i++){
	let key = strings[i]
  console.log(key);
	console.log(string_note_to_number_mapping[key]);
}

*/
/*
This is what is sent from server:
    "user_note_list": [
        "A",
        "C",
        "D",
        "E",
        "G"
    ],
    "user_string_list": [
        "E",
        "E",
        "A",
        "A",
        "D"
*/

let string_note_to_number_mapping = {
    E: 6,
    A: 5,
    D: 4,
    G: 3,
    B: 2,
    e: 1 
}