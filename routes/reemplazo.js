
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')



router.get('/', async function (req, res) {
  const result = await pool.query('select * from reemplazo_cab')
  res.send(result.rows)
});


router.post('/', async function (req, res) {
  const text = 'INSERT INTO reemplazo_cab(id, id_persona, id_motivo, observacion, fecha, estado) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
  const values = [await getMax() + 1, req.body.id_persona, req.body.id_motivo, req.body.observacion, req.body.fecha, req.body.estado]

  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    console.log(err);
    res.send({})
  }
});

router.get('/detalles/:id', async function (req, res) {
  var u = req.params.id;
  var query = "select * from reemplazo_det where id_cab = " + u ;
  try {
    const result = await pool.query(query)
    res.send(result.rows)
  } catch (error) {
    console.log(err);
    res.send([]);
  }
});

router.post('/remplazoDet', async function (req, res) {
  const text = 'INSERT INTO reemplazo_det(id, id_cab, id_producto1, cantidad, motivo, id_producto2, cantidad2) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
  const values = [await getMaxdet() + 1, req.body.id_cab, req.body.id_producto1, req.body.cantidad, req.body.motivo, req.body.id_producto2, req.body.cantidad2]

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
    const result = await pool.query("select coalesce (Max(id),1) from reemplazo_det")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }
}



async function getMax(params) {
  try {
    const result = await pool.query("select coalesce (Max(id),1) from reemplazo_cab")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }

}


router.post('/anular', async function (req, res) {
  const text = "UPDATE reemplazo_cab set estado = 'I' where id= $1 RETURNING *"
  const values = [req.body.id]
  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    console.log(err);
    res.send({})
  }
});


module.exports = router;
