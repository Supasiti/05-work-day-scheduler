let currentDayEl = $('#currentDay');

let today = moment();




function init() {
  currentDayEl.text(today.format('dddd, Do MMMM YYYY'));
};

init();