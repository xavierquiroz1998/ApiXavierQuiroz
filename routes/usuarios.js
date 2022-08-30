
const express_1 = require("express");
var router = express_1.Router();
const { pool} = require('../pg')

 
router.get('/', async function(req, res){
    const result = await pool.query('select * from usuarios')
    res.send( result.rows)
});

router.get('/login/:usuario', async function(req, res){
    var u= req.params.usuario;
    var query = "select * from usuarios where usuario = '"+u+"'";
    const result = await pool.query(query)
    res.send( result.rows[0])
});


module.exports = router;



