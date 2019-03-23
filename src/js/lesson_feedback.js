import { init_notation,draw_tab } from './lesson_notation';

export function processFeedbackJSON(feedBackObj){
    
    let user_string_list = feedBackObj.user_string_list;
    let user_fret_list = feedBackObj.user_fret_list;
    let user_note_durations = feedBackObj.user_duration_list;
    let user_total_beats = feedBackObj.total_beats;

    
    //draw user
    test_canvas();
    draw_tab(user_string_list,user_fret_list,user_note_durations,user_total_beats,"user_notation");
    

    // let lesson_name_p = document.getElementById('lesson_name');
    // let lesson_bpm_p = document.getElementById('lesson_bpm');
    // let lesson_feedback_p = document.getElementById('lesson_feedback');
    // let lesson_note_duration_p = document.getElementById('lesson_note_duration');
    // let user_note_duration_p = document.getElementById('user_note_duration');
    // let timing_difference_p = document.getElementById('timing_difference');
    // let wrong_notes_played_p = document.getElementById('wrong_notes_played');
    
    // lesson_name_p.textContent = "Lesson Name: " +  feedBackObj.lesson;
    // lesson_bpm_p.textContent = "Lesson BPM: " +  feedBackObj.lesson_tempo;
    // lesson_feedback_p.textContent = "Feedback: " +  feedBackObj.feedBackObj;
    // lesson_note_duration_p.textContent = "Lesson Note Durations: " + feedBackObj.lesson_note_durations;
    // user_note_duration_p.textContent = "Your Note Durations: " +  feedBackObj.user_note_durations;
    // timing_difference_p.textContent = "Timing Difference: " + feedBackObj.percentage_difference;
    // wrong_notes_played_p.textContent = "Wrong Notes Played: " + feedBackObj.notes_not_in_lesson;

}

function test_canvas(){
    let num_of_notes = 6;

    //These were eyeballed as the Tab stave from vexflow starts in the middle of the canvas somewhere
    let y_pos_of_high_e = 92;
    let y_pos_of_low_e = 157;

    // the width of the stave is 450.
    let width = 450;
    let height = y_pos_of_low_e - y_pos_of_high_e;
 

    let x_position_diff = width / num_of_notes;
    let string = height / 6;

    let string_coordinates = {}

    let start_string_coordinate = y_pos_of_high_e;
    let string_number = 1;
    for(let i =0;i < 6;i++){
        string_coordinates[string_number] = start_string_coordinate;
        start_string_coordinate += string;
        string_number++;
    }

    console.log(string_coordinates);

    let canvas = document.getElementById("userNotationCanvas");
    let ctx = canvas.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.fillStyle = "red";

    let x_pos = 45;
    let y_pos_start = 150;

    //ctx.fillRect(x_pos,157,15,15); 
    //ctx.fillRect(x_pos,92,15,15); 



    let test_string_nums = [6,6,5,5,4,4];

    for(let i = 0; i < num_of_notes;i++){
        let string_played = test_string_nums[i];
        //console.log(string_played);
        let y_pos = string_coordinates[string_played];
        
        ctx.fillRect(x_pos,y_pos,15,15); 
        x_pos += x_position_diff;
    }
}

//module.exports = processFeedbackJSON;