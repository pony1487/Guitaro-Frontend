import testImage from "./test_tab_image.jpg";

export function createLessonContainer(){
    /*
    <div id="lesson-container" class="container">
        <h2>Lesson Name</h2>
        <img src="..." class="img-fluid" alt="Responsive image">
        <button type="button" class="btn btn-default">Play</button>
        <button type="button" class="btn btn-default">Stop</button>
        <button type="button" class="btn btn-default">Record</button>
        <button type="button" class="btn btn-default">StopRecording</button>
    </div>
    */
    let lesson_container = document.createElement('div');
    let h2 = document.createElement('h2');
    h2.innerText = "LESSON TEST";
    lesson_container.appendChild(h2);

    let lesson_image = new Image();
    lesson_image.src = testImage;
    lesson_image.className ="img-fluid";
    lesson_image.alt ="Responsive Lesson Image";
    lesson_container.appendChild(lesson_image);

    let br = document.createElement('br');
    lesson_container.appendChild(br);
    
    let play_button = document.createElement('btn');
    play_button.className = "btn btn-default";
    play_button.textContent = "Play";
    play_button.id="play_button";
    lesson_container.appendChild(play_button);

    let stop_button = document.createElement('btn');
    stop_button.className = "btn btn-default";
    stop_button.textContent = "Stop Playing";
    stop_button.id="stop_button";
    lesson_container.appendChild(stop_button);

    let record_button = document.createElement('btn');
    record_button.className = "btn btn-default";
    record_button.textContent = "Record";
    record_button.id="record_button";
    record_button.disabled = false;
    lesson_container.appendChild(record_button);

    let stop_recording_button = document.createElement('btn');
    stop_recording_button.className = "btn btn-default";
    stop_recording_button.textContent = "Stop Recording";
    stop_recording_button.id="stop_recording_button";
    lesson_container.appendChild(stop_recording_button);

    return lesson_container;
}