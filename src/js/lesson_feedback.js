/*
{ 
{
    "feedback": [],
    "lesson": "4_note_test-60.wav",
    "lesson_note_durations": [    ],
    "lesson_note_list": [],
    "lesson_tempo": 60,
    "lesson_timing_list": [],
    "notes_not_in_lesson": [],
    "percentage_difference": [],
    "user_note_durations": [],
    "user_note_list": [],
    "user_timing_list": [],
    "wrong_note_indexes": []
}


{
    "feedback": [],
    "lesson": "4_note_test-60.wav",
    "lesson_note_durations": [
        "quarter",
        "quarter",
        "quarter"
    ],
    "lesson_note_list": [
        "A"
    ],
    "lesson_tempo": 60,
    "lesson_timing_list": [
        0.09591836482286453,
        1.0579818487167358,
        2.0519728660583496,
        3.0722901821136475
    ],
    "notes_not_in_lesson": [
        "G#",
        "C#",
        "C",
        "Bb",
        "Eb",
        "F#"
    ],
    "percentage_difference": [
        420.7092309311559,
        222.7961480541679,
        149.58890841654275,
        78.34494621693312
    ],
    "user_note_durations": [
        "half",
        "half",
        "sixteen",
        "quarter",
        "quarter",
        "quarter",
        "quarter",
        "eight",
        "sixteen",
        "quarter",
        "quarter"
    ],
    "user_note_list": [
        "A",
        "C",
        "C#",
        "Eb",
        "F#",
        "G#",
        "F#",
        "Eb",
        "C#",
        "Bb"
    ],
    "user_timing_list": [
        0.4994557797908783,
        3.4151246547698975,
        5.121496677398682,
        5.479274272918701,
        6.447483062744141,
        7.329909324645996,
        8.283378601074219,
        9.505941390991211,
        10.000408172607422,
        10.063152313232422,
        11.370136260986328,
        12.71417236328125
    ],
    "wrong_note_indexes": []
}


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

    let lesson_name_p = document.getElementById('lesson_name');
    let lesson_bpm_p = document.getElementById('lesson_bpm');
    let lesson_feedback_p = document.getElementById('lesson_feedback');
    let lesson_note_duration_p = document.getElementById('lesson_note_duration');
    let user_note_duration_p = document.getElementById('user_note_duration');
    let timing_difference_p = document.getElementById('timing_difference');
    let wrong_notes_played_p = document.getElementById('wrong_notes_played');
    
    lesson_name_p.textContent = "Lesson Name: " +  feedBackObj.lesson;
    lesson_bpm_p.textContent = "Lesson BPM: " +  feedBackObj.lesson_tempo;
    lesson_feedback_p.textContent = "Feedback: " +  feedBackObj.feedBackObj;
    lesson_note_duration_p.textContent = "Lesson Note Durations: " + feedBackObj.lesson_note_durations;
    user_note_duration_p.textContent = "Your Note Durations: " +  feedBackObj.user_note_durations;
    timing_difference_p.textContent = "Timing Difference: " + feedBackObj.percentage_difference;
    wrong_notes_played_p.textContent = "Wrong Notes Played: " + feedBackObj.notes_not_in_lesson;


}