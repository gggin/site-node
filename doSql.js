var mysql = require('mysql');

var connection = mysql.createConnection(require('./config.js').DB_CONFIG);
connection.connect();

/**
 * 返回指定位数的随机字符串
 */
var getRndString_ = function (length) {
    var arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    var arrLen = arr.length;
    var s = '';
    for (var i = 0; i < length; i++) {
        s += arr.charAt((Math.random() * arrLen));
    }
    return s;
};


var userAddSql = 'INSERT INTO user(id, email, pass, passwd, t, u, d, transfer_enable, port, switch, enable, type, last_get_gift_time, last_rest_pass_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

function makeParams_(num) {
    var userAddSql_Params = [getRndString_(8), getRndString_(14), '123456', getRndString_(14), '1410609560', '0', '0',
        '10000000000000', Number(1025 + num), '1', '1', '7', '0', '0'];
    return userAddSql_Params;
}

var userSelectSql = 'SELECT * FROM user';


function doInsert_(x, y) {
    connection.query(x, y, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);
        console.log('INSERT ID:', result);
        console.log('-----------------------------------------------------------------\n\n');
    });
}

function doSelect_(x, callback) {
    connection.query(x, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        callback(result);
        console.log('--------------------------------------------------------\n\n');
    });
}

for(var i = 1; i < 10; ++i) {
    doInsert_(userAddSql, makeParams_(i));
}
connection.end();

/*
 doSelect_(userSelectSql, function(x){
 console.log(x);
 });
 */
