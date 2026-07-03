import Order from "../../models/order.js";
import OrderDetail from "../../models/orderDetail.js";
import Product from "../../models/product.js";

// Render halaman history (HTML), datanya diambil ulang via fetch dari /api/history di sisi client
const showHistoryPage = (req, res, next) => {
  try {
    res.render("user/history", { title: "Riwayat Pesanan" });
  } catch (error) {
    next(error);
  }
};

// API JSON - ambil semua riwayat pesanan
const getAllHistory = async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: ["order_id", "customer_name", "order_date", "total_amount"],
      order: [["order_date", "DESC"]],
      include: [
        {
          model: OrderDetail,
          as: "Order_OrderDetail",
          attributes: ["quantity", "price", "subtotal"],
          include: [
            {
              model: Product,
              as: "OrderDetail_Product",
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

    const data = orders.map((o) => ({
      order_id: o.order_id,
      customer_name: o.customer_name,
      order_date: o.order_date,
      total_amount: o.total_amount,
      items: o.Order_OrderDetail.map((d) => ({
        product_name: d.OrderDetail_Product.product_name,
        img_url: d.OrderDetail_Product.img_url,
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

// API JSON - ambil detail 1 pesanan berdasarkan order_id
const getHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      attributes: ["order_id", "customer_name", "order_date", "total_amount"],
      include: [
        {
          model: OrderDetail,
          as: "Order_OrderDetail",
          attributes: ["quantity", "price", "subtotal"],
          include: [
            {
              model: Product,
              as: "OrderDetail_Product",
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

    const items = order.Order_OrderDetail.map((d) => ({
      quantity: d.quantity,
      price: d.price,
      subtotal: d.subtotal,
      product_name: d.OrderDetail_Product.product_name,
      img_url: d.OrderDetail_Product.img_url,
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

export { showHistoryPage, getAllHistory, getHistoryById };