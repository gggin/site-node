var mysql = require('mysql');

var config = require("../config.js");
var connection = mysql.createConnection(config.DB_CONFIG);

connection.connect();

connection.query('SELECT * from user', function (err, rows, fields) {
    if (err) {
        console.log(err);
    } else {
        console.log(rows);
    }
});

var TETS = {
    /* 0 */id: 7,
    /* 1 */email: 'test@test.com',
    /* 2 */pass: '123456',
    /* 3 */passwd: '0000000',
    /* 4 */t: 1410609560,
    /* 5 */u: 0,
    /* 6 */d: 0,
    /* 7 */transfer_enable: 9320666234,
    /* 8 */port: 50000,
    /* 9 */switch: 1,
    /* 10 */enable: 0,
    /* 11 */type: 7,
    /* 12 */last_get_gift_time: 0,
    /* 13 */last_rest_pass_time: 0
};

function RandomString_() {
    return Math.random().toString(36).substr(7);
}

function addUser_() {
    var email = RandomString_();
    var passwd = RandomString_();
    var transfer_enable = 9320666234;
    var port = 50000;
    var enable = 0;
    var insert_str = `INSERT INTO user (email, pass, passwd, t, u, d, transfer_enable, port, enable) \
values('${email}', 'pass', '${passwd}', '1410609560', '0', '0', '${transfer_enable}', '${port}', '${enable}')`;

    console.log(insert_str);
    connection.query(insert_str, function(err, rows, fields) {
        console.log(err, rows, fields);
    });
}

addUser_();

connection.end();
console.log("after end!");