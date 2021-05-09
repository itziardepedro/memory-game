import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./highscore.db");

const handlers = Object.create(null);

const queryPromise = function (query, ...queryParams) {
    return new Promise(function (resolve, reject) {
        db.all(query, queryParams, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

const actionPromise = function (query, ...queryParams) {
    //console.log(query)
    //console.log(queryParams)
    return new Promise(function (resolve, reject) {
        db.run(query, queryParams, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

//we give the function a query and it returns the promise of that query
const handler = function (obj) {
    return Promise.resolve(obj.type);
};

handlers.listScores = function (obj) {
    const query = (
        "SELECT name, time " +
        "FROM scores " );
    return queryPromise(query);
};

handlers.newScore = function (obj) {
    const query = (
        "INSERT INTO scores(NAME,TIME) " +
        "VALUES (?, ?)"
    );
    return actionPromise(query, obj.user_name, obj.user_time);
};

export default Object.freeze(handlers);
//export default handlers;