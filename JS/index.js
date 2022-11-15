
let hours = document.getElementById("hours");           //fetching the elements through HTML for getting hour time
let minutes = document.getElementById("minutes");       //minutes
let seconds = document.getElementById("seconds");       //seconds
let ampm = document.getElementById("ampm");             //time of the day 

let timeMenu = document.querySelectorAll('select');     //time options
let alarmList;
let alarmTime;
let ringTone = new Audio('../audio/ringtone.mp3');      // setting a ringtone 
let isAlarmSet = false;


let startBtn = document.getElementById('start');        //button to start alarm
let resetBtn = document.getElementById('stop');          //button to reset the alarm/sto the alarm




// creating a function to add a live clock 
function liveCLock() {

    const date = new Date();


    let hour = (date.getHours());
    let mins = (date.getMinutes());
    let secs = (date.getSeconds());
    let ampms = 'AM';
    // console.log(hour);
    // console.log(mins);
    // console.log(secs);
    // console.log(ampms);

    if (hour > 12) {
        hour = hour - 12;
        // console.log(hour);
        ampms = 'PM';
    }
    else if (hour == 0) {
        hour = 12;
    } else {
        ampms = 'AM';
    }

    hour = hour < 10 ? "0" + hour : hour;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    // console.log(hour);


    hours.innerText = `${hour}`;
    minutes.innerText = `${mins}`;
    seconds.innerText = `${secs}`;
    ampm.innerText = `${ampms}`;

    const currentTime = `${hour}:${mins}:${secs}:${ampms}`;
    //console.log(currentTime);


    // checking if the alarm time is equal to the current time to ring alarm
    if (alarmTime == currentTime) {
        console.log('alarm ringing...');
        window.alert('alarm ringing');
        ringTone.play();
        ringTone.loop = true;
        let div2 = document.getElementById('listDiv');
        alarmList.removeChild(div2);
    }

};


// looping around the hours minutes seconds and time of day(am/pm) to add as options in select tag
for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option> ${i} </option>`;
    timeMenu[0].firstElementChild.insertAdjacentHTML("beforebegin", options);

}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option> ${i} </option>`;
    timeMenu[1].firstElementChild.insertAdjacentHTML("beforebegin", options);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let options = `<option> ${i} </option>`;
    timeMenu[2].firstElementChild.insertAdjacentHTML("beforebegin", options);
}

for (let i = 2; i > 0; i--) {
    let tOD = i == 1 ? 'AM' : 'PM';
    let options = `<option> ${tOD} </option>`;
    timeMenu[3].firstElementChild.insertAdjacentHTML("beforebegin", options);
}


setInterval(liveCLock, 1000);               


// adding function to set an alarm if not already selected
function setAlarm() {
    if (isAlarmSet) {                               //if true
        alarmTime = "";                             // clear alarm time
        ringTone.pause();                            //  pause the ringtone        
        startBtn.innerText = "Set Alarm";               
        return isAlarmSet = false;                      // set alarm to false if alarm is set

    }


    let time = `${timeMenu[0].value}:${timeMenu[1].value}:${timeMenu[2].value}:${timeMenu[3].value}`
    //console.log(time);

    //throw an error or alert if time is not selected from th options
    if (time.includes("hours") || time.includes('minutes') || time.includes('seconds') || time.includes('ampm')) {
        return alert('please select the time to set an alarm');
    }
    alarmTime = time;
    isAlarmSet = true;

    //adding style through css after alarm is set 
    
    startBtn.innerText = "stop alarm";

    // creating a list of alarms set on runtime
    alarmList = document.getElementById('alarms-List');
    let div = document.createElement('div');
    div.setAttribute('id', 'listDiv');
    div.style.border = "2px solid white"


    let list = document.createElement('p');
    list.innerText = alarmTime;
    console.log(list);
    div.appendChild(list)
    alarmList.appendChild(div);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute('id', 'deleteBtn');
    deleteButton.style.height = '22px';
    deleteButton.style.width = '20%';
    deleteButton.innerText = 'Delete Alarm'
    deleteButton.style.cursor = "pointer";

    
    
    div.appendChild(deleteButton)
    alarmList.appendChild(div);
   
    
    // function to remove the alarm from list
    deleteButton.addEventListener('click', function(){
        console.log('delete pressed');
        alarmList.removeChild(div);
        alarmTime = "";                             
        ringTone.pause();                                      
        startBtn.innerText = "Set Alarm";               
        return isAlarmSet = false;   
    })
    
     

}
// adding click events to run when alarm is set and when is alarm is cleared
startBtn.addEventListener('click', setAlarm);



// event function to reset/stop alarm
resetBtn.addEventListener('click', function () {

    timeMenu[0].value = 'hours';
    timeMenu[1].value = 'minutes';
    timeMenu[2].value = 'seconds';
    timeMenu[3].value = 'am/pm';
    return isAlarmSet = false;
    

});
