const express = require('express');
const db = require('../db');
const router = express.Router();


router.get('/', async (req, res) => {

    try{
        const recipes = await db.query('SELECT * from recipe;');
        res.json(recipes.rows);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({errorMessage: 'Internal Server error.'});
    }

});

module.exports = router;