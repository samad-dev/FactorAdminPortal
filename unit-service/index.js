const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'factor75',
});

// Get all units
app.get('/unit', (req, res) => {
    db.query('SELECT * FROM units', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get unit by ID
app.get('/unit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM units WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new unit
app.post('/unit', (req, res) => {
    const { unit } = req.body;
    db.query('INSERT INTO units (unit) VALUES (?)', [unit], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Unit added successfully', id: result.insertId, status: 200 });
        }
    });
});

// Update a unit
app.put('/unit/:id', (req, res) => {
    const { id } = req.params;
    const { unit } = req.body;
    db.query('UPDATE units SET unit = ? WHERE id = ?', [unit, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Unit updated successfully', status: 200 });
    });
});

// Delete a unit
app.delete('/unit/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM units WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Unit deleted successfully', status: 200 });
    });
});

// Start the service
app.listen(3004, () => {
    console.log('Unit service running on port 3004');
});
