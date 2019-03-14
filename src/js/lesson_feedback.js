import { init_notation,draw_tab } from './lesson_notation';

export function processFeedbackJSON(feedBackObj){

    // console.log("feedback: " + feedBackObj.feedback);
    // console.log("lesson: " + feedBackObj.lesson);
    //console.log("lesson_note_list: " + feedBackObj.lesson_note_list);
    // console.log("lesson_timing_list: " + feedBackObj.lesson_timing_list);
    // console.log("notes_not_in_lesson: " + feedBackObj.notes_not_in_lesson);
    //console.log("user_note_list: " + feedBackObj.user_note_list);
    // console.log("user_timing_list: " + feedBackObj.user_timing_list);
    // console.log("wrong_note_indexes: " + feedBackObj.wrong_note_indexes);
    // console.log("percentage_difference: " + feedBackObj.percentage_difference);

    // console.log("lesson_string_list: " + feedBackObj.lesson_string_list);
    // console.log("user_string_list: " + feedBackObj.user_string_list);

    // console.log("lesson_fret_list: " + feedBackObj.lesson_fret_list);
    // console.log("user_fret_list: " + feedBackObj.user_fret_list);

    let total_beats_after_padding = feedBackObj.total_beats_with_padding

    let lesson_string_list = feedBackObj.lesson_string_list;
    let lesson_fret_list = feedBackObj.lesson_fret_list;
    let user_string_list = feedBackObj.user_string_list;
    let user_fret_list = feedBackObj.user_fret_list;

    let lesson_note_durations = feedBackObj.lesson_note_durations;
    let user_note_durations = feedBackObj.user_note_durations;

    //DEBUG
    //init_notation();
    draw_tab(lesson_string_list,lesson_fret_list,lesson_note_durations,total_beats_after_padding);

    

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