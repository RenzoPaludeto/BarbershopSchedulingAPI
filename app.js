const express = require('express');
const pool = require('./src/db/pool')
const app = express();

app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1')
        res.json({status: 'ok', db: 'up'})
    } catch (err) {
        console.error('Error', err.message);
        res.status(503).json({status: 'error', db: 'down'})
        
    }
})


module.exports = app;
