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

// Get all orders
app.get('/orders', (req, res) => {
    db.query('SELECT p.plan_name, p.no_meals, p.shipping_fee, p.price, o.*, c.`user_id`, c.`first_name`, c.`last_name`, c.`address`, c.`address2`, c.`city`, c.`state`, c.`zipcode`, c.`phone_number`, c.`payment_method`, c.`card_verified` FROM factor75.orders o INNER JOIN plans p ON p.id = o.plan_id INNER JOIN customers c ON c.id = o.customer_id;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get orders by customer ID
app.get('/orders_c/:customer_id', (req, res) => {
    const { customer_id } = req.params;
    db.query('SELECT p.plan_name, p.no_meals, p.shipping_fee, p.price, o.*, c.`user_id`, c.`first_name`, c.`last_name`, c.`address`, c.`address2`, c.`city`, c.`state`, c.`zipcode`, c.`phone_number`, c.`payment_method`, c.`card_verified` FROM factor75.orders o INNER JOIN plans p ON p.id = o.plan_id INNER JOIN customers c ON c.id = o.customer_id WHERE o.customer_id = ?', [customer_id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get order by ID
app.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    db.query('SELECT p.plan_name, p.no_meals, p.shipping_fee, p.price, o.*, c.`user_id`, c.`first_name`, c.`last_name`, c.`address`, c.`address2`, c.`city`, c.`state`, c.`zipcode`, c.`phone_number`, c.`payment_method`, c.`card_verified` FROM factor75.orders o INNER JOIN plans p ON p.id = o.plan_id INNER JOIN customers c ON c.id = o.customer_id WHERE o.id = ?', [id], async (err, results) => {
        if (err) {
            res.json({ message: err, status: 500 });
            return;
        }
        
        for (let a = 0; a < results.length; a++) {
            const data = JSON.parse(JSON.stringify(results[a]));
            try {
                const results2 = await queryDishes(data.id);
                const results3 = await queryAddons(data.id);
                data.dishes = results2;
                data.add_on = results3;
                results[a] = data;
            } catch (error) {
                res.json({ message: error, status: 500 });
                return;
            }
        }
        res.json(results);
    });
});

function queryDishes(order_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM factor75.order_dishes od JOIN dish d ON d.id = od.dish_id WHERE order_id = ?', [order_id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function queryAddons(order_id) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM factor75.order_addon od JOIN dish d ON d.id = od.add_on WHERE order_id = ?', [order_id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Get the last order by customer ID
app.get('/orders_cl/:id', async (req, res) => {
    const { id } = req.params;
    db.query('SELECT p.plan_name, p.no_meals, p.shipping_fee, p.price, o.*, c.`user_id`, c.`first_name`, c.`last_name`, c.`address`, c.`address2`, c.`city`, c.`state`, c.`zipcode`, c.`phone_number`, c.`payment_method`, c.`card_verified` FROM factor75.orders o INNER JOIN plans p ON p.id = o.plan_id INNER JOIN customers c ON c.id = o.customer_id WHERE o.customer_id = ? ORDER BY o.id DESC LIMIT 1', [id], async (err, results) => {
        if (err) {
            res.json({ message: err, status: 500 });
            return;
        }

        for (let a = 0; a < results.length; a++) {
            const data = JSON.parse(JSON.stringify(results[a]));
            try {
                const results2 = await queryDishes(data.id);
                const results3 = await queryAddons(data.id);
                data.dishes = results2;
                data.add_on = results3;
                results[a] = data;
            } catch (error) {
                res.json({ message: error, status: 500 });
                return;
            }
        }
        res.json(results);
    });
});

// Create a new order
app.post('/orders', (req, res) => {
    const { customer_id, order_from, order_to, plan_id, status, order_dish, order_addon } = req.body;
    const dishes = JSON.parse(order_dish);
    const order_addons = JSON.parse(order_addon);

    db.query('INSERT INTO `orders`(`customer_id`, `order_from`, `order_to`, `plan_id`, `status`, `order_dishes`) VALUES (?, ?, ?, ?, ?, ?)', [customer_id, order_from, order_to, plan_id, status, order_dish], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
            return;
        }

        for (const dish of dishes) {
            db.query('INSERT INTO `factor75`.`order_dishes` (`order_id`, `dish_id`, `dish_qty`) VALUES (?, ?, ?)', [result.insertId, dish.dish_id, dish.quantity], (err2) => {
                if (err2) {
                    res.json({ message: err, status: 500 });
                }
            });
        }

        for (const addon of order_addons) {
            db.query('INSERT INTO `factor75`.`order_addon` (`order_id`, `add_on`) VALUES (?, ?)', [result.insertId, addon], (err2) => {
                if (err2) {
                    res.json({ message: err, status: 500 });
                }
            });
        }

        res.json({ message: 'Order Created successfully', id: result.insertId, status: 200 });
    });
});

// Update an order
app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { order_from, order_to, plan_id, status, order_dish, order_addon } = req.body;
    const dishes = JSON.parse(order_dish);
    const order_addons = JSON.parse(order_addon);

    db.query('DELETE FROM order_dishes WHERE order_id = ?', [id], (err2) => {
        if (err2) {
            res.json({ message: err2, status: 500 });
        }
    });

    db.query('DELETE FROM order_addon WHERE order_id = ?', [id], (err2) => {
        if (err2) {
            res.json({ message: err2, status: 500 });
        }
    });

    for (const dish of dishes) {
        db.query('INSERT INTO `factor75`.`order_dishes` (`order_id`, `dish_id`, `dish_qty`) VALUES (?, ?, ?)', [id, dish.dish_id, dish.quantity], (err2) => {
            if (err2) {
                res.json({ message: err2, status: 500 });
            }
        });
    }

    for (const addon of order_addons) {
        db.query('INSERT INTO `factor75`.`order_addon` (`order_id`, `add_on`) VALUES (?, ?)', [id, addon], (err2) => {
            if (err2) {
                res.json({ message: err2, status: 500 });
            }
        });
    }

    db.query('UPDATE `factor75`.`orders` SET `order_from` = ?, `order_to` = ?, `plan_id` = ?, `status` = ? WHERE `id` = ?', [order_from, order_to, plan_id, status, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Order updated successfully', status: 200 });
    });
});

// Delete an order
app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM `factor75`.`orders` WHERE `id` = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Order deleted successfully', status: 200 });
    });
});


app.put('/order_status/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, usertype } = req.body;
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`users` SET `username` = "' + username + '",`email` = "' + email + '",`password` = "' + password + '", `user_type` = "' + usertype + '" WHERE `id` = ' + id + ';', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Customer updated successfully', status: 200 });
        }
    });
});
app.get('/order_dishes/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM factor75.order_dishes od join dish d on d.id = od.dish_id where order_id = ' + id + ' ', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});



app.put('/dish_orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`order_dishes` SET `order_status` = "' + status + '" WHERE id = ' + id + '', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Order Status Updated successfully', status: 200 });
        }
    });
});
app.put('/dish_orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log("UPDATE `users` SET `username` = '"+username+"' and email = '"+email+"' and password = '"+password+"' and user_type = '"+usertype+"' WHERE `id` = "+id+";");  
    db.query('UPDATE `factor75`.`order_dishes` SET `order_status` = "' + status + '" WHERE id = ' + id + '', (err) => {
        if (err) {

            res.json({ message: err, status: 500 })
        }
        else {
            res.json({ message: 'Order Status Updated successfully', status: 200 });
        }
    });
});


app.listen(3010, () => {
    console.log('Order service running on port 3010');
});
