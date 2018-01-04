'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
  function Task(name) {
    _classCallCheck(this, Task);

    this.name = name;
    this.isComplete = false;
  }

  _createClass(Task, [{
    key: 'complete',
    value: function complete() {
      this.isComplete = !this.isComplete; // el nuevo valor va a ser el opuesto al que ya tenía
    }
  }]);

  return Task;
}();

var TaskList = function () {
  function TaskList(name) {
    _classCallCheck(this, TaskList);

    this.name = name;
    this.tasks = [];
  }

  _createClass(TaskList, [{
    key: 'addTask',
    value: function addTask(task, element) {
      this.tasks.push(task);
      this.renderTasks(element);
      // se renderiza el contenedor element para que se vea desde el navegador
    }
  }, {
    key: 'removeTask',
    value: function removeTask(i, element) {
      this.tasks.splice(i, 1);
      this.renderTasks(element);
    }
  }, {
    key: 'renderTasks',
    value: function renderTasks(element) {
      var tasks = this.tasks.map(function (task) {
        return '\n    <li class="task ' + (task.isComplete ? 'complete' : '') + '">\n      <input type="checkbox" \n            class="task__complete-button"\n            ' + (task.isComplete ? 'checked' : '') + '>\n      <span class="task__name">' + task.name + '</span>\n      <a href="#" class="task__remove-button">X</a>\n    </li>\n    ';
      });
      element.innerHTML = tasks.reduce(function (a1, b1) {
        return a1 + b1;
      }, ' ');
    }
  }]);

  return TaskList;
}();

// Trabajar con el DOM


var addTaskElement = document.getElementById('add-task');
// se obtiene el elemento del documento HTml que contenga el id='add-task'
var tasksContainerElement = document.getElementById('tasks-container');
// se necesita guardar el contenedor de las tareas
var inbox = new TaskList('inbox'); // nombre de la lista de tareas

addTaskElement.focus();

// Añadir tarea desde el DOM  (documento HTML)
function addDOMTask(event) {
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;
  // ésta función es para el DOM
  // Obtener el texto del input (el texto que se ingresa desde la página)
  if (event.key === 'Enter' && this.value.trim().length !== 0) {
    // Crear la tarea instanciando la clase
    var task = new Task(this.value.trim()); // el this hace referencia al Input
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
function removeDOMTask(event) {
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;


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
function getTaskIndex(event) {
  // ???? me funciono sin el parámetro, será porque todo esta en un mismo archivo?
  var taskItem = event.target.parentElement,

  // se obtiene el elemento
  tasksItems = [].concat(_toConsumableArray(tasksContainerElement.querySelectorAll('li')));
  // luego se obtiene el array con todos los elementos 
  // como no es un array se debe expandir
  return tasksItems.indexOf(taskItem);;
}

// Completar la tarea  desde el DOM
function completeDOMTask(event) {
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : inbox;

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