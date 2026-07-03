import { Order, OrderDetail, Product } from "../../models/index.js";

export const getAllHistory = async (req, res, next) => {
  try {
    const userId = req.session.user.id;

    const orders = await Order.findAll({
      where: {
        user_id: userId,
      },
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
              attributes: ["name", "img_url"],
            },
          ],
        },
      ],
    });

    res.render("user/history", {
      title: "History",
      orders,
    });
  } catch (error) {
    console.log("GET HISTORY ERROR:", error);
    next(error);
  }
};