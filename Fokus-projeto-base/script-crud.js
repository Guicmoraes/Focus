const addTask = document.querySelector(".app__button--add-task")
const cancelTask = document.querySelector(".app__form-footer__button--cancel")
const formAddTask = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
const descriptionParagraph = document.querySelector(".app__section-active-task-description")
const ulTasks = document.querySelector('.app__section-task-list')


const removeAllCompletedTasksButton = document.getElementById('btn-remover-concluidas')
const removeAllTasks = document.getElementById('btn-remover-todas')

let taskList = JSON.parse(localStorage.getItem('tasks')) || []
let selectedTask = null
let selectedTask_li = null

function updateTasks(){
    localStorage.setItem('tasks',JSON.stringify(taskList))
    console.log(localStorage.tasks)
}

function createTaskElement(task){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
    
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    
    `

    const paragraph = document.createElement('p')
    paragraph.classList.add("app__section-task-list-item-description")
    paragraph.textContent = task.description

    const button = document.createElement('button')
    button.classList.add('app_button-edit')
    const image = document.createElement('img')
    
    button.onclick = ()=>{
        const newDescription = prompt('Qual o nome da tarefa?')
        if(newDescription){
            paragraph.textContent = newDescription
            updateTasks()
            task.description = newDescription
        }
        
    }

    image.setAttribute('src','/imagens/edit.png')
    button.append(image)

    li.append(svg)
    li.append(paragraph)
    li.append(button)
    
    if(task.completed){
        li.classList.add('app__section-task-list-item-complete')
        button.setAttribute('disabled','disabled')
    }

    li.onclick = () =>{
              document.querySelectorAll('.app__section-task-list-item-active')
                  .forEach(element =>{
                      element.classList.remove('app__section-task-list-item-active')
                  })
              if(selectedTask == task){
                  descriptionParagraph.textContent=''
                  selectedTask = null
                  selectedTask_li = null
                  return
              }
              selectedTask = task
              selectedTask_li = li

              descriptionParagraph.textContent = task.description

              li.classList.add("app__section-task-list-item-active")
          }

      return li
}

addTask.addEventListener('click', ()=>{
    formAddTask.classList.toggle("hidden")

})

cancelTask.addEventListener('click',()=>{
    textArea.value = ''
    formAddTask.classList.add('hidden')
})

formAddTask.addEventListener('submit',(event)=>{
    event.preventDefault()
    const task = {
        description:textArea.value
    }
    taskList.push(task)
    const taskElement = createTaskElement(task)
    ulTasks.append(taskElement)
    updateTasks()
    textArea.value = ''
    formAddTask.classList.add('hidden')
})

taskList.forEach(task => {
    const taskElement = createTaskElement(task)
    ulTasks.append(taskElement)
})

document.addEventListener('FocoFinalizado',()=>{

    if(selectedTask && selectedTask_li){
        
        selectedTask_li.classList.remove('app__section-task-list-item-active')
        selectedTask_li.classList.add('app__section-task-list-item-complete')
        selectedTask_li.querySelector('button').setAttribute('disabled','disabled')
        selectedTask.completed = true
        updateTasks()
        
    }
})

const removeTasks = (onlyCompletedTasks)=>{
    const selector = onlyCompletedTasks ? ".app__section-task-list-item-complete": ".app__section-task-list-item"
    document.querySelectorAll(selector).forEach(element=>{
        element.remove()
    })
    taskList = onlyCompletedTasks ? taskList.filter(task=> !task.completed):[]
    updateTasks()
}

removeAllCompletedTasksButton.onclick = () => removeTasks(true)

removeAllTasks.onclick = () => removeTasks(false)