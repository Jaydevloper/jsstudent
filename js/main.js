const elTbody = document.getElementById('students-table-body');
const elTemp = document.getElementById('student-template').content;
const elForms = document.getElementById('edit-form');
const elCount = document.querySelector('.count');
const elForm = document.querySelector('.filter');
const elSearch = document.getElementById('search')
const elEditname = document.getElementById('edit-name');
const elEditlastname = document.getElementById('edit-lastname');
const elEditmark = document.getElementById('edit-mark');
const elFrom = document.getElementById('from');
const elTo = document.getElementById('to');
const elSort = document.getElementById('sortby');
const elOptionfail = document.getElementById('fail');
const elOptionPass = document.getElementById('pass');
const elContainer = document.querySelector('.container')
const elAddproduct = document.getElementById('add-form')
const elName = document.getElementById('name')
const elLastname = document.getElementById('lastname')
const elMark = document.getElementById('mark')
elCount.textContent = `Count: ${students.length}`
// elContainer.addEventListener('click',e =>{
    
//     if (e.target.matches('#btn-filter') && elSort.value.includes(elOptionfail.value) ){
            
//             // if( students.mark > 60){
//             //     const currentId = students.findIndex(student => student.id === +currentStudent) 
//             //     console.log(el.id);
//             //     students.splice(currentId,1)
//             //     elCount.textContent = `Count: ${students.length}`
//             // }
//     }
// })
function render (i){
    const elCopy =  elTemp.cloneNode(true);
    const {id,name,lastName,markedDate,mark} = i
    const studentRender = elCopy.querySelector('#studentes');
    const studentId = studentRender.setAttribute('data-id',id);
    elCopy.querySelector('.student-id').textContent = id;
    elCopy.querySelector('.student-name').textContent = name + ' ' + lastName;
    elCopy.querySelector('.student-marked-date').textContent = getData(markedDate);
    let studentScore = Math.round((mark/150)*100 ) 
    elCopy.querySelector('.student-mark').textContent = studentScore + '%';
    
     if (studentScore < 60 ){
        elCopy.querySelector('.student-pass-status').classList.add('bg-danger')
        elCopy.querySelector('.student-pass-status').textContent = 'fail'
    }else if(studentScore >= 60){
        elCopy.querySelector('.student-pass-status').classList.add('bg-success')
        elCopy.querySelector('.student-pass-status').textContent = 'pass'
    }
    elTbody.append(elCopy)
  
}
const dataJson = JSON.parse(localStorage.getItem('students')) || []

dataJson.forEach(element => render(element))
function tbody (e){
    if (e.target.matches('#btn-delete')){
        elTbody.innerHTML = ''
        const currentStudent = e.target.closest('#studentes').dataset.id;
        const currentId = students.findIndex(student => student.id === +currentStudent) 
        localStorage.setItem('students',JSON.stringify(students))
        students.splice(currentId,1)
            dataJson.forEach(element => render(element))
        elCount.textContent = `Count: ${students.length}`
    } else if (e.target.matches('#btn-edit')) {
        const currentStudent = e.target.closest('#studentes').dataset.id;
         const currentId = dataJson.find(student => student.id === +currentStudent) 
         const currentIdIndex = students.findIndex(student => student.id === +currentStudent) 
            elEditname.value = currentId.name;
            elEditlastname.value = currentId.lastName;
            elEditmark.value = currentId.mark;
            elForms.addEventListener('submit', e =>{
                e.preventDefault();
                if (elEditname.value.trim()  && elEditlastname.value.trim()){
                    const student  = {
                        id:currentId.id,
                        markedDate:currentId.markedDate,
                        name:elEditname.value,
                        lastName:elEditlastname.value,
                        mark:+elEditmark.value
                    }
                    students.splice(currentIdIndex,1,student);
                    localStorage.setItem('students',JSON.stringify(students))
                    elTbody.innerHTML = ''
                    dataJson.forEach(element =>render(element))
                    timedRefresh(100);
                }
            })
    }
}
elTbody.addEventListener('click', tbody)

function getData (dataT){
    const data = new Date(dataT)
    return `${data.getFullYear()}/${data.getMonth()+1}/${data.getDate()}`
}
elForm.addEventListener('submit', e =>{
    elTbody.innerHTML = '';
    e.preventDefault();
students.filter((el) =>{
        const re = new RegExp(elSearch.value, 'gi')
        let studentScore = Math.round((el.mark/150)*100 ) 
        if (elSearch.value && `${el.name + el.lastName}`.match(re)){
            render(el);
        }
        else if (elFrom.value && studentScore >= elFrom.value){
            if (!elTo.value){
                render(el)
            }
          else if (studentScore <= elTo.value){
                render(el);
            }
    } 
     else if (elTo.value && studentScore <= elTo.value){
        if (studentScore >= elFrom.value){
            render(el);
        }
    }
    else if(elSort.value.includes(elOptionfail.value) && studentScore < 60){
            render(el); 
        }
        else if(elSort.value.includes(elOptionPass.value) && studentScore >=60){
            render(el);
        }
        
    })
    
})
elAddproduct.addEventListener('submit',e =>{
    e.preventDefault();
    tbody(e);
    if(elName.value.trim() && elLastname.value.trim()){
        elTbody.innerHTML ='';
        const data = new Date()
        students.push({
            id:`10${students.length}`,
            name:`${elName.value}`,
            lastName:`${elLastname.value}`,
            mark:`${elMark.value}`,
            markedDate:`${data.getFullYear()}/${data.getMonth()+1}/${data.getDate()}`
        });
        localStorage.setItem('students',JSON.stringify(students));
     
    students.forEach(element =>{
            render(element);
        })
    }

    elCount.textContent = `Count: ${students.length}`
})

function timedRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);",timeoutPeriod);
}

// localStorage.setItem('NAme','war')
// const a =  localStorage.getItem('NAme')
// const a ="12341"

// console.log(JSON.parse(a));
// const elFOrma = document.getElementById('forma');
// const elInput = document.getElementById('input');
// const elDiv = document.getElementById('div');

// const b = [
//     {
//         name:'jdawed'
//     },{
//         name:'jdawed'
//     },
//     {
//         name:'jdawed'
//     }
// ]
// const data =   JSON.parse(localStorage.getItem(`b`)) || []
// data.forEach(user =>{
//     const p = document.createElement('p');
//     p.textContent = user.name
//     elDiv.append(p);
// })

// elFOrma.addEventListener('submit', e =>{
//     e.preventDefault()
//   b.push({
//         name:elInput.value
//     })
//     localStorage.setItem('b',JSON.stringify(b))
//     elDiv.innerHTML = null;
//     b.forEach(user =>{
//         const p = document.createElement('p');
//         p.textContent = user.name
//         elDiv.append(p);
//     })
// })





