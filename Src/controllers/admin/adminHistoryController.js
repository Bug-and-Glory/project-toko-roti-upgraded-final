import { Op } from "sequelize";
import { Order } from "../../models/index.js";

// Render halaman history admin: riwayat transaksi user, bisa difilter & dipaginasi
export const getHistoryAdmin = async (req, res, next) => {
  try {
    const { customer, date, page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const where = {};
    if (customer) where.customer_name = { [Op.like]: `%${customer}%` };
    if (date) {
      where.order_date = { [Op.gte]: new Date(date), [Op.lt]: new Date(`${date}T23:59:59`) };
    }

    const { count, rows: transactions } = await Order.findAndCountAll({
      where,
      attributes: ["order_id", "customer_name", "order_date", "total_amount"],
      order: [["order_date", "DESC"]],
      limit,
      offset,
    });

    res.render("admin/history-admin", {
      title: "History Aktivitas",
      admin: req.session.admin || null,
      transactions,
      currentPage: Number(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    next(error);
  }
};