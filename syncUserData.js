/**
 * Created by gggin on 16-3-13.
 */

var mysql = require('mysql');
var debug = require('debug');
var output = debug('app:log');
var config = require('./config.json');

output(config);

var connection = mysql.createConnection(config.DB_CONFIG);

function doSelect_(x, callback) {
    connection.query(x, function (err, result) {
        if (err) {
            output('[Select ERROR] - ', err.message);
            return;
        }

        output('--------------------------SELECT----------------------------');
        callback(result);
        output('--------------------------------------------------------\n\n');
    });
}

function doSql_(sqlString, params, success, fail) {
    connection.query(sqlString, params, function (err, result) {
        if (err) {
            output('[doSql_ ERROR] - ', err.message);
            fail(err);
        } else {
            output('[doSql_ SUCCESS] - before');
            success(result);
            output('[doSql_ SUCCESS] - end');
        }
    });
}

var AV = require('avoscloud-sdk');
AV.initialize(config.LC.id, config.LC.key);

var NodeInfo = AV.Object.extend('NodeInfo');
var NodeInfoCmd = AV.Object.extend('NodeInfoCmd');

function updateOneRowToServer(row) {
    row.name = config.NAME;
    output(row);
    var kk = row.id;
    row.originId = kk;
    delete row.id;
    AV.Query.doCloudQuery('select * from NodeInfo where name=? and email=?', [config.NAME, row.email]).then(
        function (data) {
            // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
            var results = data.results;
            if (results.length === 0) {
                output('empty find!');
                (new NodeInfo).save(row);
            } else if (results.length === 1) {
                output(results[0]);
                results[0].save(row);
            } else {
                output('may be error!');
            }
            //do something with results...
        }, function (error) {
            //查询失败，查看 error
            output(error);
            if (error.code === 101) {
                (new NodeInfo).save();
            } else {
            }
        });
}

var queryAllInfo = function (callback) {
    doSelect_("select * from user;", function (result) {
        result = JSON.parse(JSON.stringify(result));
        callback(result);
    });
};

function updateInfoToServer() {
    queryAllInfo(function (result) {
        for (var k in result) {
            updateOneRowToServer(result[k]);
        }
    });
}


var userUpdateSql = 'UPDATE user' +
    ' set pass= ?,' +
    ' passwd=?,' +
    ' u=?,' +
    ' d=?,' +
    ' transfer_enable=?,' +
    ' port=?,' +
    ' enable=?' +
    ' where email=?';

function downloadInfoFromServer() {
    AV.Query.doCloudQuery('select * from NodeInfoCmd where name=?', [config.NAME]).then(
        function (data) {
            var re = data.results;
            output(re.length);
            for (var k in re) {
                var pass = re[k].get('pass');
                var passwd = re[k].get('passwd');
                var u = re[k].get('u');
                var d = re[k].get('d');
                var transfer_enable = re[k].get('transfer_enable');
                var port = re[k].get('port');
                var enable = re[k].get('enable');
                var email = re[k].get('email');
                (function () {
                    var tk = k;
                    doSql_(userUpdateSql, [pass, passwd, u, d, transfer_enable, port, enable, email],
                        function (result) {
                            re[tk].destroy().then(
                                function (ree) {
                                    output(ree);
                                }, function (err2) {
                                    output(err2);
                                });
                        },
                        function (err) {
                            output(err);
                        });
                }());
            }
        }, function (err) {
            output(err);
        }
    );
}

/* //test code for add datas;
 AV.Query.doCloudQuery('select * from NodeInfo where name=?', [config.NAME]).then(
 function (data) {
 // data 中的 results 是本次查询返回的结果，AV.Object 实例列表
 var re = data.results;
 for (var k in re) {
 var pass = re[k].get('pass');
 var passwd = re[k].get('passwd');
 var u = re[k].get('u');
 var d = re[k].get('d');
 var transfer_enable = re[k].get('transfer_enable');
 var port = re[k].get('port');
 var enable = re[k].get('enable');
 var email = re[k].get('email');
 (new NodeInfoCmd).save({
 pass: pass,
 passwd: passwd,
 u: u,
 d: d,
 transfer_enable: transfer_enable,
 port: port,
 enable: enable,
 email: email,
 name: config.NAME
 });
 }
 //do something with results...
 }, function (error) {

 });
 //*/

var tt = setInterval(function(){
    try {
        connection.connect();
        tt.clear();
        setInterval(function () {
            output('--trigger--');
            downloadInfoFromServer();
            updateInfoToServer();
        }, 1000 * 60);
    } catch (e) {
    }
}, 1000* 60);





