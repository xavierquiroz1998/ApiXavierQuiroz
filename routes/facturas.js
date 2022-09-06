
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')



router.get('/', async function (req, res) {
    const result = await pool.query('select * from factura_cab')
    res.send(result.rows)
  });

  router.post('/', async function (req, res) {
    const text = 'INSERT INTO factura_cab(id, id_cliente, observacion, fecha, estado, id_usuario, id_pedido) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [await getMax() + 1, req.body.id_cliente, req.body.observacion, , req.body.fecha, req.body.estado, req.body.id_usuario, req.body.id_pedido]
  
    try {
      const resultado = await pool.query(text, values)
      res.send(resultado.rows[0])
    } catch (err) {
      res.send({})
    }
  });
  
  
  async function getMax(params) {
    try {
      const result = await pool.query("select coalesce (Max(id),1) from factura_cab")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }

  module.exports = router;
  