let i = 0;
let previousProgress = 0;

function dltButton(parent_element) {
    let btn = document.createElement("button");
    btn.setAttribute("class","dlt_btn");
    btn.textContent = "Delete";
    btn.addEventListener("click",
        ()=>{
        parent_element.remove();
        updateProgress();
    });
    parent_element.appendChild(btn);
}
function createTask(){
    let a = document.getElementById("task");
    if(a.value.trim() === ""){
        alert("Task cannot be empty !");
        return;
    }
    let b = document.createElement("input");
    let c = document.createElement("label");
    let d = document.createElement("div");
    d.setAttribute("class","list_items");
    dltButton(d);
    let e = document.querySelector(".listbox");
    c.textContent=a.value;
    a.value=""
    b.setAttribute("type","checkbox");
    b.setAttribute("for",i);
    b.setAttribute("class","input_list")
    b.setAttribute("id","checkbox");
    b.addEventListener("change", updateProgress);
    c.setAttribute("for",i);
    d.appendChild(b);
    d.appendChild(c);
    e.appendChild(d);
    i=i+1;
    updateProgress();
}

let task = document.getElementById("task");
task.addEventListener("keydown",
    (e)=>{
        if(e.key==="Enter"){
            createTask();
            task.blur();
        }
    }
);

function updateProgress(){
    let number = document.getElementById("number");
    let tasknumber = document.getElementById("tasknumber");
    let counter = previousProgress;
    let checkboxes = document.querySelectorAll(".input_list");
    let completed = 0;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked)
            completed++;
    });
    let totalTasks = checkboxes.length;
    let progress;
    if (totalTasks > 0) {
        progress = Math.round((completed / totalTasks) * 100);

    }
    else{
        progress = 0;
    }
    tasknumber.innerHTML = completed+" / "+totalTasks;
    previousProgress = progress;
    showMessage(totalTasks,completed);
    if(counter<progress){
        setInterval(() => {
            if (counter < progress) {
                counter++;
                number.innerHTML = counter + "%";
            }
            else{
                clearInterval();
            }
        }, 25);
    }
    else if(counter>progress){
        setInterval(() => {
            if(counter>progress){
                counter--;
                number.innerHTML = counter + "%";
            }
            else{
                clearInterval();
            }
        }, 25);    
    }
    else{
        number.innerHTML = 0 + "%";
    }

    let stroke_offset= 472 - (472*progress/100);
    let circleProgress=document.querySelector("circle");
    circleProgress.style.strokeDashoffset = stroke_offset;
}

function showMessage(totalTasks,completed){
    let message = document.querySelector("#message");
    let progressPercentage = Math.round((completed / totalTasks) * 100);
    if(totalTasks==0){
        message.innerHTML="Woo hoo, No task to complete !";
    }
    else if(totalTasks==completed){
        message.innerHTML="Congratulations !";
    }
    else if (progressPercentage > 0 && progressPercentage < 50) {
        message.innerHTML = "Great job! Keep it up!";
    }
    else if (progressPercentage >= 50 && progressPercentage < 75) {
        message.innerHTML = "Halfway there! Keep going!";
    } 
    else if (progressPercentage >= 75 && progressPercentage < 100) {
        message.innerHTML = "Almost done! Just a little more!";
    }    
    else{
        message.innerHTML=""
    }
}

function loadTask(){
    
}