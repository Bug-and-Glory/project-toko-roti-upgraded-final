import Order from "../../models/order.js";
import OrderDetail from "../../models/orderDetail.js";
import Product from "../../models/product.js";

const showHistoryPage = async (req, res, next) => {
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

    res.render("user/history", { title: "Riwayat Pesanan", orders });
  } catch (error) {
    next(error);
  }
};

export { showHistoryPage };