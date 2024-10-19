// ingredientService.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3005;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'factor75',
});

app.use(bodyParser.json());

// Get all ingredients
app.get('/ingredient', (req, res) => {
    db.query('SELECT i.*, u.unit FROM ingredients i JOIN units u ON u.id = i.unit_id', (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.json(results);
    });
});

// Get ingredient by ID
app.get('/ingredient/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM ingredients WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.json(results[0]);
    });
});

// Create a new ingredient
app.post('/ingredient', (req, res) => {
    const { name, unit } = req.body;
    db.query('INSERT INTO `ingredients`(`ingredient`, `unit_id`) VALUES (?, ?)', [name, unit], (err, result) => {
        if (err) return res.status(500).json({ message: err });
        res.status(201).json({ message: 'Ingredient added successfully', id: result.insertId });
    });
});

// Update an ingredient
app.put('/ingredient/:id', (req, res) => {
    const { id } = req.params;
    const { name, unit } = req.body;
    db.query('UPDATE `ingredients` SET `unit_id` = ?, `ingredient` = ? WHERE `id` = ?', [unit, name, id], (err) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Ingredient updated successfully' });
    });
});

// Delete an ingredient
app.delete('/ingredient/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM ingredients WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Ingredient deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Ingredient Service running on port ${port}`);
});
