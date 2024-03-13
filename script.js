const localStoragekey = 'to-do-list-pj'
function taskduplicade(){
    let values = JSON.parse(localStorage.getItem(localStoragekey)||"[]")
    let inputVal = document.getElementById('input-new-task').value
    let exists = values.find(x => x.task == inputVal)
    return !exists ? false : true
}

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
    // input.value = ''
}

function showValues()
{
    let values = JSON.parse(localStorage.getItem(localStoragekey)|| "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML=''
    for(let i=0; i< values.length; i++)
    {
        list.innerHTML += `<li>${values[i]['task']}<button id='btn-ok' onclick='removeItem("${values[i]['task']}")'>OK</button></li>`
    }
}
function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStoragekey)|| "[]")
    let index = values.findIndex(x => x.name ==data)
    values.splice(index,1)
    localStorage.setItem(localStoragekey,JSON.stringify(values))
    showValues()
}
showValues()

document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        newTask()
    }

})