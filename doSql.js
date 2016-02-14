var mysql  = require('mysql');  

var connection = mysql.createConnection({     
host     : '123.57.81.203',       
user     : 'root',              
password : 'q',       
port: '3306',                   
database: 'test', 
}); 

connection.connect();




/**
 * 返回指定位数的随机字符串
 */
var getRndString = function (length) {
    var arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    var arrLen = arr.length;
    var s = '';
    for (var i = 0; i < length; i++) {
        s += arr.charAt((Math.random() * arrLen));
    }
    return s;
}



var  userAddSql = 'INSERT INTO user(id, email, pass, passwd, t, u, d, transfer_enable, port, switch, enable, type, last_get_gift_time, last_rest_pass_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
var  userAddSql_Params = [getRndString(8), getRndString(14), '123456', getRndString(14), '1410609560', '0', '0',
  '10000000000000','80', '1', '1', '7', '0', '0'];

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

doInsert_(userAddSql, userAddSql_Params);

/*
doSelect_(userSelectSql, function(x){
        console.log(x);
});
*/
