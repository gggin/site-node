/**
 * Created by GGGin on 2016/1/28.
 */

///<reference path='./moment.d.ts'/>
import moment = require('moment');
module util {
    export function dateToChineseStr(date : Date) {
        var origin = moment.locale();
        moment.locale('zh-cn');
        var result = moment(date).format('LLLL');
        moment.locale(origin);
        return result;
    }
}

console.log(util.dateToChineseStr(new Date()));