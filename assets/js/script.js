let currentDayEl = $('#currentDay');
let timeBlockContainerEl = $('.container');

let today = moment();
let currentTime = moment();
let workHours = [9,10,11,12,13,14,15,16,17,18];
let tasks = {};

// rendering all timeblocks
function renderTimeBlocks() {
  for (let hour of workHours){
    let timeBlock = createTimeBlock(hour);
    timeBlockContainerEl.append(timeBlock);
  };
  timeBlockContainerEl.on('click', handleSaveTask);
};

// render each individual time block
function createTimeBlock(hour) {
  let hourText = moment(hour, 'H').format('hA');
  let idText = 'taskAt' + hour;

  let formEl = $('<form>').addClass('row time-block').data('hour', hour);
  let labelEl = $('<label>').addClass('col-1 py-3 my-0 hour').text(hourText).attr('for', idText);
  let textAreaEl = $('<textarea>').addClass('col-10 past').attr('id', idText);
  let saveBtnEl = $('<button>').addClass('col-1 saveBtn').attr('type', 'submit');
  let saveIconEl = $('<i>').addClass('far fa-save');

  saveBtnEl.append(saveIconEl);
  formEl.append(labelEl);
  formEl.append(textAreaEl);
  formEl.append(saveBtnEl);

  return formEl;
};


// color code each time block
function setAllTextAreasBackgroundColor() {
  let thisHour = moment().format('H');
  $('textarea').each((index, el) => setTextAreaBackgroundColor(el, thisHour));
};

// set background color according to the current hour
function setTextAreaBackgroundColor(textarea, thisHour) {
  let el = $(textarea);
  let textareaHour = el.parent('form').data('hour');
  
  el.removeClass();
  if ( textareaHour < thisHour) {
    el.addClass('col-10 past');
  } else if (textareaHour == thisHour) {
    el.addClass('col-10 present');
  } else {
    el.addClass('col-10 future');
  };
}

// handle when save button is clicked
function handleSaveTask(event) {
  event.preventDefault();

  // check if it is a button
  if ($(event.target).closest('button').is('button')) {
    let formEl = $(event.target).parent('form');
    let hour = formEl.data('hour');
    let textToSave =  formEl.children('textarea').val();
    
    tasks[hour] = textToSave;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('saving done');
  }; 
};

// load tasks from localstorage
function loadTasks() {
  let savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    tasks = savedTasks;
  } else {
    tasks = initTasks();
  };
};

// return an empty task list
function initTasks() {
  return workHours.reduce((acc,current)=> (acc[current]='',acc),{});
};

// print tasks 
function printTasks() {
  workHours.map(printTask);
};

// print task from hour
function printTask(hour) {
  let taskId = '#taskAt' + hour;
  $(taskId).val(tasks[hour]);
}

// on loading the page
function init() {
  currentDayEl.text(today.format('dddd, Do MMMM YYYY'));
  loadTasks();
  renderTimeBlocks();
  printTasks();
  setAllTextAreasBackgroundColor();
};

init();