const db = require('../config/db');

exports.createOrder = async (req, res) => {
    // Read userId from request body
    const { userId, cartItems, totalAmount } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const [orderResult] = await db.query(
            'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
            [userId, totalAmount]
        );
        const orderId = orderResult.insertId;

        const orderItemsValues = cartItems.map(item => [orderId, item.id, item.quantity, item.price]);
        await db.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
            [orderItemsValues]
        );

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to place order' });
    }
};



exports.getUserOrders = async (req, res) => {
    try {
        const [orders] = await db.query(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', 
            [req.params.userId]
        );
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};