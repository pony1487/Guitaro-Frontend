import Vex from 'vexflow';


export function init_notation(){
    let VF = Vex.Flow;


    // Create an SVG renderer and attach it to the DIV element named "boo".
    let div = document.getElementById("test_notation");

    console.log(div);
    let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Size our svg:
    renderer.resize(500, 500);

    // And get a drawing context:
    let context = renderer.getContext();
    // Create a tab stave of width 400 at position 10, 40 on the canvas.
    let stave = new VF.TabStave(10, 40, 400);
    stave.addClef("tab").setContext(context).draw();

    // let notes = [
    // // A single note
    // new VF.TabNote({
    //     positions: [{str: 3, fret: 7}],
    //     duration: "q"}),

    // // A chord with the note on the 3rd string bent
    // new VF.TabNote({
    //     positions: [{str: 2, fret: 10},
    //                 {str: 3, fret: 9}],
    //     duration: "q"}).
    // addModifier(new VF.Bend("Full"), 1),

    // // A single note with a harsh vibrato
    // new VF.TabNote({
    //     positions: [{str: 2, fret: 5}],
    //     duration: "h"}).
    // addModifier(new VF.Vibrato().setHarsh(true).setVibratoWidth(70), 0)
    // ];

    let notes = [
        new VF.TabNote({
            positions: [{str: 6, fret: 5}],
            duration: "8"}),
        new VF.TabNote({
            positions: [{str: 6, fret: 7}],
            duration: "8"}),
        new VF.TabNote({
            positions: [{str: 6, fret: 8}],
            duration: "8"}),
        new VF.TabNote({
            positions: [{str: 5, fret: 5}],
            duration: "8"}),
        new VF.TabNote({
            positions: [{str: 5, fret: 7}],
            duration: "8"}),
        new VF.TabNote({
            positions: [{str: 5, fret: 8}],
            duration: "8"}),
        new VF.TabNote({
            positions: [{str: 4, fret: 5}],
            duration: "8"}),
        new VF.TabNote({
            positions: [{str: 4, fret: 7}],
            duration: "8"})
    ];

    // Create a voice in 4/4 and add above notes
    //NOTE: the num of beats has to match number of notes
    let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(context, stave);
}