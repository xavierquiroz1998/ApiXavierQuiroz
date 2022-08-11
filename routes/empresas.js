
const express_1 = require("express");
var router = express_1.Router();
const { pool} = require('../pg')

 
router.get('/', async function(req, res){
    //console.log(req)
    const result = await pool.query('select * from empresas')
    res.send( result.rows)
});

router.post('/', async function(req, res){
    const text = 'INSERT INTO empresas (id, nombre, descripcion, estado) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [req.body.id, req.body.nombre ,req.body.descripcion, req.body.estado]

    try {
        const res = await pool.query(text, values)
        console.log(res.rows[0])
      } catch (err) {
        console.log(err.stack)
      }
});



module.exports = router;
