const localStoragekey = 'to-do-list-pj'


function newTask()
{
    let input = document.getElementById('input-new-task')

    //validate input
    if(!input.value){
        alert('Digite alguma tarefa para inserir em sua lista')
    }
    else if(taskduplicade()){
        alert('Essa tarefa ja foi inserida na lista')
    }
    else
    {
        //Localstorage
        let values = JSON.parse(localStorage.getItem(localStoragekey)||"[]")
        values.push({
            task: input.value
        })

        localStorage.setItem(localStoragekey,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}
function taskduplicade(){
    let values = JSON.parse(localStorage.getItem(localStoragekey)||"[]")
    let inputVal = document.getElementById('input-new-task').value
    let exists = values.find(x => x.task == inputVal)
    return !exists ? false : true
}

function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStoragekey)|| "[]")
    let index = values.findIndex(x => x.task ==data)
    values.splice(index,1)
    localStorage.setItem(localStoragekey,JSON.stringify(values))
    showValues()
}

function showValues()
{
    let values = JSON.parse(localStorage.getItem(localStoragekey)|| "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML=''
    for(let i=0; i< values.length; i++)
    {
        list.innerHTML += `<li class=task>${values[i]['task']}<button id='btn-ok' onclick='removeItem("${values[i]['task']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg> </button></li>`
    }
}

showValues()

document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        newTask()
    }

})