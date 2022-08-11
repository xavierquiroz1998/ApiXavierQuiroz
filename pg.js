
const {Pool} = require('pg')



const pool = new Pool({
    user: 'yfkmvlrxolkdso',
    host: 'ec2-3-211-221-185.compute-1.amazonaws.com',
    database: 'd9cne3slb533l5',
    password: 'b3db3881ed5863b02cd9c284bb0fc3465e6fe0335f5b92f36101c171f3ae4032',
    port: 5432,
    ssl : {
        rejectUnauthorized : false
    }
})


module.exports={
    pool
}

