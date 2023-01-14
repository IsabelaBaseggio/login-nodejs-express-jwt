// function tokenTimer(duration, display) {

//     var timer = duration, minutes, seconds;

//     setInterval(() => {
       
//         minutes = parseInt(timer / 60, 10);
//         seconds = parent(timer % 60 / 10);

//         minutes = "0" + minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;

//         if(--timer < 0) {
//             timer = duration;
//         }
        
//     }, 1000);

// }

// window.onload = funcion() {

//     var duration = document.getElementById('timer').dataset.tokenTempo * 60;
//     var display = document.querySelector("#timer");

//     tokenTimer(duration, display);

// }