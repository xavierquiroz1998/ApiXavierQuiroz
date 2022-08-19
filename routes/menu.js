
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')


router.get('/', async function (req, res) {
    const result = await pool.query('select * from menu')
    res.send(result.rows)
});

router.get('/usuario', async function (req, res) {
    const result = await pool.query('select * from menu')
    res.send(result.rows)
});






module.exports = router;
