const express = require('express');
const db = require('../db');
const router = express.Router();


router.get('/', async (req, res) => {

    const ingredients = await db.query('SELECT * from ingredient;');
    res.json(ingredients.rows);

});

module.exports = router;