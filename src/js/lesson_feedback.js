/*
{ 
    feedback: [], 
    lesson: "A_minor_scale_frag_1_LESSON.wav", 
    lesson_note_list: (7) […], 
    lesson_timing_list: (7) […], 
    notes_not_in_lesson: [], 
    percentage_difference: [], 
    user_note_list: [], 
    user_timing_list: [], 
    wrong_note_indexes: [] }

*/


export function processFeedbackJSON(feedBackObj){
    console.log("feedback: " + feedBackObj.feedback);
    console.log("lesson: " + feedBackObj.lesson);
    console.log("lesson_note_list: " + feedBackObj.lesson_note_list);
    console.log("lesson_timing_list: " + feedBackObj.lesson_timing_list);
    console.log("notes_not_in_lesson: " + feedBackObj.notes_not_in_lesson);
    console.log("user_note_list: " + feedBackObj.user_note_list);
    console.log("user_timing_list: " + feedBackObj.user_timing_list);
    console.log("wrong_note_indexes: " + feedBackObj.wrong_note_indexes);
    console.log("percentage_difference: " + feedBackObj.percentage_difference);

}