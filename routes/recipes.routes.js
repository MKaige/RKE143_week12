const express = require('express');
const db = require('../db');
const router = express.Router();


router.get('/', async (req, res) => {

    const recipes = await db.query('SELECT * from recipe;');
    res.json(recipes.rows);

});

module.exports = router;