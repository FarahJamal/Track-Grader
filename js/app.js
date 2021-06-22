'use strict'
let formA=document.getElementById('formA');
let exsitingLocalStorage=[];
let tableSec=document.getElementById('table');
let clearButton=document.getElementById('clearA');
let grades=0;
let status,color;
function StudentGrades(name,course,grades)
{
this.name=name;
this.course=course;
this.grades=grades;
StudentGrades.allData.push(this);
}

StudentGrades.allData=[];
function formHandler(event){
    event.preventDefault();
    const nameS=event.target.name.value;
    const courseS=event.target.className.value;
    getRandomGrades();
    const gradesS=grades;
  
    let newGrade=new StudentGrades(nameS,courseS,gradesS);
    saveToLocalStorage(newGrade);
    newGrade.render();
    
}

StudentGrades.prototype.render=function(){
    formA.reset();
    let tableEl=document.createElement('table');
    tableEl.setAttribute('id','tab');
    tableSec.textContent='';
    getFromLocalStorage();
    tableSec.appendChild(tableEl);
    let trHEl=document.createElement('tr');
    tableEl.appendChild(trHEl);
    let thName=document.createElement('th');
    thName.textContent='Student Name';
    trHEl.appendChild(thName);

    let thGrade=document.createElement('th');
    thGrade.textContent='Student Grade';
    trHEl.appendChild(thGrade);

    
    let thCourse=document.createElement('th');
    thCourse.textContent='Course';
    trHEl.appendChild(thCourse);

        
    let thStatus=document.createElement('th');
    thStatus.textContent='Status';
    trHEl.appendChild(thStatus);

    let thRemove=document.createElement('th');
    thRemove.textContent='#';
    trHEl.appendChild(thRemove);

    for (let i = 0; i < exsitingLocalStorage.length; i++) {
        let trEl=document.createElement('tr');
        tableEl.appendChild(trEl);
        let tdName=document.createElement('td');
        tdName.textContent=exsitingLocalStorage[i].name;
        trEl.appendChild(tdName);

        let tdGrade=document.createElement('td');
        tdGrade.textContent=exsitingLocalStorage[i].grades;
        trEl.appendChild(tdGrade);
        if(exsitingLocalStorage[i].grades>=50){
            status='Pass';
            color='green';
        }
        else{
            status='failed';
            color='red';
        }
        let tdCourse=document.createElement('td');
        tdCourse.textContent=exsitingLocalStorage[i].course;
        trEl.appendChild(tdCourse);
   
        let tdStatus=document.createElement('td');
        tdStatus.textContent=status;
        tdStatus.style.color=color;
        trEl.appendChild(tdStatus);


        let tdRemove=document.createElement('td');
        let rmBtn=document.createElement('button');
        rmBtn.textContent='X';
        rmBtn.setAttribute('id',i);
        rmBtn.setAttribute('class','clearBtn');
        tdRemove.appendChild(rmBtn);
        trEl.appendChild(tdRemove);
        rmBtn.addEventListener('click',function(){
            tableEl.deleteRow(rmBtn.id);
            exsitingLocalStorage.splice(rmBtn.id,1);
            window.location.reload();
            localStorage.setItem('grade',JSON.stringify(exsitingLocalStorage));
        })
    }


}
function getRandomGrades()
{
grades=Math.floor(Math.random()*100)+1;
return grades;
}

function saveToLocalStorage(data){
    exsitingLocalStorage.push(data);
    localStorage.setItem('grade',JSON.stringify(exsitingLocalStorage));
}
function getFromLocalStorage(){
    exsitingLocalStorage=JSON.parse(localStorage.getItem('grade'))||[];
}
formA.addEventListener('submit',formHandler);
let reGrade=new StudentGrades(StudentGrades.allData.name,StudentGrades.allData.course,StudentGrades.allData.grades);
reGrade.render();
clearButton.addEventListener('click',function(){
window.localStorage.clear();
let newTable=document.getElementById('tab');
newTable.textContent='';
let reGrade=new StudentGrades(StudentGrades.allData.name,StudentGrades.allData.course,StudentGrades.allData.grades);
reGrade.render();

});