const {createPool} = require('mysql2');


const pool = createPool({
    port:3306,
    host: 'localhost',
    user: 'root',
    password: '',
    database:'admin_user',
});
pool.getConnection(function(err, connection) {
    if(err){
        console.log(err+ ' pool connection failed');
    }else{
        console.log('pool connection established');
    }
})
module.exports =pool;  
