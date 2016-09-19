var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/to_do_app';
var port = process.env.PORT || 3000;

// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
});

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get tasks
app.get( '/getTask', function( req, res ){
  console.log( 'getTask route hit' );
  // connect to db
  pg.connect( connectionString, function( err, client, done){
    // if err
    if(err){
      console.log( err );
    } // end error connect
    else{
      console.log('connected to db');
      var resultsArray=[];
      // query to db
      var queryResults = client.query( 'SELECT * FROM to_do');
      queryResults.on( 'row', function( row ){
        resultsArray.push( row );
      }); // end on row
      queryResults.on( 'end', function(){
        done();
        return res.json( resultsArray);
      });
    }
  }); // end connect
  //assemble object to send
  // var objectToSend={
  //   response: 'from gettasks route'
  // }; //end objectToSend
  // //send info back to client
  // res.send( objectToSend );
});

// add task
app.post( '/addTask', urlencodedParser, function( req, res ){
  console.log( 'addTask route hit:', req.body );
  var results = [];

  var data = {task: req.body.task , complete: req.body.complete};
  pg.connect( connectionString, function( err, client, done){
    // if err
    if(err){
      done();
      console.log( err );
      return;
    } // end error connect
      // query to db
      client.query( "INSERT INTO to_do(task, complete) values($1, $2)", [data.task, data.complete]);
      var query = client.query('SELECT * FROM  to_do ORDER BY id DESC LIMIT 1');
      query.on('row', function( row ){
        results.push(row);
      });

      query.on( 'end', function(){
        done();
        return res.json(results);
      });











//
// client.query("DELETE FROM to_do(task, complete) values($1, $2)", [data.task, data.complete]);
// query = client.query('DELETE * FROM to_do');
// query.on('row', function(row){
//     results.push(row);
// });









  });
  //assemble object to send
  // var objectToSend={
  //   response: 'from addTask route'
  // }; //end objectToSend
  // //send info back to client
  // res.send( objectToSend );
});

// // add task
// app.post( '/editTask', urlencodedParser, function( req, res ){
//   console.log( 'editTask route hit' );
//   //assemble object to send
//   var objectToSend={
//     response: 'from editTask route'
//   }; //end objectToSend
//   //send info back to client
//   res.send( objectToSend );
// });


// add task
// app.post( '/deleteTask', urlencodedParser, function( req, res ){
//   console.log( 'deleteTask route hit' );
//   //assemble object to send
//   var objectToSend={
//     response: 'from deleteTask route'
//   }; //end objectToSend
//   //send info back to client
//   res.send( objectToSend );
// });
