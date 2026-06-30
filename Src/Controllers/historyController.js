import connection from "../config/db.js";


const execute = (sql, params = []) => connection.execute(sql, params);

const getAllHistory = async (req, res) => {
  try {
    // 1. Ambil semua order, terbaru duluan
    const [orders] = await execute(`
      SELECT
        order_id,
        customer_name,
        order_date,
        total_amount
      FROM orders
      ORDER BY order_date DESC
    `);

    if (!orders.length) {
      return res.status(200).json({
        success: true,
        message: "Belum ada riwayat pesanan",
        data: [],
      });
    }

    const orderIds  = orders.map((o) => o.order_id);
    const placeholders = orderIds.map(() => "?").join(", ");

    const [details] = await execute(
      `
      SELECT
        od.order_id,
        od.quantity,
        od.price,
        od.subtotal,
        p.name    AS product_name,
        p.img_url
      FROM order_details od
      JOIN products p ON p.id = od.product_id
      WHERE od.order_id IN (${placeholders})
      ORDER BY od.order_id, od.detail_id
      `,
      orderIds
    );

    const detailMap = {};
    for (const d of details) {
      if (!detailMap[d.order_id]) detailMap[d.order_id] = [];
      detailMap[d.order_id].push({
        product_name: d.product_name,
        img_url:      d.img_url,
        quantity:     d.quantity,
        price:        d.price,
        subtotal:     d.subtotal,
      });
    }

    const data = orders.map((o) => ({
      order_id:      o.order_id,
      customer_name: o.customer_name,
      order_date:    o.order_date,
      total_amount:  o.total_amount,
      items:         detailMap[o.order_id] || [],
    }));

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil riwayat pesanan",
      data,
    });
  } catch (error) {
    console.error("[historyController] getAllHistory:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

const getHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const [[order]] = await execute(
      `SELECT order_id, customer_name, order_date, total_amount
       FROM orders
       WHERE order_id = ?`,
      [id]
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order dengan id ${id} tidak ditemukan`,
      });
    }

    const [items] = await execute(
      `
      SELECT
        od.quantity,
        od.price,
        od.subtotal,
        p.name    AS product_name,
        p.img_url
      FROM order_details od
      JOIN products p ON p.id = od.product_id
      WHERE od.order_id = ?
      ORDER BY od.detail_id
      `,
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail pesanan",
      data: {
        order_id:      order.order_id,
        customer_name: order.customer_name,
        order_date:    order.order_date,
        total_amount:  order.total_amount,
        items,
      },
    });
  } catch (error) {
    console.error("[historyController] getHistoryById:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

export {getAllHistory, getHistoryById};