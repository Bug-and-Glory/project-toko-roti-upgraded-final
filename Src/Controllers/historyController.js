import Order from "../models/order.js";
import OrderDetail from "../models/orderDetail.js";
import Product from "../models/product.js"; 


// Order.hasMany(OrderDetail, { foreignKey: "order_id" });
// OrderDetail.belongsTo(Order, { foreignKey: "order_id" });
// OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

const getAllHistory = async (req, res) => {
  try {
    // Ambil semua order + detail item + info product, terbaru duluan
    const orders = await Order.findAll({
      attributes: ["order_id", "customer_name", "order_date", "total_amount"],
      order: [["order_date", "DESC"]],
      include: [
        {
          model: OrderDetail,
          attributes: ["quantity", "price", "subtotal"],
          include: [
            {
              model: Product,
              attributes: [["name", "product_name"], "img_url"],
            },
          ],
        },
      ],
    });

    if (!orders.length) {
      return res.status(200).json({
        success: true,
        message: "Belum ada riwayat pesanan",
        data: [],
      });
    }

    // Rapikan struktur data sebelum dikirim ke client
    const data = orders.map((o) => ({
      order_id: o.order_id,
      customer_name: o.customer_name,
      order_date: o.order_date,
      total_amount: o.total_amount,
      items: o.order_details.map((d) => ({
        product_name: d.product.product_name,
        img_url: d.product.img_url,
        quantity: d.quantity,
        price: d.price,
        subtotal: d.subtotal,
      })),
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
    // Ambil satu order + detail item + info product berdasarkan id
    const order = await Order.findByPk(id, {
      attributes: ["order_id", "customer_name", "order_date", "total_amount"],
      include: [
        {
          model: OrderDetail,
          attributes: ["quantity", "price", "subtotal"],
          include: [
            {
              model: Product,
              attributes: [["name", "product_name"], "img_url"],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order dengan id ${id} tidak ditemukan`,
      });
    }

    // Rapikan struktur item sebelum dikirim ke client
    const items = order.order_details.map((d) => ({
      quantity: d.quantity,
      price: d.price,
      subtotal: d.subtotal,
      product_name: d.product.product_name,
      img_url: d.product.img_url,
    }));

    return res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail pesanan",
      data: {
        order_id: order.order_id,
        customer_name: order.customer_name,
        order_date: order.order_date,
        total_amount: order.total_amount,
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

export { getAllHistory, getHistoryById };