// import sequelize from "../../config/db.js";
// import { Op } from "sequelize";
// import { Order, OrderDetail, Product } from "../../models/index.js";

// export const createOrder = async (req, res) => {
//   const transaction = await sequelize.transaction();

//   try {
//     const { user_id, customer_name, total_price, items } = req.body;

//     // Validasi request
//     if (
//       !user_id ||
//       !customer_name ||
//       !total_price ||
//       !Array.isArray(items) ||
//       items.length === 0
//     ) {
//       await transaction.rollback();

//       return res.status(400).json({
//         success: false,
//         message: "Data tidak lengkap",
//       });
//     }

//     // Ambil seluruh product_id
//     const productIds = items.map((item) => item.menu_id);

//     // Ambil semua produk dalam satu query
//     const products = await Product.findAll({
//       where: {
//         id: {
//           [Op.in]: productIds,
//         },
//       },
//       transaction,
//     });

//     // Simpan dalam Map agar pencarian O(1)
//     const productMap = new Map();

//     products.forEach((product) => {
//       productMap.set(product.id, product);
//     });

//     // Pastikan semua produk ada
//     for (const item of items) {
//       if (!productMap.has(item.menu_id)) {
//         await transaction.rollback();

//         return res.status(404).json({
//           success: false,
//           message: `Produk dengan id ${item.menu_id} tidak ditemukan`,
//         });
//       }
//     }

//     // Simpan Order
//     const order = await Order.create(
//       {
//         user_id,
//         customer_name,
//         total_amount: total_price,
//       },
//       { transaction }
//     );

//     // Siapkan data Order Detail
//     const orderDetails = items.map((item) => ({
//       order_id: order.order_id,
//       product_id: item.menu_id,
//       quantity: item.qty,
//       price: productMap.get(item.menu_id).price,
//     }));

//     // Simpan semua sekaligus
//     await OrderDetail.bulkCreate(orderDetails, {
//       transaction,
//     });

//     await transaction.commit();

//     return res.status(201).json({
//       success: true,
//       message: "Order berhasil disimpan",
//       order_id: order.order_id,
//     });
//   } catch (err) {
//     await transaction.rollback();

//     console.error(err);

//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

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
    // isi logic kamu tetap
  } catch (err) {
    await transaction.rollback();

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};