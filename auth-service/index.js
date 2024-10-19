const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'factor75',
});

app.use(express.json());

// User login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM factor75.users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ message: 'Login successful', user: results[0], status: 200 });
        } else {
            res.json({ message: 'Invalid email or password', status: 401 });
        }
    });
});

app.listen(3014, () => {
    console.log('Auth service running on port 3014');
});
