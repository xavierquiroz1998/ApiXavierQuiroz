

const express_1 = require("express");
const { INTEGER } = require("sequelize");
var router = express_1.Router();
const { pool } = require('../pg');
const { route } = require("./usuarios");


router.get('/', async function (req, res) {
    const result = await pool.query('select * from persona')
    res.send(result.rows)
});


router.post('/', async function (req, res) {
    const text = 'INSERT INTO persona(id, identificacion, nombres, direccion, correo, celular, telefono, empresaproveedor, idempresa, iddepartamento, tipo)'
        + ' VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11) RETURNING *'
    const values = [await getMax() + 1, req.body.nombre, req.body.descripcion, req.body.estado]

    try {
        const res = await pool.query(text, values)
        console.log(res.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
});

router.get('/getId', async function (req, res) {
    try {
        const result = await getMax();
        res.send(result + "");
    } catch (error) {

    }
});


async function getMax(params) {
    try {
        const result = await pool.query("select coalesce (Max(id),1) from persona")
        return result.rows[0].coalesce;
    } catch (error) {
        return 1;
    }

}



module.exports = router;
