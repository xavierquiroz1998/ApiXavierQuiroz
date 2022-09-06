
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')


router.get('/', async function (req, res) {
    const result = await pool.query('select * from pedido_cab')
    res.send(result.rows)
  });
  

  router.post('/', async function (req, res) {
    const text = 'INSERT INTO pedido_cab(id, id_cliente, observacion, fecha, estado, id_usuario) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [await getMax() + 1, req.body.id_cliente, req.body.observacion, req.body.fecha, req.body.estado, req.body.id_usuario]
  
    try {
      const resultado = await pool.query(text, values)
      res.send(resultado.rows[0])
    } catch (err) {
      res.send({})
    }
  });
  
  
  async function getMax(params) {
    try {
      const result = await pool.query("select coalesce (Max(id),1) from pedido_cab")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }

  module.exports = router;