import sequelize from "../../config/db.js";
import { Op } from "sequelize";
import { Order, OrderDetail, Product } from "../../models/index.js";

export const showCart = async (req, res, next) => {
  try {
    res.render("user/cart", {
      title: "Cart",
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { items } = req.body;

    const userId = req.session.user.id;
    const customerName = req.session.user.name || req.session.user.username;

    if (!Array.isArray(items) || items.length === 0) {
      await transaction.rollback();

      return res.status(400).json({
        success: false,
        message: "Data pesanan tidak lengkap.",
      });
    }

    const productIds = items.map((item) => Number(item.menu_id));

    const products = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
      transaction,
    });

    const productMap = new Map();

    products.forEach((product) => {
      productMap.set(Number(product.id), product);
    });

    let totalAmount = 0;
    const orderDetailsData = [];

    for (const item of items) {
      const productId = Number(item.menu_id);
      const quantity = Number(item.qty);

      if (!productId || !quantity || quantity < 1) {
        await transaction.rollback();

        return res.status(400).json({
          success: false,
          message: "Data produk tidak valid.",
        });
      }

      const product = productMap.get(productId);

      if (!product) {
        await transaction.rollback();

        return res.status(404).json({
          success: false,
          message: `Produk dengan ID ${productId} tidak ditemukan.`,
        });
      }

      const price = Number(product.price);
      const subtotal = price * quantity;

      totalAmount += subtotal;

      orderDetailsData.push({
        product_id: productId,
        quantity,
        price,
      });
    }

    const order = await Order.create(
      {
        user_id: userId,
        order_date: new Date(),
        customer_name: customerName,
        total_amount: totalAmount,
      },
      { transaction },
    );

    const orderDetails = orderDetailsData.map((detail) => ({
      order_id: order.order_id,
      product_id: detail.product_id,
      quantity: detail.quantity,
      price: detail.price,
    }));

    await OrderDetail.bulkCreate(orderDetails, {
      fields: ["order_id", "product_id", "quantity", "price"],
      transaction,
    });

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Pesanan berhasil dibuat.",
      order_id: order.order_id,
      total_amount: totalAmount,
    });
  } catch (err) {
    await transaction.rollback();

    console.log("CREATE ORDER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat pesanan.",
    });
  }
};
