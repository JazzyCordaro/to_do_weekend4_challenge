console.log('todo.js is sourced!');

var task = [];

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing tasks on page load
  getTask();

  // add task button click
  $( '#addTask' ).on( 'click', function(){
    console.log( 'in addTask on click' );

    var objectToSend = {
      task: $('#taskName').val(),
      complete: $('#complete').val(),
    };

    saveTask( objectToSend );
    location.reload();
  }); //end addButton on click

  // $('#editTask').on( 'click', function(){
  //   console.log('in editTask on click');

    var objectToSend = {
      task: $('#taskName').val(),
      complete: $('#complete').val()
    };
  });
// });


var getTask = function(){
  console.log( 'in getTask' );
  // ajax call to server to get tasks
  $.ajax({
    url: '/getTask',
    type: 'GET',
    success: function( data ){
      console.log( 'got some tasks: ', data );
      task = data;
      appendTasks();
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
};

var appendTasks = function(){
  console.log('in appendTasks');
  for (var i = 0; i < task.length; i++) {
    $( '#outputDiv' ).append('<ul>' + '<input type="checkbox">' + ' ' + task[i].task +  '</input>' + '</ul>');
  }
};


var saveTask = function( newTask ){
  console.log( 'in saveTask', newTask );
  // ajax call to server to get tasks
  $.ajax({
    url: '/addTask',
    type: 'post',
    data: newTask,
    success: function( data ){
      console.log( 'got some Tasks: ', data );
      task = data;
      appendTasks();
    } // end success
  }); //end ajax
};





var deleteTask = function( newTask ){
  console.log( 'in deleteTask', deleteTask );
  // ajax call to server to get tasks
  $.ajax({
    url: '/deleteTask',
    type: 'post',
    data: deleteTask,
    success: function( data ){
      console.log( 'delete some Tasks: ', data );
      task = data;
      // appendTasks();
    } // end success
  }); //end ajax
};
