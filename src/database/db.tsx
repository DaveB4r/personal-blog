import mysql from 'mysql2/promise';

let connection = {
  host: 'btzph0wi43nanhkkc11s-mysql.services.clever-cloud.comv',
  user: 'u3qtqosmeyje9hjb',
  password: 'kJ54c9vx3HCjPKVaNFXl',
  database: 'btzph0wi43nanhkkc11s',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
/*if(process.env.NODE_ENV === 'development'){
  connection = {
    host: process.env.DB_DEV_HOST,
    user: process.env.DB_DEV_USER,
    password: '',
    database: process.env.DB_DEV,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
}else{
  connection = {
    host: process.env.DB_PROD_HOST,
    user: process.env.DB_PROD_USER,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
}*/
const pool = mysql.createPool(connection);

export default pool;