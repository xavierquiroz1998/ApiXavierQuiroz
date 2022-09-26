
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')

// cab
router.get('/', async function (req, res) {
    const result = await pool.query('select * from pedido_cab')
    res.send(result.rows)
  });

  router.get('/pendientes', async function (req, res) {
    const result = await pool.query('select * from pedidos_pendiente')
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

  router.post('/anular', async function (req, res) {
    const text = "UPDATE pedido_cab set estado = 'I' where id= $1 RETURNING *"
    const values = [req.body.id]
    try {
      const resultado = await pool.query(text, values)
      res.send(resultado.rows[0])
    } catch (err) {
      console.log(err);
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

// detalle

router.get('/pedidoDet/:id', async function(req, res){
  var u= req.params.id;
  var query = "select * from pedido_det where id_cab = '"+u+"'";
  try {
      const result = await pool.query(query)
      res.send( result.rows)
  } catch (error) {
    console.log(err);
      res.send([]);
  }
});


router.post('/pedidoDet', async function (req, res) {
  const text = 'INSERT INTO pedido_det(id, id_cab, id_producto, cantidad, id_motivo, precio, cod_iva, iva, sub_total, total) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'
  const values = [await getMaxdet() + 1, req.body.id_cab, req.body.id_producto, req.body.cantidad, req.body.id_motivo, req.body.precio, req.body.cod_iva, req.body.iva, req.body.sub_total,req.body.total]

  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    console.log(err);
    res.send({})
  }
});


async function getMaxdet(params) {
  try {
    const result = await pool.query("select coalesce (Max(id),1) from pedido_det")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }
}






  module.exports = router;