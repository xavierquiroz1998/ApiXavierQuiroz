
const express_1 = require("express");
var router = express_1.Router();
const { pool} = require('../pg')

 
router.get('/', async function(req, res){
    const result = await pool.query('select * from motivos')
    res.send(result.rows)
});


router.post('/', async function(req, res){
    const text = 'INSERT INTO motivos(id, nombre, descipcion, estado) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [req.body.id, req.body.nombre ,req.body.descripcion, req.body.estado]

    try {
        const res = await pool.query(text, values)
        console.log(res.rows[0])
      } catch (err) {
        console.log(err.stack)
      }
});



module.exports = router;
