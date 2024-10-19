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

// Get all dishes
app.get('/dishes', (req, res) => {
    db.query('SELECT * FROM dish', (err, results) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            const dishPromises = results.map(data => {
                return Promise.all([
                    queryIngredients(data.id),
                    queryNutrients(data.id),
                    queryprefs(data.id)
                ]).then(([ingredients, nutrients, prefs]) => {
                    data.ingre = ingredients;
                    data.nutrient = nutrients;
                    data.prefs = prefs;
                    return data;
                });
            });

            Promise.all(dishPromises)
                .then(dishes => res.json(dishes))
                .catch(err => res.json({ message: err, status: 500 }));
        }
    });
});

function queryIngredients(dishId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT i.ingredient, u.unit, di.ingredient_qty FROM ingredients i JOIN dish_ingredients di ON di.ingredient_id = i.id JOIN units u ON u.id = i.unit_id WHERE di.dish_id = ?', [dishId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function queryNutrients(dishId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT n.id, n.nutrient, di.nutrient_qty FROM nutrients n JOIN dish_nutrients di ON di.dish_nutrients = n.id WHERE di.dish_id = ?', [dishId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function queryprefs(dishId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT p.preference, p.id FROM dish_prefernces dp JOIN prefernces p ON p.id = dp.preference_id WHERE dish_id = ?', [dishId], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Create a new dish
app.post('/dishes', (req, res) => {
    const { image } = req.files;

    if (!image) {
        return res.sendStatus(400);
    }

    image.mv(__dirname + '/upload/' + image.name);

    const { dish_name, total_calories, description, instructions, allergens, add_on, label, ingredient_id, qty, nut_id, nqty, prefs } = req.body;
    const ingredient_ids = ingredient_id.split(',');
    const nut_ids = nut_id.split(',');
    const qtys = qty.split(',');
    const nqtys = nqty.split(',');
    const pref = prefs.split(',');

    db.query('INSERT INTO dish (dish_name, total_calories, description, instructions, allergens, add_on, label, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [dish_name, total_calories, description, instructions, allergens, add_on, label, '/uploads/' + image.name], 
    (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            ingredient_ids.forEach((id, i) => {
                db.query('INSERT INTO dish_ingredients (dish_id, ingredient_id, ingredient_qty) VALUES (?, ?, ?)', [result.insertId, id, qtys[i]], (err2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 });
                    }
                });
            });
            nut_ids.forEach((id, i) => {
                db.query('INSERT INTO dish_nutrients (dish_id, dish_nutrients, nutrient_qty) VALUES (?, ?, ?)', [result.insertId, id, nqtys[i]], (err2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 });
                    }
                });
            });
            pref.forEach((id) => {
                db.query('INSERT INTO dish_prefernces (dish_id, preference_id) VALUES (?, ?)', [result.insertId, id], (err2) => {
                    if (err2) {
                        res.json({ message: err, status: 500 });
                    }
                });
            });
            res.json({ message: 'Dish added successfully', id: result.insertId, status: 200 });
        }
    });
});

// Update a dish
app.put('/dishes/:id', (req, res) => {
    const { id } = req.params;
    const { dish_name, total_calories, description, instructions, allergens, add_on, label } = req.body;
    db.query('UPDATE dish SET dish_name = ?, total_calories = ?, description = ?, instructions = ?, allergens = ?, add_on = ?, label = ? WHERE id = ?', 
    [dish_name, total_calories, description, instructions, allergens, add_on, label, id], (err) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Dish updated successfully', status: 200 });
        }
    });
});

// Delete a dish
app.delete('/dishes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM dish WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Dish deleted successfully', status: 200 });
    });
});

// Start the service
app.listen(3007, () => {
    console.log('Dish service running on port 3007');
});
