
const express_1 = require("express");
var router = express_1.Router();
const { pool} = require('../pg')

 
router.get('/', async function(req, res){
    const result = await pool.query('select * from unidadmedida')
    res.send(result.rows)
});


router.post('/', async function (req, res) {
    const text = 'INSERT INTO unidadmedida(id, codigo, descripcion)'+
                              'VALUES($1, $2, $3) RETURNING *'
    const values = [await getMax() + 1, req.body.codigo, req.body.descripcion]
  
    try {
      const resexecute = await pool.query(text, values)
      res.send(resexecute.rows[0])
    } catch (err) {
      console.log(err.stack)
    }
  });

  async function getMax(params) {
    try {
      const result = await pool.query("select coalesce (Max(id),1) from unidadmedida")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1; 
    }
  
  }


module.exports = router;



