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
    let feedback_container = document.getElementById('feedback_container');

    let feedbackElement = createFeedbackElement(feedBackObj);
    console.log(feedbackElement);
    feedback_container.appendChild(feedbackElement);

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

function createFeedbackElement(feedBackObj){
    /*
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                </div>

                <div class="modal-body">
                    <p>This is a large modal.</p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    */
   let div_modal_fade = document.createElement('div');
   div.className="modal fade";
   div.id="feedbackModal";
   div.role="dialog";

   let div_modal_content = document.createElement('div');
   div_modal_content.className="modal-content";

   let div_modal_header = document.createElement('div');
   div_modal_header.className="modal-header";

   let close_button = document.createElement('button');
   close_button.type = "button";
   close_button.className = "close";
   
   let title_header = document.createElement('h4');
   title_header.className = "modal-title";
      
   let modal_body = document.createElement('div');
   modal_body.className = "modal-body";

   let p = document.createElement('p');
   p.innerText("This is some text");
   modal_body.appendChild(p);

      
   let modal_footer = document.createElement('div');
   modal_footer.className = "modal-footer";











   let lesson_name_h2 = document.createElement('h2');
   lesson_name_h2.innerText = feedBackObj.lesson;

   div.appendChild(lesson_name_h2);
   return div;
}