var mysql  = require('mysql');  

var connection = mysql.createConnection({     
host     : '123.57.81.203',       
user     : 'root',              
password : 'q',       
port: '3306',                   
database: 'test', 
}); 

connection.connect();


var  userAddSql = 'INSERT INTO user(id, email, pass, passwd, t, u, d, transfer_enable, port, switch, enable, type, last_get_gift_time, last_rest_pass_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
var  userAddSql_Params = ['8', 'test@test.com', '123456', '0000000', '1410609560', '0', '0',
 '9320666234', '50000', '1', '1', '7', '0', '0'];

var  userSelectSql = 'SELECT * FROM user';


function doInsert_(x, y){
  connection.query(x, y, function (err, result) {
      if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
      }        

      console.log('--------------------------INSERT----------------------------');
      //console.log('INSERT ID:',result.insertId);        
      console.log('INSERT ID:',result);        
      console.log('-----------------------------------------------------------------\n\n');  
      });

  connection.end();
}

function doSelect_(x, callback){
  connection.query(x,  function (err, result) {
      if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
      }

      console.log('--------------------------SELECT----------------------------');
      callback(result);
      console.log('--------------------------------------------------------\n\n');
      });

  connection.end();
}
/*
doInsert_(userAddSql, userAddSql_Params);
*/
doSelect_(userSelectSql, function(x){
        console.log(x);
});

