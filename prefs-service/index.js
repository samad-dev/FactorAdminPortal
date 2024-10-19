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

// Get all preferences
app.get('/prefs', (req, res) => {
    db.query('SELECT * FROM prefernces', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get preference by ID
app.get('/prefs/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM prefernces WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new preference
app.post('/prefs', (req, res) => {
    const { pref } = req.body;
    db.query('INSERT INTO prefernces (preference) VALUES (?)', [pref], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Preference added successfully', id: result.insertId, status: 200 });
    });
});

// Update a preference
app.put('/prefs/:id', (req, res) => {
    const { id } = req.params;
    const { pref } = req.body;
    db.query('UPDATE prefernces SET preference = ? WHERE id = ?', [pref, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Preference updated successfully', status: 200 });
    });
});

// Delete a preference
app.delete('/prefs/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM prefernces WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Preference deleted successfully', status: 200 });
    });
});

// Start the service
app.listen(3003, () => {
    console.log('Prefs service running on port 3003');
});
