import connection from "../config/db.js";

const createOrder =  async (req, res) => {
  try {
    const { items, total_price, customer_name } = req.body;

    if (!items || !total_price || !customer_name) {
      return res.status(400).json({
        success: false,
        message: "Data tidak lengkap"
      });
    }

    const [orderResult] = await connection.execute(
      "INSERT INTO orders (customer_name, total_amount) VALUES (?, ?)",
      [customer_name, total_price]
    );

    const orderId = orderResult.insertId;

    for (let item of items) {
      const [menuData] = await connection.execute(
        "SELECT price FROM products WHERE id = ?",
        [item.menu_id]
      );

      const price = menuData[0].price;

      await connection.execute(
        `INSERT INTO order_details (order_id, product_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.menu_id, item.qty, price]
      );
    }

    res.json({
      success: true,
      message: "Order berhasil disimpan"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Gagal simpan order"
    });
  }
};

export default createOrder;