

    const express_1 = require("express");
    var router = express_1.Router();
    const { pool} = require('../pg')

    
    router.get('/', async function(req, res){
        const result = await pool.query('select * from persona')
        res.send(result.rows)
    });


    router.post('/', async function(req, res){
        const text = 'INSERT INTO persona(id, identificacion, nombres, direccion, correo, celular, telefono, empresaproveedor, idempresa, iddepartamento, tipo)'
                                        +' VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11) RETURNING *'
        const values = [req.body.id, req.body.nombre ,req.body.descripcion, req.body.estado]

        try {
            const res = await pool.query(text, values)
            console.log(res.rows[0])
        } catch (err) {
            console.log(err.stack)
        }
    });



    module.exports = router;
