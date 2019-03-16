import { init_notation,draw_tab } from './lesson_notation';

export function processFeedbackJSON(feedBackObj){
    
    let user_string_list = feedBackObj.user_string_list;
    let user_fret_list = feedBackObj.user_fret_list;
    let user_note_durations = feedBackObj.user_duration_list;
    let user_total_beats = feedBackObj.total_beats;

    
    //draw user
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

//module.exports = processFeedbackJSON;