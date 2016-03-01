/**
 * Created by GGGin on 2016/2/1.
 */

/*
 80 443 27019 6379 5432 5433 50000 50001

 10000000000000
 */
module UserThings {
    interface User {

    }

    export interface UserUpdateData {
        id : number,
        enable : number,
        transfer_enable : number,
        passwd : string,
        port : number
    }

    export interface DBCallback {
        (err:any, result:any) : void
    }

    export function DeleteUser_(id:number, connection:any, callback:DBCallback):void {
        var deleteState = `delete from shadowsocks where id='${id}'`;
        connection.query(deleteState, callback);
    }

    export function UpdateUser_(user:UserUpdateData, connection:any, callback:DBCallback):void {
        var updateState = `
        UPDATE shadowsocks
SET enable = ${user.enable},
SET transfer_enable = ${user.transfer_enable},
SET passwd = ${user.passwd},
SET port = ${user.port},
WHERE id = '${user.id}'
        `;
        connection.query(updateState, callback);
    }

    export function AddUser_(user:User, connection:any):void {

    }
}