/**
 * Created by GGGin on 2016/3/6.
 */


var express = require('express');
var app = express();

app.use('/static', express.static('public'));

app.listen(10087, function () {
    console.log('Example app listening on port 10087!');
});