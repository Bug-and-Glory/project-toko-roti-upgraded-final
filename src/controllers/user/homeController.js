import { Op } from "sequelize";
import {
  Product,
  ProductDetail,
  SubCategory,
  MasterCategory,
} from "../../models/index.js";

// Nama produk yang mau ditampilin di section "Menu Pilihan" home page
const HOME_MENU_TARGETS = [
  "Birthday cake",
  "Caramel Macchiato",
  "Macaron",
  "Strawberry Danish",
  "Cookies",
  "Strawberry milk",
].map((name) => name.toLowerCase());

// Render halaman home + produk pilihan, data langsung dikirim ke view (server-side)
export const index = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        name: { [Op.in]: HOME_MENU_TARGETS.map((n) => n) },
      },
      include: [
        {
          model: SubCategory,
          as: "Product_SubCategory",
          attributes: ["id", "name"],
          include: [
            {
              model: MasterCategory,
              as: "Sub_MasterCategory",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    res.render("user/index", { title: "Home", products });
  } catch (error) {
    next(error);
  }
};