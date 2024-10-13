const mysql=require('mysql2');
const pool=mysql.createConnection ({
    host: "localhost",
    database : "airbnb_db",
    port : 3306,
    user : "KD2-86696-snehal",
    password : "Snehal@06"
});
module.exports={pool}

