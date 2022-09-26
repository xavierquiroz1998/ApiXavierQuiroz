

const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')


router.get('/', async function (req, res) {
  const result = await pool.query('select * from producto_stock')
  res.send(result.rows)
});

router.get('/activos', async function (req, res) {
  const result = await pool.query("select * from producto_stock where estado='A' and stock > 0 ")
  res.send(result.rows)
});



router.post('/', async function (req, res) {
  const text = 'INSERT INTO productos(id, codigo, nombre, descripcion, stock, costo, precio, unidad, estado, fecha, usuario)' +
    'VALUES($1, $2, $3, $4, $5,$6, $7, $8, $9, $10, $11) RETURNING *'
  const values = [await getMax() + 1, req.body.codigo, req.body.nombre, req.body.descripcion, req.body.stock, req.body.costo, req.body.precio, req.body.unidad, req.body.estado, req.body.fecha, req.body.usuario]

  try {
    const resexecute = await pool.query(text, values)
    res.send(resexecute.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
});

router.post('/anular', async function (req, res) {
  const text = "UPDATE productos set estado = 'I' where id= $1 RETURNING *"
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
    const result = await pool.query("select coalesce (Max(id),1) from productos")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }

}

module.exports = router;
