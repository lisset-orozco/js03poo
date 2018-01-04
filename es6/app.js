class Task {
  constructor(name) {
    this.name = name;
    this.isComplete = false;
  }

  complete() {
    this.isComplete = !this.isComplete; // el nuevo valor va a ser el opuesto al que ya tenía
  }
}

class TaskList {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task, element) {
    this.tasks.push(task);
    this.renderTasks(element);
    // se renderiza el contenedor element para que se vea desde el navegador
  }

  removeTask(i, element) {
    this.tasks.splice(i, 1);
    this.renderTasks(element);
  }

  renderTasks(element) {
    let tasks = this.tasks.map(task => `
    <li class="task ${task.isComplete ? 'complete' : ''}">
      <input type="checkbox" 
            class="task__complete-button"
            ${task.isComplete ? 'checked' : ''}>
      <span class="task__name">${task.name}</span>
      <a href="#" class="task__remove-button">X</a>
    </li>
    `);
    element.innerHTML = tasks.reduce((a1, b1) => a1 + b1, ' ');
  }
}

// Trabajar con el DOM
const addTaskElement = document.getElementById('add-task'); 
// se obtiene el elemento del documento HTml que contenga el id='add-task'
const tasksContainerElement = document.getElementById('tasks-container'); 
// se necesita guardar el contenedor de las tareas
const inbox = new TaskList('inbox'); // nombre de la lista de tareas

addTaskElement.focus();

// Añadir tarea desde el DOM  (documento HTML)
function addDOMTask(event, list = inbox) { // ésta función es para el DOM
  // Obtener el texto del input (el texto que se ingresa desde la página)
  if (event.key === 'Enter' && this.value.trim().length !== 0) {
    // Crear la tarea instanciando la clase
    let task = new Task(this.value.trim()); // el this hace referencia al Input
    // This es el elemento en que el evento fue ejecutado y el elemento es el input
    // el value es el texto del input
    // Añadir la tarea a la lista
    list.addTask(task, tasksContainerElement);
    // se le pasa la tarea
    // y el elemento en cual se va a renderizar o dibujar (tasksContainerElement)

    // borrar el texto del input
    this.value = '';
  }
}

addTaskElement.addEventListener('keyup', addDOMTask);
// las funciones son para interactuar con el DOM

// ELiminar tarea desde el DOM
function removeDOMTask(event, list = inbox) {
  
  if (event.target.tagName === 'A') {
    // remover tarea de la lista,  (se necesita el índice)
    list.removeTask(getTaskIndex(event), tasksContainerElement); 
  }
}
// el evento click funciona en todo el contenedor
// ahora toca averiguar en que parte del contenedor se hizo click
tasksContainerElement.addEventListener('click', removeDOMTask);
// Delegación de eventos en Javascript

// Obtener índice de la tarea actual
function getTaskIndex(event) {  // ???? me funciono sin el parámetro, será porque todo esta en un mismo archivo?
  let taskItem = event.target.parentElement,
    // se obtiene el elemento
    tasksItems = [...tasksContainerElement.querySelectorAll('li')];
    // luego se obtiene el array con todos los elementos 
    // como no es un array se debe expandir
  return tasksItems.indexOf(taskItem);;
}

// Completar la tarea  desde el DOM
function completeDOMTask(event, list = inbox) {
  // detectar que se hizo click en el input
  if (event.target.tagName === 'INPUT') {
    // Completar tarea de la lista,  (se necesita el índice)
    list.tasks[getTaskIndex(event)].complete(); 
    event.target.parentElement.classList.toggle('complete');
    // console.table(list.tasks);
  }
}
// el evento click funciona en todo el contenedor
// ahora toca averiguar en que parte del contenedor se hizo click
tasksContainerElement.addEventListener('click', completeDOMTask);;